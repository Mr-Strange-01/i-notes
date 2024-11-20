const express = require('express');
const router = express.Router();
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/NoteController');
const { auth } = require('../middlewares/auth');

router.get('/notes', auth, getNotes);
router.post('/addnote', auth, addNote);
router.put('/updatenote/:id', auth, updateNote);
router.delete('/deletenote/:id', auth, deleteNote);


module.exports = router;