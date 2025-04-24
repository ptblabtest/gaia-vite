import React from 'react';
import 'moment/locale/id';
import {
  RenderDate,
  RenderCurrency,
  RenderBoolean,
  RenderPercent,
  RenderPhone,
  RenderUrl,
  RenderEmail,
  RenderNull, RenderArray
}from '../components/renderItem';

const RenderItem = ({ type, value, className = '' }) => {
  if (value === null || value === undefined || value === '') {
    return <RenderNull className={className} />;
  }
  
  if (Array.isArray(value)) {
    return <RenderArray value={value} className={className} />;
  }
  
  switch (type) {
    case 'date':
      return <RenderDate value={value} className={className} />;
    case 'currency':
      return <RenderCurrency value={value} className={className} />;
    case 'boolean':
      return <RenderBoolean value={value} className={className} />;
    case 'percent':
      return <RenderPercent value={value} className={className} />;
    case 'phone':
      return <RenderPhone value={value} className={className} />;
    case 'url':
      return <RenderUrl value={value} className={className} />;
    case 'email':
      return <RenderEmail value={value} className={className} />;
    default:
      return <span>{value}</span>;
  }
};

export default RenderItem;