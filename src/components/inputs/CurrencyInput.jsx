import React, { useState, useEffect } from "react";

const CurrencyInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  className,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const inputVal = e.target.value;
    const numericValue = inputVal.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
    onChange({
      target: { name, value: numericValue },
    });
  };

  const formattedValue = inputValue
    ? new Intl.NumberFormat("id-ID").format(Number(inputValue))
    : "";

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-sm px-2">
        Rp.
      </span>
      <input
        id={id}
        name={name}
        type="text"
        value={formattedValue}
        onChange={handleChange}
        onBlur={onBlur}
        className={`pl-8 w-full ${className}`}
        {...rest}
      />
    </div>
  );
};

export default CurrencyInput;
