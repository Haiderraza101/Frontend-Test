import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { cn } from '../../lib/utils';

export function ProductsPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  isItemsPerPageOpen,
  setIsItemsPerPageOpen
}) {
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pageSizeOptions = [7, 10, 20];

  const handleItemsPerPageChange = (value) => {
    onItemsPerPageChange(value);
    onPageChange(1); 
    setIsItemsPerPageOpen(false);
  };

  return (
    <div className="px-8 py-4 bg-[#fafafa] border-t border-gray-100 flex items-center justify-between shrink-0">
      {/* Left Side - Info */}
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <span className="font-medium">
          Showing{' '}
          <span className="text-gray-900 font-bold">{startItem}-{endItem}</span>
          {' '}of{' '}
          <span className="text-gray-900 font-bold">{totalItems}</span>
        </span>
        
        <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Page Size
          </span>
          <Select className="w-auto">
            <SelectTrigger 
              className="h-8 min-w-[70px] bg-white focus:ring-[#16a34a] focus:border-[#16a34a] cursor-pointer" 
              onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
            >
              <SelectValue value={itemsPerPage} />
            </SelectTrigger>
            <SelectContent 
              isOpen={isItemsPerPageOpen} 
              onClose={() => setIsItemsPerPageOpen(false)}
              className="bottom-full mt-0 mb-2 border-[#16a34a]/20"
            >
              {pageSizeOptions.map(size => (
                <SelectItem 
                  key={size} 
                  isSelected={itemsPerPage === size}
                  onClick={() => handleItemsPerPageChange(size)}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Side - Page Controls */}
      <div className="flex items-center gap-2">
        <Button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)} 
          variant="outline" 
          className="h-9 px-4 text-xs font-bold rounded-lg cursor-pointer"
        >
          Prev
        </Button>
        
        <div className="flex items-center gap-1 mx-2">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Button 
                key={pageNumber} 
                onClick={() => onPageChange(pageNumber)} 
                className={cn(
                  "h-8 w-8 p-0 text-xs font-bold rounded-lg transition-all cursor-pointer", 
                  currentPage === pageNumber 
                    ? "bg-black text-white" 
                    : "bg-transparent text-gray-400 hover:text-black"
                )}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
        
        <Button 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)} 
          variant="outline" 
          className="h-9 px-4 text-xs font-bold rounded-lg cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
