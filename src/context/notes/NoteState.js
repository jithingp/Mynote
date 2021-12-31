import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>{
    const s1 = {
        "name": "Harry",
        "class":"5b"
    }
    const [state, setstate] = useState(s1)
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
