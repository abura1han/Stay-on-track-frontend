import React from "react";
import StayHeader from "./StayHeader";
import StaySidebar from "./StaySidebar";

const StayWrapper = ({ children }) => {
  return (
    <>
      <StayHeader />
      <div className="flex w-full min-h-stay-nav-min-height">
        <StaySidebar />
        {children && children}
      </div>
    </>
  );
};

export default StayWrapper;
