import React from 'react';
import { ProductTableHeader } from './ProductTableHeader';
import { ProductTableRow } from './ProductTableRow';

export function ProductsTable({ 
  products, 
  selectedProducts, 
  onToggleSelectAll, 
  onToggleSelect 
}) {
  return (
    <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
      <table className="w-full text-left border-collapse min-w-[900px]">
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
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
