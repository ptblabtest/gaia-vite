import React from "react";
import Button from "@/components/Button"; // adjust path as needed
import sidebarConfig from "@/config/sidebarConfig";

const Sidebar = ({ isOpen }) => {
  const config = sidebarConfig;

  return (
    <div className="p-1 flex-grow">
      <ul className="space-y-2">
        {config.map((item) => (
          <li key={item.path}>
            <Button
              type="button"
              onClick={() => (window.location.href = item.path)}
              className="w-full text-left flex items-center p-1 mt-1 rounded transition duration-200 hover:bg-gray-700"
            >
              <span className="text-gray-300">{item.icon}</span>
              {isOpen && <span className="ml-2 text-left">{item.label}</span>}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
