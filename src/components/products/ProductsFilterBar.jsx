import React from 'react';
import { Search, Calendar as CalendarIcon, ChevronDown, RotateCcw, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import DateCalendar from '../ui/calendar';

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
  setIsStatusOpen,

  onReset,
  selectedCount = 0,
  onDeleteSelected
}) {
  const formattedDate = selectedDate.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  const statusOptions = ['All', 'Published', 'Draft List', 'Inactive', 'Stock Out'];

  return (
    <div className="px-4 sm:px-8 py-4 bg-white border-b border-gray-100 flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-stretch md:items-center gap-3 shrink-0">
      {/* Search Input */}
      <div className="relative w-full md:flex-1 md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" />
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 border-gray-200 bg-gray-50/50 focus:bg-white text-sm rounded-lg focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] ring-offset-0 transition-all"
        />
      </div>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger 
          className="flex items-center justify-between md:justify-start gap-2 px-3 h-10 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-all outline-none focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] w-full md:w-auto cursor-pointer"
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
          className="p-0 border-[#16a34a]/20"
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
      <Select className="w-full md:w-auto">
        <SelectTrigger 
          className="h-10 text-sm cursor-pointer w-full md:min-w-[130px]" 
          onClick={() => setIsStatusOpen(!isStatusOpen)}
        >
          <SelectValue value={statusFilter === 'All' ? 'All Status' : statusFilter} />
        </SelectTrigger>
        <SelectContent 
          isOpen={isStatusOpen} 
          onClose={() => setIsStatusOpen(false)}
          className="border-[#16a34a]/20 w-full"
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



      {/* Reset Filter Button */}
      <Button 
        variant="ghost" 
        onClick={onReset}
        className="h-10 px-4 text-[#16a34a] hover:text-[#15803d] hover:bg-[#dcfce7]/50 font-medium text-sm transition-colors w-full md:w-auto cursor-pointer"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset Filter
      </Button>

      {/* Bulk Actions - Forces new row on Tablet (md) */}
      {selectedCount > 0 && (
        <>
          <div className="w-full h-0 hidden md:block lg:hidden basis-full" />
          <div className="hidden md:block lg:block h-6 w-px bg-gray-200 mx-1 md:hidden lg:block" />
          <Button 
            variant="ghost" 
            onClick={onDeleteSelected}
            className="h-10 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium text-sm transition-colors animate-in fade-in slide-in-from-right-5 duration-200 w-full md:w-auto md:ml-auto lg:ml-0 cursor-pointer"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete ({selectedCount})
          </Button>
        </>
      )}
    </div>
  );
}
