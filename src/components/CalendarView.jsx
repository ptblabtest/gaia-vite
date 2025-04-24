'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';

const CalendarView = ({ items, titleAccessor, startAccessor, endAccessor, children }) => {
  const localizer = momentLocalizer(moment);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); 

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const events = items.map((item) => ({
    id: item.id,
    title: titleAccessor(item),
    start: startAccessor(item),
    end: endAccessor(item),
    rawItem: item,
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.rawItem);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div style={{ pointerEvents: 'auto' }} className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={currentDate}
        view={currentView} 
        onNavigate={handleNavigate}
        onView={handleViewChange}
        defaultView="month"
        onSelectEvent={handleSelectEvent} 
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedEvent && children(selectedEvent)}
      </Modal>
    </div>
  );
};

export default CalendarView;
