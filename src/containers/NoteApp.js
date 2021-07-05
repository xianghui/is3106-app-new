import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function NoteApp() {
  //used to capture the notes
  //the next id to use will be currentId + 1
  //since we are most likely updating the notes and id together, we will combine
  const [notesStore, setNotesStore] = useState({ notes: [], currentId: 0 });

  //load once when mounted
  //call API to fetch the notes
  useEffect(() => {
    api
      .getNotes()
      .then((res) => res.json())
      .then((notes) => {
        let largestId = -1;
        for (const note of notes) {
          if (note.id > largestId) {
            largestId = note.id;
          }
        }

        setNotesStore({ notes, currentId: largestId });
      });
  }, []);

  //handlers
  function handleEdit(id, editMode) {
    const { notes } = notesStore;
    const updatedNotes = notes.map((n) => {
      if (n.id === id) {
        n.editMode = editMode;
      }
      return n;
    });

    setNotesStore((oldNotesStore) => ({
      currentId: oldNotesStore.currentId,
      notes: updatedNotes,
    }));
  } //end handleEdit

  function handleDelete(id) {
    const { notes } = notesStore;
    const updatedNotes = notes.filter((n) => {
      return n.id !== id;
    });

    setNotesStore((oldNotesStore) => ({
      currentId: oldNotesStore.currentId,
      notes: updatedNotes,
    }));

    console.log("###updatedNotes: ", updatedNotes);
  } //end handleDelete

  function handleAddEdit(note) {
    console.log("###in handleAddEdit ", note);
    const { currentId, notes } = notesStore;
    if (note.id === 0) {
      //add action
      if (note.value.trim() === "") return;

      note.id = currentId + 1;

      setNotesStore({
        currentId: note.id,
        notes: [...notes, note],
      });
    } else {
      //edit action
      if (note.value.trim() === "") {
        //cancel edit
        handleEdit(note.id, false);
        return;
      } else {
        //find the note
        const updatedNotes = notes.map((n) => {
          if (n.id === note.id) {
            note.editMode = false;
            return note;
          } else {
            return n;
          }
        });

        setNotesStore((oldNotesStore) => ({
          currentId: oldNotesStore.currentId,
          notes: updatedNotes,
        }));
      }
    }
  }
  //-------

  const { notes } = notesStore;
  return (
    <div className="note-container">
      <NoteForm onDone={handleAddEdit} />
      <br />
      <br />
      <NoteList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDone={handleAddEdit}
      />
    </div>
  );
}

export default NoteApp;
