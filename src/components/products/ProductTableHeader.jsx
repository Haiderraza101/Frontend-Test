import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ProductTableHeader({ 
  selectedCount, 
  totalCount, 
  onToggleSelectAll 
}) {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <thead className="sticky top-0 z-20 bg-[#fafafa]">
      <tr className="border-b border-gray-200">
        <th className="px-6 py-4 w-10">
          <div 
            className={cn(
              "w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-all", 
              isAllSelected 
                ? "bg-[#16a34a] border-[#16a34a]" 
                : "border-gray-300 bg-white hover:border-[#16a34a]"
            )}
            onClick={onToggleSelectAll}
          >
            {isAllSelected && <Check className="h-3 w-3 text-white" />}
          </div>
        </th>
        <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Product
        </th>
        <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Stock
        </th>
        <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
          Price
        </th>
        <th className="px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-20">
          Actions
        </th>
      </tr>
    </thead>
  );
}
