import React from 'react';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const DateInput = ({ field, value, onChange, className }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={value ? moment(value) : null}
        onChange={(newValue) =>
          onChange({
            target: {
              name: field.id,
              value: newValue ? newValue.format('YYYY-MM-DD') : null,
            },
          })
        }
        slotProps={{
          textField: {
            variant: 'standard',
            fullWidth: true,
            className: className,
            InputProps: {
              disableUnderline: true,
              className: className,
              style: { fontFamily: 'inherit' },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;