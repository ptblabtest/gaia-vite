import React from "react";
import {
  DateInput,
  PhoneInput,
  BooleanInput,
  CurrencyInput,
  ToggleInput,
  PercentInput,
  NumberInput,
  SelectInput,
  ArraySelectInput,
} from "@/components/inputs";

const RenderInput = ({ field, value, onChange, onBlur, type, className }) => {
  const handleChange = (event) => {
    if (field.mode === "uppercase" && typeof event.target.value === "string") {
      event.target.value = event.target.value.toUpperCase();
    }
    onChange(event);
  };

  const props = {
    field: field,
    value: value ?? field.defaultValue ?? "",
    onChange: handleChange,
    onBlur,
    id: field.id,
    name: field.id,
    placeholder: field.placeholder || `Input ${field.label}`,
    disabled: field.disabled || false,
    className: `${
      className || ""
    } pl-2 pr-2 py-1 text-sm block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`.trim(),
  };

  

  switch (type) {
    case "array":
      return <ArraySelectInput {...props} />;
    case "date":
      return <DateInput {...props} />;
    case "select":
      return <SelectInput {...props} />;
    case "phone":
      return <PhoneInput {...props} />;
    case "toggle":
      return <ToggleInput {...props} />;
    case "boolean":
      return <BooleanInput {...props} />;
    case "currency":
      return <CurrencyInput {...props} />;
    case "percent":
      return <PercentInput {...props} />;
    case "number":
      return <NumberInput {...props} />;
    case "password":
      return <input type="password" {...props} />;
    case "disabled":
      return <input type={type || "text"} {...props} disabled />;
    case "textarea": {
      const rows = parseInt(field.rows) || 10;
      return <textarea {...props} rows={rows} />;
    }
    case "hidden":
      return <input type="hidden" {...props} className="" placeholder="" />;
    default:
      return <input type={type || "text"} {...props} />;
  }
};

export default RenderInput;
