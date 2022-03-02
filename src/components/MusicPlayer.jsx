import React from "react";

const MusicPlayer = () => {
  return (
    <div className="bg-gradient-to-tr from-black to-transparent relative rounded p-2 overflow-y-auto min-h-[190px] z-0">
      <div className="flex justify-center mt-4">
        <span className="material-icons-outlined">music_note</span>
      </div>
      <div className="text-center text-gray-200 font-light mt-2">
        <p>Can't focuse on study</p>
        <p>Listen a concentration music</p>
      </div>
      <div className="flex justify-center mt-5">
        {true ? (
          <button>
            <span className="material-icons-outlined">play_circle</span>
          </button>
        ) : (
          <button className="ml-2">
            <span class="material-icons-outlined">pause_circle</span>
          </button>
        )}
        <button className="ml-2">
          <span className="material-icons-outlined">skip_next</span>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
