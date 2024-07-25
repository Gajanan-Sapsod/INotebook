const express = require("express");
const router = express.Router();
const Note = require("../Models/note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: to fetch all notes; GET request login is needed
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Route 2:to create the note: POST request login is needed
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title with min length 3").isLength({ min: 3 }),
    body("description", "Enter the min description of length 3").isLength({
      min: 3,
    }),
    body("tag", "Enter the min tag of length 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//Route 3;Update the note :PUT request user login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    let { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Not found" });
    }

    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route 4:Delete the note :DELETE login is needed
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ error: "Not found" });
  }

  if (note.user.toString() != req.user.id) {
    return res.status(401).send("Not allowed");
  }
    note =await Note.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Deletion succesful" });
});

module.exports = router;
