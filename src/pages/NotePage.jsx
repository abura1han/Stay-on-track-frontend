import React, { useEffect, useState } from "react";
import useNote from "../hooks/useNote";

const NotePage = () => {
  const { noteList, setAddNote, setDeleteNote } = useNote();
  const [note, setNote] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  /**
   * Handle add note
   */
  useEffect(() => {
    if (isSubmit) {
      setAddNote(note);

      // Clear add note form
      setNote("");
      setIsSubmit(false);
    }
  }, [isSubmit, note, setAddNote]);

  return (
    <div className="w-full max-w-[800px] mx-auto px-3 mb-10 shadow shadow-gray-300 border border-gray-200">
      <h2 className="text-xl font-medium my-2">Note</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (note) {
              setIsSubmit(true);
            }
          }}
          className="flex"
        >
          <input
            type="text"
            placeholder="Add note..."
            className="border border-gray-200 px-2 py-2 text-base rounded-l outline-none focus:border-stay-primary hover:border-stay-primary w-full"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <button
            className="flex items-center px-2 py-2 bg-gray-300 rounded-r text-gray-600"
            type="submit"
          >
            <span className="material-icons-outlined">add</span>
          </button>
        </form>
      </div>
      <div className="mt-5">
        <ul>
          {noteList.reverse().map(({ _id, updatedAt, note }, i) => (
            <li
              className="flex justify-between items-start mt-2 w-full bg-yellow-100 px-2 py-1 rounded border-l-4 border-l-orange-300 shadow shadow-orange-200"
              key={i}
            >
              <div className="text-sm">
                <div>{new Date(updatedAt).toLocaleDateString()}</div>
                <p className="text-black text-sm text-left font-serif font-medium">
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

export default NotePage;
