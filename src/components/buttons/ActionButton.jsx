import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@/components/Button";

const ActionButton = ({ title, actions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [renderedComponent, setRenderedComponent] = useState(null);

  const dropdownRef = useRef(null);

  const isActionArray = Array.isArray(actions);

  const object = isActionArray ? null : actions;
  const array = isActionArray ? actions : [];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const DropdownMenu = () =>
    isDropdownOpen && (
      <div
        id="dropdown-menu"
        className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
      >
        {array.map((action, index) => (
          <Button
            key={index}
            type="button"
            onClick={() => {
              setIsDropdownOpen(false);
              if (action.render) {
                setRenderedComponent(
                  action.render({ close: () => setRenderedComponent(null) })
                );
              } else {
                action.onClick?.();
              }
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {action.label}
          </Button>
        ))}
      </div>
    );

  const baseClass =
    "h-10 bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md font-semibold text";

  const layoutClass = title
    ? "px-3 py-2 flex items-center justify-center text-white"
    : "w-10 flex items-center justify-center";

  const buttonProps = {
    type: "button",
    className: `${baseClass} ${layoutClass}`,
  };

  if (object) {
    return (
      <div className="pr-2">
        <Button {...buttonProps} onClick={object.onClick}>
          {title ? (
            title
          ) : (
            <MenuIcon
              className="text-white"
              aria-label={object.label || "Menu"}
            />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative pr-2" ref={dropdownRef}>
      <Button
        {...buttonProps}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdown-menu"
      >
        {title ? title : <MenuIcon className="text-white" aria-label="Menu" />}
      </Button>
      <DropdownMenu />
      {renderedComponent}
    </div>
  );
};

export default ActionButton;
