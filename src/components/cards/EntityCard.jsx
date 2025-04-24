import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import RenderItem from "@/config/RenderItem";

const EntityCard = ({ item, card }) => {
  const metadataConfig = [
    { label: "Created By", item: "createdByName" },
    { label: "Created At", item: "createdAt", type: "date" },
    { label: "Updated By", item: "updatedByName" },
    { label: "Updated At", item: "updatedAt", type: "date" },
  ];

  if (!item) {
    return (
      <div className="flex justify-center h-full text-left">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto text-left">
      <dl className="divide-y divide-gray-100">
        {(() => {
          const renderedFields = [];

          for (let i = 0; i < card.length; i++) {
            const config = card[i];

            if (config.cols) {
              // Always render title
              renderedFields.push(
                <div key={`group-${config.label}`} className="p-1 md:px-0">
                  <dt className="p-1 text-lg font-bold leading-6 text-gray-900 border-b">
                    {config.label}
                  </dt>
                </div>
              );

              // For small screens, render below title one by one
              const groupItems = card.slice(i + 1, i + 1 + config.cols);
              renderedFields.push(
                <div
                  key={`group-items-${config.label}`}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2 px-1"
                >
                  {groupItems.map((itemConfig) => (
                    <div key={itemConfig.label} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {itemConfig.label}
                      </span>
                      <span className="text-sm text-gray-700">
                        <RenderItem
                          type={itemConfig.type}
                          value={item[itemConfig.item]}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              );

              i += config.cols;
            } else if (config.item) {
              // Normal field rendering
              renderedFields.push(
                <div
                  key={config.label}
                  className="px-2 grid grid-cols-1 md:grid-cols-3 gap-1"
                >
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {config.label}
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700 md:col-span-2 mt-0">
                    <RenderItem
                      type={config.type}
                      value={item[config.item]}
                    />
                  </dd>
                </div>
              );
            } else {
              // Section title
              renderedFields.push(
                <div key={config.label} className="p-1 md:px-0">
                  <dt className="p-1 text-lg font-bold leading-6 text-gray-900 border-b">
                    {config.label}
                  </dt>
                </div>
              );
            }
          }

          return renderedFields;
        })()}

        {/* Audit section */}
        <div className="p-1 md:px-0">
          <dt className="p-1 text-lg font-bold leading-6 text-gray-900 border-b">
            Audit Records
          </dt>
        </div>
        {metadataConfig.map((config) => (
          <div
            key={config.label}
            className="px-2 grid grid-cols-1 md:grid-cols-3 gap-1"
          >
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {config.label}
            </dt>
            <dd className="text-sm leading-6 text-gray-700 md:col-span-2 mt-0">
              <RenderItem type={config.type} value={item[config.item]} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default EntityCard;
