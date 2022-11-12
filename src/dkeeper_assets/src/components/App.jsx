import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "../../../declarations/dkeeper"

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content) //createNote function from backend
      return [newNote, ...prevNotes];
    });
  }

  useEffect(()=>{
    // console.log("useEffect is triggered");
    fetchData();
  },[]);

  async function fetchData(){
    const notesArray = await dkeeper.readNotes(); //readNotes function from backend
    setNotes(notesArray);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      dkeeper.removeNote(id); //import and use the function from backend
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
