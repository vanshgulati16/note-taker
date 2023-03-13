import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main";
import SideBar from "./sideBar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  //LocalStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onEditNote = (updatedNote) => {
    const editedNoteArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });
    setNotes(editedNoteArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id != idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <SideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onEditNote={onEditNote} />
    </div>
  );
}

export default App;
