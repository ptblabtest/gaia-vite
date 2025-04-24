import React from "react";

const leadForm = (fields, formikProps, renderField) => {
  const fieldMap = Object.fromEntries(fields.map((f) => [f.item, f]));

  const nameField = fieldMap["name"];
  const descriptionField = fieldMap["description"];

  const otherFields = fields.filter(
    (f) => !["name", "description"].includes(f.item)
  );

  return (
    <>
      {(nameField || descriptionField) && (
        <div className="flex flex-col md:flex-row md:space-x-4">
          {nameField && (
            <div className="flex-1 mb-4 md:mb-0">
              {renderField(nameField, formikProps)}
            </div>
          )}
          {descriptionField && (
            <div className="flex-1">
              {renderField(descriptionField, formikProps)}
            </div>
          )}
        </div>
      )}

      {otherFields.map((field) => renderField(field, formikProps))}
    </>
  );
};

export default leadForm;
