import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/Popup";
import Button from "./Button";
import useNote from "../hooks/useNote";

const QuickNote = () => {
  const [note, setNote] = useState("");
  const [isSubmint, setIsSubmit] = useState(false);
  const { setPopup } = useContext(PopupContext);
  const { noteList, setAddNote, setDeleteNote } = useNote();

  /**
   * Handle add note
   */
  useEffect(() => {
    if (isSubmint) {
      setAddNote(note);
    }
  }, [isSubmint, setAddNote, note]);

  /**
   * Handle popup
   */
  const openStikyNotePopup = () => {
    const popupForm = (
      <div className="max-w-[450px] mx-auto mt-5 bg-white px-2 py-3 rounded">
        <h2 className="font-semibold text-black text-center text-lg mb-3">
          Quick note
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mt-2">
            <label htmlFor="note" className="block text-sm font-medium">
              Note
            </label>
            <textarea
              name="note"
              id="note"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setNote(e.target.value)}
              defaultValue={note}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-gray-300 text-black mt-4 mr-2 outline-none"
              onClick={closePopup}
            >
              Close
            </Button>
            <Button
              type="submit"
              className="bg-stay-primary text-white mt-4 outline-none"
              onClick={() => setIsSubmit(true)}
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    );

    setPopup(popupForm);
  };

  /**
   * Close popup
   */
  const closePopup = () => {
    setPopup(null);
  };

  return (
    <div className="bg-white  border border-gray-300 relative rounded p-2 overflow-y-auto h-[190px] z-0 shadow shadow-gray-300">
      <h2 className="font-semibold text-black text-base text-left flex items-center justify-between">
        <div>Quick note</div>
        <button onClick={openStikyNotePopup} className="flex items-center">
          <span className="material-icons-outlined">note_add</span>
        </button>
      </h2>
      <div className="w-full h-full rounded">
        <ul>
          {noteList.reverse().map(({ _id, updatedAt, note }, i) => (
            <li
              className="flex  justify-between items-start mt-2 w-full bg-yellow-100 px-2 py-1 rounded border-l-4 border-l-orange-300 shadow shadow-orange-200"
              key={i}
            >
              <div className="text-sm">
                <div>{new Date(updatedAt).toLocaleDateString()}</div>
                <p className="text-black text-sm text-left font-serif">
                  {note}
                </p>
              </div>
              <button
                className="font-medium text-xs text-black"
                onClick={() => setDeleteNote(_id)}
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </li>
          ))}
          {noteList.length < 1 && (
            <li className="text-gray-600 mt-3">No notes found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuickNote;
