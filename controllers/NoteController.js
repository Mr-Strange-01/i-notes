const Note = require('../models/Note');


const getNotes = async function (req, res) {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addNote = async function (req, res) {
    try {
        const { title, description, tag} = req.body;

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.status(201).send(savedNote);

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateNote = async function (req, res) {
    try{
        const { title, description, tag} = req.body;
        const note = await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send('Not Found');
        }

        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send('Not Allowed');
        }

        const updateData = {};

        if(title) updateData.title = title;
        if(description) updateData.description = description;
        if(tag) updateData.tag = tag;

        const update = await Note.findByIdAndUpdate(req.params.id, {$set: updateData}, {new: true});
        res.status(200).send(update);

    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteNote = async function (req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send('Not Found');
        } 

        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send('Not Allowed');
        }
        
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        console.log(deleteNote);

        res.status(200).send(deleteNote);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getNotes,
    addNote,
    updateNote,
    deleteNote
}