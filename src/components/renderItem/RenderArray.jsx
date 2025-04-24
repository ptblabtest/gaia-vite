import React from 'react';

export const RenderArray = ({ value, className = '' }) => {
  return <span className={className}>{JSON.stringify(value)}</span>;
};