import React from 'react';
import PhoneInputLib from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = ({ field, value, onChange, onBlur, className, name, id }) => {
  return (
    <PhoneInputLib
      country={'id'}
      value={value}
      onChange={(phone) =>
        onChange({ target: { name: name, value: phone } })
      }
      onBlur={(event) =>
        onBlur({
          target: { name: name, value: event.target.value },
        })
      }
      inputProps={{
        name: name,
        id: id,
      }}
      inputStyle={{
        width: '100%',
        fontFamily: 'inherit'
      }}
    />
  );
};

export default PhoneInput;