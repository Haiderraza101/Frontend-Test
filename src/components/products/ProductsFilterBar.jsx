import React from 'react';
import { Search, Filter, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import DateCalendar from '../ui/calendar';

/**
 * ProductsFilterBar Component
 * Handles all filtering functionality including search, date, and status filters
 */
export function ProductsFilterBar({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  statusFilter,
  onStatusChange,
  isCalendarOpen,
  setIsCalendarOpen,
  isStatusOpen,
  setIsStatusOpen
}) {
  const formattedDate = selectedDate.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  const statusOptions = ['All', 'Published', 'Draft List', 'Inactive', 'Stock Out'];

  return (
    <div className="px-8 py-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 border-gray-200 bg-gray-50/50 focus:bg-white text-sm rounded-lg"
        />
      </div>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger 
          className="flex items-center gap-2 px-3 h-10 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span>{formattedDate}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-300" />
        </PopoverTrigger>
        <PopoverContent 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
          align="left" 
          className="p-0"
        >
          <DateCalendar 
            selectedDate={selectedDate} 
            onSelectDate={(date) => { 
              onDateChange(date); 
              setIsCalendarOpen(false); 
            }} 
          />
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Select className="w-auto">
        <SelectTrigger 
          className="h-10 min-w-[130px] text-sm shadow-sm" 
          onClick={() => setIsStatusOpen(!isStatusOpen)}
        >
          <SelectValue value={statusFilter === 'All' ? 'All Status' : statusFilter} />
        </SelectTrigger>
        <SelectContent 
          isOpen={isStatusOpen} 
          onClose={() => setIsStatusOpen(false)}
        >
          {statusOptions.map(status => (
            <SelectItem 
              key={status} 
              isSelected={statusFilter === status} 
              onClick={() => { 
                onStatusChange(status); 
                setIsStatusOpen(false); 
              }}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Additional Filters Button */}
      <Button 
        variant="ghost" 
        className="h-10 px-4 text-gray-500 hover:text-gray-900 font-medium text-sm"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
}
