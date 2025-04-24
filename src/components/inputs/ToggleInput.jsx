import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

const ToggleInput = ({ field, value, onChange, onBlur, className }) => {
  const [isVisible, setIsVisible] = useState(value || false);
  
  return (
    <div className="flex items-center space-x-4">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isVisible}
              onChange={(e) => {
                setIsVisible(e.target.checked);
                if (!e.target.checked) {
                  onChange({
                    target: { name: field.id, value: null },
                  });
                }
              }}
              name={field.id}
              color="primary"
            />
          }
          label={isVisible ? 'Manual' : 'Auto Generated'}
        />
      </FormGroup>
      {isVisible && (
        <div className="flex-1">
          <input
            id={field.id}
            name={field.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={field.placeholder || `Input ${field.label}`}
            type="text"
            className={className || "pl-1 text-sm py-1 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
          />
        </div>
      )}
    </div>
  );
};

export default ToggleInput;