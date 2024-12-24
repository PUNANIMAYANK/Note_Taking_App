const Note = require('../models/Note');

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new note
const createNote = async (req, res) => {
    const { title, description } = req.body;

    if (!title || title.length > 50) {
        return res.status(400).json({ message: 'Title is required and must be less than 50 characters.' });
    }

    try {
        const newNote = new Note({
            title,
            description,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Note not found.' });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) return res.status(404).json({ message: 'Note not found.' });

        res.json({ message: 'Note deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
