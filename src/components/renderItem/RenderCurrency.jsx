import React from 'react';

export const RenderCurrency = ({ value, className = '' }) => {
  const isNegative = Number(value) < 0;
  
  return (
    <span className={isNegative ? 'text-red-500' : className}>
      {new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(value))}
    </span>
  );
};