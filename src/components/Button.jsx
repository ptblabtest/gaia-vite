import React from "react";

const Button = ({
  type = "submit",
  className = "",
  onClick = null,
  children = null,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center cursor-pointer
        ${
          className ||
          "border border-transparent rounded-md font-semibold text-white tracking-widest bg-gray-800 hover:bg-gray-700 active:bg-gray-900 disabled:opacity-25 transition ease-in-out duration-150"
        }
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
