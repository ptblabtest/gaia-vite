'use client';
import React from 'react';
import RenderItem from '@/config/RenderItem';

const Stats = ({ items = [] }) => {
  if (!items.length) return null;

  const getGridCols = () => {
    if (items.length === 4) return 'grid-cols-4 lg:grid-cols-4';
    if (items.length === 2) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm my-1 border border-gray-200">
      <div className={`grid ${getGridCols()} gap-2 text-center`}>
        {items.map((stat, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg border flex flex-col justify-between ${
              stat.color
                ? `bg-${stat.color}-50 border-${stat.color}-100`
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <h3 className="text-sm text-left font-medium text-gray-600 min-h-[1.5rem]">
              {stat.label}
            </h3>
            <p
              className={`text-lg text-left font-bold leading-tight ${
                stat.textColor ? `text-${stat.textColor}-600` : 'text-gray-700'
              }`}
            >
              <RenderItem type={stat.type} value={stat.value} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
