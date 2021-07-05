import React from "react";
import "../note.css";

function Note(props) {
  return (
    <div className="notes-entry">
      <div className="notes-entry-body">{props.value}</div>
      <div className="notes-entry-action">
        <button onClick={(e) => props.onEdit(props.id)}>edit</button>
        <button onClick={(e) => props.onDelete(props.id)}>delete</button>
      </div>
    </div>
  );
}

export default Note;
