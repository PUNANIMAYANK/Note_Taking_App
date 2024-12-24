const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes');
const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
