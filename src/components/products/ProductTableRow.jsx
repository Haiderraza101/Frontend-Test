import React from 'react';
import { Check, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * ProductTableRow Component
 * Displays a single product row with all its information
 */
export function ProductTableRow({ 
  product, 
  isSelected, 
  onToggleSelect 
}) {
  const getStatusStyles = (status) => {
    return status === 'Published' 
      ? "bg-green-50 text-green-700 border-green-200" 
      : "bg-gray-50 text-gray-500 border-gray-200";
  };

  return (
    <tr 
      className={cn(
        "transition-colors", 
        isSelected 
          ? "bg-gray-50" 
          : "hover:bg-gray-50/50 cursor-pointer"
      )}
    >
      {/* Checkbox */}
      <td className="px-6 py-4">
        <div 
          className={cn(
            "w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-all", 
            isSelected 
              ? "bg-black border-black" 
              : "border-gray-200 bg-white hover:border-black"
          )}
          onClick={() => onToggleSelect(product.id)}
        >
          {isSelected && <Check className="h-3 w-3 text-white" />}
        </div>
      </td>

      {/* Product Info */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg border border-gray-100 flex items-center justify-center bg-gray-50 text-xl shadow-sm">
            {product.image}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">{product.sku}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-4 text-sm text-gray-600 font-medium">
        {product.category}
      </td>

      {/* Stock */}
      <td className="px-4 py-4 text-sm font-semibold">
        {product.stock}
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-right text-sm font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span 
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
            getStatusStyles(product.status)
          )}
        >
          {product.status.toUpperCase()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
