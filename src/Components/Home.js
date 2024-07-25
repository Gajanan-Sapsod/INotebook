import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

function Home() {
  return (
    <>
      <h2 className="my-3">Add a note</h2>
      <AddNote />

      <h2>Your notes</h2>
      <Note />
    </>
  );
}

export default Home;
