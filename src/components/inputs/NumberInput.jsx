import React, { useState, useEffect } from 'react';

const formatNumberWithDots = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adds dots as thousand separators
};

const removeNonNumeric = (value) => {
  return value.replace(/[^0-9]/g, ''); // Removes non-numeric characters
};

const NumberInput = ({
  field,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value ? formatNumberWithDots(value.toString()) : '');

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(formatNumberWithDots(value.toString()));
    }
  }, [value]);

  const handleChange = (e) => {
    const rawValue = removeNonNumeric(e.target.value); // Keep only numbers
    const formattedValue = formatNumberWithDots(rawValue); // Add dot separators
    setInputValue(formattedValue);
    onChange({
      target: { name: field.id, value: rawValue }, // Send raw numeric value without dots
    });
  };

  return (
    <input
      id={field.id}
      name={field.id}
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder || field.placeholder || `Input ${field.label}`}
      disabled={disabled || field.disabled || false}
      className={className}
    />
  );
};

export default NumberInput;