import React from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export function ProductTableRow({ 
  product, 
  isSelected, 
  onToggleSelect,
  index 
}) {
  const getStockBadge = (stock) => {
    if (stock > 20) {
      return (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#e8f5e9] border border-[#c8e6c9]">
          <div className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          <span className="text-[11px] font-bold text-[#16a34a] whitespace-nowrap">{stock} In Stock</span>
        </div>
      );
    }
    if (stock > 0) {
      return (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#fffde7] border border-[#fff9c4]">
          <div className="h-1.5 w-1.5 rounded-full bg-[#fbc02d]" />
          <span className="text-[11px] font-bold text-[#827717] whitespace-nowrap">{stock} Low Stock</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#fee2e2] border border-[#fecaca]">
        <div className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        <span className="text-[11px] font-bold text-[#b91c1c] whitespace-nowrap">Out of Stock</span>
      </div>
    );
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Published':
        return "bg-[#e8f5e9] text-[#16a34a] border-[#c8e6c9]";
      case 'Draft List':
        return "bg-slate-50 text-slate-500 border-slate-200";
      case 'Inactive':
        return "bg-red-50 text-red-500 border-red-100";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  return (
    <tr 
      className={cn(
        "transition-all duration-200 group", 
        isSelected 
          ? "bg-[#f1f5f9]/60" 
          : index % 2 === 0 
            ? "bg-white" 
            : "bg-[#f0fdf4]/40", 
        "hover:bg-[#e8f5e9]/50 cursor-pointer"
      )}
    >
      {/* Checkbox */}
      <td className="px-6 py-4">
        <div 
          className={cn(
            "w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-all", 
            isSelected 
              ? "bg-[#16a34a] border-[#16a34a]" 
              : "border-gray-200 bg-white group-hover:border-[#16a34a]"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(product.id);
          }}
        >
          {isSelected && <Check className="h-3 w-3 text-white" />}
        </div>
      </td>

      {/* Product Info */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg border border-gray-100 flex items-center justify-center bg-gray-50 text-xl">
            {product.image}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-[13px]">{product.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{product.sku}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-4">
        <span className="text-[13px] text-gray-600 font-semibold px-2 py-0.5 bg-gray-50 rounded border border-gray-100 italic">
          {product.category}
        </span>
      </td>

      {/* Stock - Upgraded to Professional Badge */}
      <td className="px-4 py-4">
        {getStockBadge(product.stock)}
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-right">
        <span className="text-[14px] font-black text-gray-900 tabular-nums">
          ${product.price.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span 
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black border uppercase tracking-wider",
            getStatusStyles(product.status)
          )}
        >
          {product.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
