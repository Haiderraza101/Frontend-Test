import * as React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DateCalendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const prevMonthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  );

  const days = [];

  for (let i = startOfMonth.getDay() - 1; i >= 0; i--) {
    const d = new Date(prevMonthEnd);
    d.setDate(prevMonthEnd.getDate() - i);
    days.push({ date: d, isCurrentMonth: false });
  }

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    days.push({
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
      isCurrentMonth: true,
    });
  }

  while (days.length % 7 !== 0) {
    const nextDay = new Date(endOfMonth);
    nextDay.setDate(endOfMonth.getDate() + (days.length - startOfMonth.getDay() + 1));
    days.push({ date: nextDay, isCurrentMonth: false });
  }

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (date) => {
    onSelectDate(date);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelectDate(today);
  };

  return (
    <div className="w-[340px] p-4 bg-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-gray-100 text-gray-600 flex items-center justify-center rounded-lg hover:bg-gray-50 hover:text-black"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-[14px] font-bold text-black uppercase tracking-wider">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-gray-100 text-gray-600 flex items-center justify-center rounded-lg hover:bg-gray-50 hover:text-black"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map(({ date, isCurrentMonth }) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={cn(
                "h-9 w-9 mx-auto flex items-center justify-center rounded-xl text-[13px] font-semibold transition-all",
                !isCurrentMonth
                  ? "text-gray-200"
                  : isSelected
                  ? "bg-black text-white shadow-lg shadow-black/20"
                  : isToday
                  ? "text-black bg-gray-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-4 text-gray-500 hover:text-black font-bold text-[13px] rounded-xl"
          onClick={handleTodayClick}
        >
          Today
        </Button>
        <div className="text-[11px] font-bold text-gray-300 uppercase tracking-tighter">
          Select Date
        </div>
      </div>
    </div>
  );
};

export default DateCalendar;
