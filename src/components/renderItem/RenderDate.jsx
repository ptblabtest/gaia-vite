import React from 'react';
import moment from 'moment';

export const RenderDate = ({ value, className = '' }) => {
  return <span className={className}>{moment(value).format('DD MMM YYYY')}</span>;
};