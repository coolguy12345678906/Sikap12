import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { IconPlus, IconClose, IconChevronLeft, IconChevronRight, IconEdit, IconTrash } from './Icons';

const CalendarView = () => {
  const { t, events, setEvents } = useAppContext();
  
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    details: ''
  });

  // Derived State
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Navigation handlers
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Grid generation
  const calendarGrid = useMemo(() => {
    const days = [];
    // Padding for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [year, month]);

  // Event helpers
  const getEventsForDate = (dateStr) => {
    return events.filter(e => e.date === dateStr);
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  // Modal handlers
  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      date: selectedDate,
      title: '',
      details: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      date: event.date,
      title: event.title,
      details: event.details
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id) => {
    if (confirm(t('cal_delete_confirm'))) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update
      setEvents(prev => prev.map(ev => 
        ev.id === editingEvent.id 
          ? { ...ev, date: formData.date, title: formData.title, details: formData.details }
          : ev
      ));
    } else {
      // Create
      const newEvent = {
        id: Date.now(),
        date: formData.date,
        title: formData.title,
        details: formData.details
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('cal_title')}</h1>
        <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg mb-4 md:mb-6 font-medium">{t('cal_subtitle')}</p>
        
        <button 
          onClick={openAddModal}
          className="
            flex items-center gap-2 px-6 py-3 md:py-2 rounded-full 
            border-[3px] border-sikap-teal 
            bg-white dark:bg-sikap-dark-surface text-sikap-teal font-bold 
            transition-all duration-200 ease-in-out
            hover:bg-sikap-teal hover:text-white
            active:bg-[#4daeb1] active:border-sikap-orange active:text-white
            shadow-sm hover:shadow-md w-full md:w-fit justify-center md:justify-start touch-manipulation
          "
        >
          <IconPlus className="w-5 h-5" />
          <span>{t('cal_add_btn')}</span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 md:gap-8 flex-1 min-h-0">
        {/* Calendar Grid Section */}
        <div className="flex-1 bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 md:p-6 flex flex-col shadow-sm overflow-hidden">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition text-sikap-dark dark:text-gray-300">
              <IconChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg md:text-2xl font-bold text-sikap-dark dark:text-white uppercase tracking-wide text-center">
              {monthName} <span className="text-sikap-teal block md:inline">{year}</span>
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition text-sikap-dark dark:text-gray-300">
              <IconChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 mb-4 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold text-gray-400 text-xs md:text-sm uppercase tracking-wider truncate">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 flex-1">
            {calendarGrid.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-1"></div>;
              }

              // Format date string for comparison: YYYY-MM-DD
              // Note: month is 0-indexed in JS Date, need +1 for string
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = dateStr === selectedDate;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;
              const dayEvents = getEventsForDate(dateStr);
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    relative rounded-xl p-1 md:p-2 flex flex-col items-center justify-center min-h-[45px] md:min-h-[60px] transition-all
                    ${isSelected 
                      ? 'bg-sikap-teal text-white shadow-md scale-105 z-10 font-bold' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-sikap-dark dark:text-gray-300 bg-gray-50/30 dark:bg-gray-800/30'
                    }
                    ${isToday && !isSelected ? 'border-2 border-sikap-orange' : 'border border-transparent'}
                  `}
                >
                  <span className="text-sm md:text-lg">{day}</span>
                  {hasEvents && (
                    <div className="flex gap-1 mt-1">
                      {dayEvents.slice(0, 3).map((ev, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-sikap-orange'}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Section */}
        <div className="w-full xl:w-96 bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 md:p-6 flex flex-col shadow-sm h-fit">
          <h3 className="text-base md:text-lg font-bold text-gray-400 uppercase tracking-wider mb-1">{t('cal_events_for')}</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-sikap-teal mb-6">
            {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </h2>

          <div className="flex flex-col gap-4 max-h-[300px] xl:max-h-[500px] overflow-y-auto">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map(event => (
                <div key={event.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-l-4 border-sikap-orange group hover:shadow-sm transition">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sikap-dark dark:text-white text-base md:text-lg">{event.title}</h4>
                    <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(event)}
                        className="text-gray-400 hover:text-sikap-teal p-1 touch-manipulation"
                        title="Edit"
                      >
                        <IconEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-gray-400 hover:text-red-500 p-1 touch-manipulation"
                        title="Delete"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">
                    {event.details}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400 italic bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                {t('cal_no_events')}
              </div>
            )}
          </div>
          
          <button 
            onClick={openAddModal}
            className="mt-6 w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:border-sikap-teal hover:text-sikap-teal font-bold transition flex items-center justify-center gap-2 touch-manipulation"
          >
            <IconPlus className="w-5 h-5" />
            {t('cal_add_btn')}
          </button>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            
            {/* Modal Header */}
            <div className="p-6 flex justify-between items-start bg-sikap-teal">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingEvent ? t('cal_edit_modal_title') : t('cal_add_modal_title')}
                </h2>
                <p className="text-white/80 text-sm mt-1">{t('proj_fill_details')}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full hover:bg-white/20 transition">
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cal_date_label')}</label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cal_name_label')}</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="e.g. Barangay Meeting"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cal_details_label')}</label>
                <textarea 
                  name="details"
                  rows={4}
                  placeholder="Enter event description..."
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="flex gap-3 mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="submit"
                  className="flex-1 bg-sikap-teal text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-teal-100 dark:shadow-none touch-manipulation"
                >
                  {editingEvent ? t('cal_save') : t('cal_submit')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition touch-manipulation"
                >
                  {t('proj_cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CalendarView;