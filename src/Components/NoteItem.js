import React, { useContext } from 'react'
import NoteContext from '../Contexts/NoteContext'


function NoteItem(props) {

  // let [title, description, tag] = props;
  const {DeleteNote} = useContext(NoteContext);
  
  return (
    <div className="card col-md-3 mx-3 my-3">
    
    <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">Tag: {props.tag}</p>
        <i className="fa-solid fa-trash"  style={{"cursor":"pointer"}} onClick={()=>DeleteNote(props.id)}></i>
        <i className="fa-solid fa-pen-to-square mx-3" style={{"cursor":"pointer"}} onClick={()=>props.updatenote(props.note)}></i>

     
    </div>
  </div>
  )
}

export default NoteItem