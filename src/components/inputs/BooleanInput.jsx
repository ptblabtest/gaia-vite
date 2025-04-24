import React, { useEffect } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

const BooleanInput = ({ value, onChange, onBlur, field }) => {
  const isChecked = value === true;

  useEffect(() => {
    if (value !== true) {
      onChange({
        target: {
          name: field.id,
          value: false
        }
      });
    }
  }, [field.id, onChange, value]);

  const handleChange = (e) => {
    onChange({
      target: {
        name: field.id,
        value: e.target.checked
      }
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={isChecked}
            onChange={handleChange}
            onBlur={onBlur}
            name={field.id}
            color="primary"
          />
        }
        label={isChecked ? 'Yes' : 'No'}
      />
    </FormGroup>
  );
};

export default BooleanInput;