import React, { useContext, useState } from "react";
import NoteContext from "../Contexts/NoteContext";

function AddNote() {

    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const context = useContext(NoteContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        context.AddNote(note);
        setnote({ title: "", description: "", tag: "" });
      
    }
    
    const handleChange = (e) => {

        setnote({ ...note, [e.target.name]: e.target.value });
       
    }

  return (
    <form className="container my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Add a title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={note.title}
                  aria-describedby="emailHelp"
                  onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Add a description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={note.description}
                  onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Add a tag
        </label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
      </div>

      <button type="submit" disabled={note.title.length<=5 || note.description.length<=5 || note.tag.length<=5} className="btn btn-primary" onClick={handleSubmit}>
        Add Note
      </button>
    </form>
  );
}

export default AddNote;
