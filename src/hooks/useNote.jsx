import { useEffect, useState } from "react";
import configs from "../configs";
import useLocalStorage from "./useLocalStorage";

const useNote = () => {
  const { stayToken } = useLocalStorage();
  const [noteList, setNoteList] = useState([]);
  const [addNote, setAddNote] = useState("");
  const [deleteNote, setDeleteNote] = useState("");

  /**
   * Get all notes
   */
  useEffect(() => {
    fetch(`${configs.serverUrl}/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        //   If error occurred to the server
        if (!success) {
          return;
        }
        setNoteList((noteList) => [...noteList, ...data]);
      });
  }, [stayToken]);

  /**
   * Create new note
   */
  useEffect(() => {
    if (!addNote) {
      return;
    }

    fetch(`${configs.serverUrl}/api/add-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        note: addNote.trim(),
      }),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          setNoteList((noteList) => [...noteList, { ...data }]);
        }
      });

    setAddNote("");
  }, [addNote, stayToken]);

  /**
   * Delete note by id
   */
  useEffect(() => {
    if (!deleteNote) {
      return;
    }

    fetch(`${configs.serverUrl}/api/delete-note?noteId=${deleteNote}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          const newNoteList = noteList.filter(({ _id }) => _id !== data._id);
          setNoteList(newNoteList);
        }
      });

    setDeleteNote("");
  }, [deleteNote, noteList, stayToken]);

  return { noteList, setAddNote, setDeleteNote };
};

export default useNote;
