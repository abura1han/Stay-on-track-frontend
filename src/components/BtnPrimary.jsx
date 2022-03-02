import React from "react";

const BtnPrimary = (props) => {
  return (
    <button
      {...props}
      className="bg-stay-primary shadow shadow-gray-300 hover:shadow-gray-400 text-white px-4 py-2 rounded font-medium text-base"
    >
      {props.children && props.children}
    </button>
  );
};

export default BtnPrimary;
