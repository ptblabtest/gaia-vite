import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0"> 
      <div className="relative py-1">
        <div className="px-2 flex space-x-4 border-b border-gray-500">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer px-2 pb-2 text-lg transition-all relative
              ${
                activeIndex === index
                  ? "text-blue-600 font-semibold -mb-[1px] border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-1">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
