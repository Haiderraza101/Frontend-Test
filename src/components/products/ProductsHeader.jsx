import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function ProductsHeader({ onCreateProduct }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-white border-b border-gray-100 shrink-0 gap-4 sm:gap-0">
      <div className="text-center sm:text-left">
        <h1 className="text-xl font-bold text-[#111827]">Products</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track your inventory levels.</p>
      </div>
      <Button 
        onClick={onCreateProduct}
        className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white rounded-lg h-9 px-4 text-xs font-bold transition-all cursor-pointer"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Product
      </Button>
    </div>
  );
}
