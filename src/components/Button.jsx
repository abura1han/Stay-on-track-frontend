import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium text-base ${
        props.className && props.className
      }`}
    >
      {props.children && props.children}
    </button>
  );
};

export default Button;
