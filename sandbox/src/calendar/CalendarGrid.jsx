import React from "react";

const days = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];

const CalendarGrid = ({
  currentDate,
  today,
  events,
  selectedDay,
  firstDay,
  monthDays,
  onDayClick,
}) => {
  return (
    <div>
      {/* Nagłówek dni tygodnia */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-300 mb-2">
        {days.map((day, idx) => (
          <div key={idx} className="text-xs">
            {day}
          </div>
        ))}
      </div>

      {/* Siatka dni */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Puste miejsca przed pierwszym dniem miesiąca */}
        {[...Array(firstDay).fill(null)].map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}

        {/* Dni miesiąca */}
        {[...Array(monthDays)].map((_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          const hasEvent = events.some(
            (event) =>
              event.date.getDate() === day &&
              event.date.getMonth() === currentDate.getMonth() &&
              event.date.getFullYear() === currentDate.getFullYear()
          );

          const isSelected =
            selectedDay &&
            selectedDay.getDate() === day &&
            selectedDay.getMonth() === currentDate.getMonth() &&
            selectedDay.getFullYear() === currentDate.getFullYear();

          return (
            <div
              key={`day-${i}`}
              onClick={() => onDayClick(day)}
              className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full cursor-pointer
                ${isSelected ? "bg-blue-500 text-white" : ""}
                ${isToday && !isSelected ? "bg-orange-500 text-white" : ""}
                ${hasEvent && !isToday && !isSelected ? "bg-blue-600 text-white" : ""}
                ${!isSelected && !isToday && !hasEvent ? "text-gray-200 hover:bg-gray-700" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;