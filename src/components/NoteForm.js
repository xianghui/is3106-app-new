import React, { useRef, useState, useEffect } from "react";

import "../note.css";

//destructure the props value out
//at the same time, we can set the default value
function NoteForm({
  editMode = false,
  value = "",
  id = 0,
  onDone,
  onCancelEdit,
}) {
  const textboxRef = useRef();
  const [text, setText] = useState(value);

  useEffect(() => {
    textboxRef.current.focus();
    textboxRef.current.select();
  }, []);

  function resetState() {
    setText(value);
  }

  function renderCancelBtn() {
    if (editMode) {
      //edit mode
      return (
        <div className="note-form-cancel">
          <button onClick={() => onCancelEdit(id)}>Cancel</button>
        </div>
      );
    } else {
      //add new mode
      if (text.length > 0) {
        return (
          <div className="note-form-cancel">
            <button
              onClick={() => {
                setText("");
              }}
            >
              Cancel
            </button>
          </div>
        );
      } else {
        return "";
      }
    }
  } //end renderCancelBtn

  function renderAddOrEditBtn() {
    let buttonText = "Add";

    if (editMode) {
      buttonText = "Confirm Edit";
    }

    return (
      <div className="note-form-add">
        <button
          onClick={() => {
            onDone({
              id: id,
              value: text,
            });
            resetState();
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  } //end renderAddOrEditBtn

  const cancelBtn = renderCancelBtn();
  const addOrEditBtn = renderAddOrEditBtn();

  return (
    <div className="note-form-container">
      <textarea
        className="note-form"
        rows="3"
        placeholder="Enter note"
        ref={textboxRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      {cancelBtn}
      {addOrEditBtn}
    </div>
  );
}

export default NoteForm;
