import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay } from "date-fns";
import { pl } from "date-fns/locale";
import CalendarGrid from "./CalendarGrid";


const CalendarView = () => {
  // Stan dla bieżącego miesiąca
  const [currentDate, setCurrentDate] = useState(new Date());
  // Stan dla wybranego dnia
  const [selectedDay, setSelectedDay] = useState(null);
  // Stan dla listy wydarzeń
  const [events, setEvents] = useState([]);
  // Stan dla formularza wydarzenia
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Obliczanie danych dla kalendarza
  const monthStart = startOfMonth(currentDate);
  const monthDays = getDaysInMonth(currentDate);
  const firstDay = getDay(monthStart); // 0 (niedziela) do 6 (sobota)
  const today = new Date();

  // Funkcje nawigacji po miesiącach
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDay(null);
  };

  // Kliknięcie w dzień
  const handleDayClick = (day) => {
    setSelectedDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setEditingEvent(null);
    clearForm();
  };

  // Dodawanie nowego wydarzenia
  const handleAddEvent = () => {
    if (!selectedDay || !newEventTitle) return;

    const newEvent = {
      id: Date.now(), // Unikalne ID oparte na czasie
      date: selectedDay,
      title: newEventTitle,
      time: newEventTime,
      description: newEventDescription,
    };

    setEvents([...events, newEvent]);
    clearForm();
    setSelectedDay(null);
  };

  // Edytowanie istniejącego wydarzenia
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setSelectedDay(new Date(event.date));
    setNewEventTitle(event.title);
    setNewEventTime(event.time || "");
    setNewEventDescription(event.description || "");
  };

  // Aktualizacja wydarzenia
  const handleUpdateEvent = () => {
    if (!editingEvent || !newEventTitle) return;

    setEvents(
      events.map((event) =>
        event.id === editingEvent.id
          ? { ...event, date: selectedDay, title: newEventTitle, time: newEventTime, description: newEventDescription }
          : event
      )
    );
    clearForm();
    setEditingEvent(null);
    setSelectedDay(null);
  };

  // Usuwanie wydarzenia
  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  // Czyszczenie formularza
  const clearForm = () => {
    setNewEventTitle("");
    setNewEventTime("");
    setNewEventDescription("");
  };

  // Zamykanie formularza
  const handleCloseForm = () => {
    clearForm();
    setEditingEvent(null);
    setSelectedDay(null);
  };

  // Filtrowanie wydarzeń dla wybranego dnia
  const selectedDayEvents = selectedDay
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDay.getDate() &&
          event.date.getMonth() === selectedDay.getMonth() &&
          event.date.getFullYear() === selectedDay.getFullYear()
      )
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900/80 text-white rounded-2xl p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Kalendarz ({format(currentDate, "LLLL yyyy", { locale: pl })})
      </h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Poprzedni
        </button>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Następny
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lewa kolumna: Kalendarz lub formularz */}
        <div className="md:w-1/2 bg-gray-800 rounded-lg p-4">
          {selectedDay ? (
            <EventForm
              selectedDay={selectedDay}
              editingEvent={editingEvent}
              newEventTitle={newEventTitle}
              newEventTime={newEventTime}
              newEventDescription={newEventDescription}
              setNewEventTitle={setNewEventTitle}
              setNewEventTime={setNewEventTime}
              setNewEventDescription={setNewEventDescription}
              onSave={editingEvent ? handleUpdateEvent : handleAddEvent}
              onClose={handleCloseForm}
            />
          ) : (
            <CalendarGrid
              currentDate={currentDate}
              today={today}
              events={events}
              selectedDay={selectedDay}
              firstDay={firstDay}
              monthDays={monthDays}
              onDayClick={handleDayClick}
            />
          )}
        </div>

        {/* Prawa kolumna: Lista wydarzeń */}
        <div className="md:w-1/2 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            Wydarzenia {selectedDay ? format(selectedDay, "d LLLL yyyy", { locale: pl }) : "dzisiaj"}
          </h2>
          {selectedDayEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedDayEvents.map((event) => (
                <li key={event.id} className="p-2 bg-gray-700 rounded">
                  <p className="font-medium">{event.title}</p>
                  {event.time && <p className="text-sm text-gray-300">{event.time}</p>}
                  {event.description && <p className="text-sm text-gray-300">{event.description}</p>}
                  <div className="mt-1">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="text-blue-400 hover:underline mr-2"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-400 hover:underline"
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Brak wydarzeń w tym dniu.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;