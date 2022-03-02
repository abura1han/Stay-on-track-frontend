import React from "react";
import concentrations from "../configs/concerntration.json";

const Concentration = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto px-3 mb-10 shadow shadow-gray-300 border border-gray-300 rounded">
      <h2 className="text-xl font-medium my-2">Concentration</h2>
      <div className="mb-5 border-l-4 border-l-yellow-300 px-2 py-2 bg-yellow-100 rounded">
        <p className="text-gray-600">
          Just play one video and run that in the background and focus on your
          work. It will increase your productivity.
        </p>
      </div>
      <div>
        <ul>
          {concentrations.map(({ videoId }, i) => (
            <ol className="flex">
              <iframe
                key={i}
                width="100%"
                height="315"
                className="mb-5 rounded"
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </ol>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Concentration;
