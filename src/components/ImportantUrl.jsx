import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/Popup";
import Button from "./Button";
import useUrl from "../hooks/useUrl";

const UrlCollection = () => {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { urlList, setAddUrl, setDeleteUrl } = useUrl();
  const { setPopup } = useContext(PopupContext);

  /**
   * Handle add url
   */
  useEffect(() => {
    if (isSubmit) {
      setAddUrl({ label, url });

      // Close the popup & reset input and label
      setPopup(null);
      setUrl("");
      setLabel("");
      setIsSubmit(false);
    }
  }, [url, label, isSubmit, setAddUrl, setPopup]);

  /**
   * Handle popup
   */
  const openStikyNotePopup = () => {
    const popupForm = (
      <div className="max-w-[450px] mx-auto mt-5 bg-white px-2 py-3 rounded">
        <h2 className="font-semibold text-black text-center text-lg mb-3">
          Important URL
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mt-2">
            <label htmlFor="label" className="block text-sm font-medium">
              Label
            </label>
            <input
              type={"text"}
              name="label"
              id="label"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setLabel(e.target.value)}
              defaultValue={label}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="url" className="block text-sm font-medium">
              URL
            </label>
            <input
              type={"url"}
              name="url"
              id="url"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setUrl(e.target.value)}
              defaultValue={url}
            />
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
        <div>Important URL</div>
        <button onClick={openStikyNotePopup} className="flex items-center">
          <span className="material-icons-outlined">note_add</span>
        </button>
      </h2>
      <div className="w-full h-full rounded">
        <ul>
          {urlList.reverse().map(({ _id, label, url }, i) => (
            <li
              className="flex justify-between items-start mt-2 w-full bg-indigo-200 px-2 py-1 rounded border-l-4 border-l-indigo-400 shadow shadow-indigo-300"
              key={i}
            >
              <div className="text-sm font-medium">
                <a href={url} target={"_blank"} rel="noreferrer">
                  <div>{label}</div>
                </a>

                <a
                  href={url}
                  className="text-black text-sm text-left font-serif text-ellipsis whitespace-nowrap overflow-hidden"
                >
                  {url}
                </a>
              </div>
              <button
                className="font-medium text-xs text-black inline-block mt-1"
                onClick={() => setDeleteUrl(_id)}
              >
                <span className="material-icons-outlined">clear</span>
              </button>
            </li>
          ))}
          {urlList.length < 1 && (
            <li className="text-gray-600 mt-3">No urls found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UrlCollection;
