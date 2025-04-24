import { useSelectOptions } from "@/hooks/queries";
import React, { useMemo } from "react";
import Select from "react-select";

const SelectInput = ({ field, value, onChange }) => {
  const { id, label, options = [], disabled = false } = field;

  const { data = [] } = useSelectOptions(field);

  const finalOptions = options.length > 0 ? options : data;

  const mappedOptions = useMemo(
    () =>
      finalOptions.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    [finalOptions]
  );
  

  if (mappedOptions.length === 0) return null;


  const selectedOption =
    mappedOptions.find((opt) => String(opt.value) === String(value)) || null;

  return (
    <div className="relative w-full flex gap-2">
      <div className="flex-grow">
        <Select
          id={id}
          name={id}
          value={selectedOption}
          onChange={(selectedOption) =>
            onChange({
              target: { value: selectedOption?.value, name: id },
            })
          }
          options={mappedOptions}
          isDisabled={disabled}
          isSearchable
          placeholder={`Select ${label}`}
          className="w-full h-8"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            control: (provided, state) => ({
              ...provided,
              minHeight: "1.8rem",
              padding: "0 0.4rem",
              fontSize: "0.875rem",
              width: "100%",
              borderColor: "black",
              borderRadius: "0.375rem",
              boxShadow: state.isFocused
                ? "0 0 0 1px rgba(0, 0, 0, 0.5)"
                : "none",
              "&:hover": {
                borderColor: "black",
              },
            }),

            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: "0",
              height: "1.8rem",
              alignItems: "center",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              margin: "0",
              padding: "0",
              height: "1.6rem",
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              lineHeight: "1.8rem",
              textAlign: "left",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              lineHeight: "1.8rem",
              textAlign: "left",
            }),
            indicatorsContainer: (baseStyles) => ({
              ...baseStyles,
              height: "1.8rem",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 1500,
              padding: "0 0.5rem",
              fontSize: "0.875rem",
              minHeight: "120px",
              maxHeight: "200px",
              position: "absolute",
            }),
            menuPortal: (baseStyles) => ({
              ...baseStyles,
              zIndex: 1500,
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              maxHeight: "180px",
              minHeight: "100px",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default SelectInput;
