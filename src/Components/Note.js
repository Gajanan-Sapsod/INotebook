import React, { useContext, useEffect, useState, useRef } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../Contexts/NoteContext";
import { useNavigate } from "react-router-dom";

function Note() {
  const [note, setnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const { Note, getNotes, EditNote } = useContext(NoteContext);

  const ref = useRef(null);

  const refClose = useRef(null);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    EditNote(note.title, note.description, note.tag, note.id);

    refClose.current.click();
  };

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) getNotes();
    else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const updatenote = (Currentnote) => {
    ref.current.click();
    setnote({
      id: Currentnote._id,
      title: Currentnote.title,
      description: Currentnote.description,
      tag: Currentnote.tag,
    });
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.title.length <= 5 ||
                  note.description.length <= 5 ||
                  note.tag.length <= 5
                }
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="container mx-1">
          {Note.length === 0 && "No notes to display"}
        </div>

        {Note.map((element) => {
          return (
            <NoteItem
              note={element}
              id={element._id}
              updatenote={updatenote}
              title={element.title}
              description={element.description}
              tag={element.tag}
            />
          );
        })}
      </div>
    </>
  );
}

export default Note;
