import React from 'react';

export const RenderPercent = ({ value, className = '' }) => {
  const formattedValue = Number(value).toFixed(2);
  return <span className={className}>{formattedValue}%</span>;
};