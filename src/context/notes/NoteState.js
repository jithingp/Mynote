import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  //Get all notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTRmYzI5M2Y4N2JkNWQ2ZTBiMGMxIn0sImlhdCI6MTY0MTAxMTA0NX0.bFEDU1jTt6woKbzL0Um1L6SdwOM9ZyxpohHGNUFwHQs"
      }
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTRmYzI5M2Y4N2JkNWQ2ZTBiMGMxIn0sImlhdCI6MTY0MTAxMTA0NX0.bFEDU1jTt6woKbzL0Um1L6SdwOM9ZyxpohHGNUFwHQs"
      },
      body: JSON.stringify({title,description,tag}),
    });

    //client side
    const note = {
      _id: "61cecd900e8d270568a429ef",
      user: "61c94fc293f87bd5d6e0b0c1",
      title: title,
      description: description,
      tag: tag,
      date: "2021-12-31T09:29:53.000Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
    console.log("deleting " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOTRmYzI5M2Y4N2JkNWQ2ZTBiMGMxIn0sImlhdCI6MTY0MTAxMTA0NX0.bFEDU1jTt6woKbzL0Um1L6SdwOM9ZyxpohHGNUFwHQs"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json= response.json();

    //Logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;