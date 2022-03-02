import React, { useEffect } from "react";

const StayPopup = ({ children }) => {
  useEffect(() => {
    window.document.body.style.overflow = "hidden";

    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000bb] z-40 overflow-auto mb-2">
      {children && children}
    </div>
  );
};

export default StayPopup;
