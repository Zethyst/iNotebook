const express = require("express");
const router = express.Router();
const fetchuser = require("../Middlewares/Fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator")

//whenever a user hits /api/notes/ endpoint, rest of the code goes from below
//this single slash means after /api/notes

//!This endpoint fetches all notes from the database of the logged in user
//!Route 1: GET all the notes using: GET "/api/notes/fetchallnotes". Login required,
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }); //ab kyuki maine fetchuser use kiya hua hai toh mere req.user me hoga logged in user
        res.json({ notes });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//!Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id //due to fetchuser 
        })
        const savedNote = await note.save();

        res.json({ savedNote });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//!Route 3: Update an existing note using: PATCH "/api/notes/updatenote". Using patch cuz we need to update only specific parts not the whole body
//? using fetchuser here so that only the current logged in user can update his note and not someone's elses

router.patch("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Creating a new note
        const newnote = {};
        if (title) { newnote.title = title, newnote.description = description,newnote.tag = tag  }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found");
        }
        //Allow updation only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });//By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour
        res.json({ note });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//!Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id); //pehle note dhund ke lao
        if (!note) { //if the note exists
            return res.status(400).send("Not Found");
        }
        //Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
})
module.exports = router;
