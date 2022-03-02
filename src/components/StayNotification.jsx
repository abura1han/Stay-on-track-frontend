import React from "react";

const StayNotification = ({ children }) => {
  return (
    <div className="fixed right-4 bottom-4 p-2 bg-white shadow shadow-gray-300">
      {children && children}
    </div>
  );
};

export default StayNotification;
