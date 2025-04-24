import React, { useState, useEffect } from 'react';

const PercentInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  className,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const inputVal = e.target.value;
    const numericValue = inputVal.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
    onChange({
      target: { name, value: numericValue },
    });
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
        className={`${className} pr-2`}
        placeholder=""
        {...rest}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-sm pointer-events-none">
        %
      </span>
    </div>
  );
};

export default PercentInput;