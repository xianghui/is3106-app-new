import React from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";

function NoteList(props) {
  const list = props.notes.map((note) => {
    if (note.editMode) {
      return (
        <NoteForm
          key={note.id}
          id={note.id}
          value={note.value}
          editMode={note.editMode}
          onCancelEdit={(id) => props.onEdit(id, false)}
          onDone={props.onDone}
        />
      );
    } else {
      return (
        <Note
          key={note.id}
          id={note.id}
          value={note.value}
          onEdit={(id) => props.onEdit(id, true)}
          onDelete={props.onDelete}
        />
      );
    }
  });
  return (
    <div>
      <h3>List of notes:</h3>
      <div className="notes-entry-container">{list}</div>
    </div>
  );
}

export default NoteList;
