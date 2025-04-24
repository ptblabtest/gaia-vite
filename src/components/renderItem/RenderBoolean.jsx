import React from 'react';

export const RenderBoolean = ({ value, className = '' }) => {
  return <span className={className}>{value ? 'Yes' : 'No'}</span>;
};