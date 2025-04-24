import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Checkbox } from "@mui/material";
import { useSelectOptions } from "@/hooks/queries";

const ArraySelectInput = ({ field, value, onChange }) => {
  const { data = [], isLoading } = useSelectOptions(field);

  const options = field.options || data;

  const labelKey = field.options?.label || "label";
  const valueKey = field.options?.value || "value";
  const placeholder = field.options?.placeholder || "Select Data";

  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValues(value.map((v) => v.id));
    }
  }, [value]);

  const handleChange = (event) => {
    const selectedIds = event.target.value;

    const valuesToSend = selectedIds.map((id) => ({ id }));
    setSelectedValues(selectedIds);

    onChange({
      target: {
        name: field.id,
        value: valuesToSend,
      },
    });
  };

  return (
    <div className="w-full">
      <Select
        id={field.id}
        multiple
        fullWidth
        displayEmpty
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput className="text-sm text-gray-900" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // or whatever fits nicely
              overflowY: "auto",
            },
          },
          classes: { paper: "bg-white shadow-md rounded-lg" },
          style: { width: "100%" },
        }}
        
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="text-gray-400 text-left w-full">{placeholder}</span>;
          }
          return (
            <div className="flex flex-wrap gap-1">
              {selected.map((id) => {
                const label =
                  options.find((opt) => opt[valueKey] === id)?.[labelKey] || id;
                return (
                  <span
                    key={id}
                    className="px-4 py-2 bg-blue-500 text-white text-xs rounded-md"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          );
        }}
        className="text-sm py-1 h-12 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {options.map((option) => (
          <MenuItem
            key={option[valueKey]}
            value={option[valueKey]}
            className="flex items-center gap-2"
          >
            <Checkbox
              checked={selectedValues.includes(option[valueKey])}
              className="text-blue-500"
            />
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ArraySelectInput;
