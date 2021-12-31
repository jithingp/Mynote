import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>{
   const notesInitial= [
        {
          "_id": "61ca64fafe28f09312c821a7",
          "user": "61c94fc293f87bd5d6e0b0c1",
          "title": "My title2",
          "description": "you need to write",
          "tag": "personal",
          "date": "2021-12-28T01:14:34.836Z",
          "__v": 0
        },
        {
          "_id": "61cecd900e8d270568a429ef",
          "user": "61c94fc293f87bd5d6e0b0c1",
          "title": "rohit",
          "description": "mumba2222",
          "tag": "personal",
          "date": "2021-12-31T09:29:53.000Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

      //Add a Note
      const addNote = (title,description,tag)=>{
          const note={
            "_id": "61cecd900e8d270568a429ef",
            "user": "61c94fc293f87bd5d6e0b0c1",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-12-31T09:29:53.000Z",
            "__v": 0
          }
        setNotes(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = ()=>{
        
    }

     // Edit a Note
     const editNote = ()=>{

    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
