import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  

  const host = 'http://localhost:5000';

  const [Note, setNote] = useState([]);

  const getNotes = async () => {
    const url = `${host}/api/note/fetchallnotes`;
    const response = await fetch(url,
      {
      
        // Adding method type 
        method: "GET",
          
        // Adding body or contents to send

        // Adding headers to the request 
        headers: {
          "Content-type": "application/json",
          "auth-token" :localStorage.getItem('token')
        }

      });
    const json = await response.json();
    setNote(json);
  }

  const AddNote = async (note) => {
    note.title && setNote(Note.concat(note));
    const url = `${host}/api/note/addnote`;
    const response = await fetch(url,
      {
      
        // Adding method type 
        method: "POST",
          
        // Adding body or contents to send
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag:note.tag
        }) ,
        // Adding headers to the request
         
        
        headers: {
          "Content-type": "application/json",
          "auth-token" :localStorage.getItem('token')
        }

      });
    const json = await response.json();
    console.log(json._id)
    


    

  };

  const DeleteNote = async (_id) => {
    console.log(_id);
    const url = `${host}/api/note/deletenote/${_id}`;
    console.log(url);
    const response = await fetch(url,
      {
      
        // Adding method type 
        method: "DELETE",
          
        // Adding body or contents to send
        
        // Adding headers to the request
         
        
        headers: {
          
          "auth-token" :localStorage.getItem('token')
        }

      });
    const json = await response.json();
    
    const NewNote = Note.filter((element) => {
      return element._id !== _id;
    });
    setNote(NewNote);
  };


  const EditNote = async (title, description, tag, id) => {
    //api
    const url = `${host}/api/note/updatenote/${id}`;
    const response = await fetch(url,
      {
      
        // Adding method type 
        method: "PUT",
          
        // Adding body or contents to send
        body: JSON.stringify({
          title: title,
          description: description,
          tag:tag
        }) ,
        // Adding headers to the request
         
        
        headers: {
          "Content-type": "application/json",
          "auth-token" :localStorage.getItem('token')
        }

      });
    const json = await response.json();


    let newNotes = JSON.parse(JSON.stringify(Note));

    for (let i = 0; i < newNotes.length; i++)
    {
      if (newNotes[i]._id === id)
      {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        
        }
    }
    
    setNote(newNotes);
    
  } 














  return (
    <NoteContext.Provider value={{ Note, AddNote, DeleteNote , getNotes, EditNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
