import React from "react";

const BtnPrimary = ({ children }) => {
  return (
    <button className="bg-stay-primary text-white px-4 py-2 rounded-lg font-medium text-base">
      {children && children}
    </button>
  );
};

export default BtnPrimary;
