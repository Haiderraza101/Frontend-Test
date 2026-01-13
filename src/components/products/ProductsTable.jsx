import React from 'react';
import { Pencil, Trash2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { ProductTableHeader } from './ProductTableHeader';
import { ProductTableRow } from './ProductTableRow';
import { cn } from '../../lib/utils';

export function ProductsTable({ 
  products, 
  selectedProducts, 
  onToggleSelectAll, 
  onToggleSelect,
  onEditProduct,
  onDeleteProduct
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
    <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
      
      {/* Desktop/Tablet Table View */}
      <table className="hidden md:table w-full text-left border-collapse min-w-[900px]">
        <ProductTableHeader
          selectedCount={selectedProducts.length}
          totalCount={products.length}
          onToggleSelectAll={onToggleSelectAll}
        />
        <tbody className="divide-y divide-gray-100">
          {products.map((product, index) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={onToggleSelect}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
              index={index}
            />
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col space-y-3 p-4">
        {products.map((product, index) => {
          const isSelected = selectedProducts.includes(product.id);
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={product.id} 
              className={cn(
                "p-4 rounded-xl border shadow-sm transition-all relative",
                isEven ? "bg-white border-gray-100" : "bg-[#f0fdf4]/50 border-[#16a34a]/10",
                isSelected && "ring-2 ring-[#16a34a] bg-[#f0fdf4] border-[#16a34a]"
              )}
            >
              {/* Header: Name, Status */}
              <div className="flex items-start justify-between gap-3 mb-2">
                 <div className="flex items-start gap-3">
                   {/* Selection for Mobile */}
                   <div 
                      className={cn(
                        "w-5 h-5 mt-0.5 shrink-0 rounded border cursor-pointer flex items-center justify-center transition-all", 
                        isSelected 
                          ? "bg-[#16a34a] border-[#16a34a]" 
                          : "border-gray-200 bg-white"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(product.id);
                      }}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h3>
                      <p className="text-[12px] text-gray-400 font-medium mt-1">{product.sku}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Category: {product.category}</p>
                    </div>
                 </div>

                 <span 
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black border uppercase tracking-wider shrink-0",
                      getStatusStyles(product.status)
                    )}
                  >
                    {product.status}
                  </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-t border-gray-200/50 border-b border-gray-200/50">
                 <div className="text-center border-r border-gray-200/50 last:border-0">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Price</p>
                    <p className="font-bold text-gray-900 mt-0.5 text-sm">${product.price.toFixed(2)}</p>
                 </div>
                 <div className="text-center border-r border-gray-200/50 last:border-0">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Stock</p>
                    <div className="flex justify-center mt-1">
                      {getStockBadge(product.stock)}
                    </div>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Sales</p>
                    <p className="font-bold text-[#16a34a] mt-0.5 text-sm">${(product.price * 1.2).toFixed(2)}</p> 
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between mt-3 pl-1">
                 <div className="text-[11px] text-gray-400 font-medium italic">
                    Added: {new Date().toLocaleDateString()}
                 </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onEditProduct(product)}
                      className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200/50 cursor-pointer"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDeleteProduct(product)}
                      className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200/50 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
