import React from 'react';
import { ProductTableHeader } from './ProductTableHeader';
import { ProductTableRow } from './ProductTableRow';

/**
 * ProductsTable Component
 * Main table component that combines header and rows
 */
export function ProductsTable({ 
  products, 
  selectedProducts, 
  onToggleSelectAll, 
  onToggleSelect 
}) {
  return (
    <div className="flex-1 overflow-auto no-scrollbar">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <ProductTableHeader
          selectedCount={selectedProducts.length}
          totalCount={products.length}
          onToggleSelectAll={onToggleSelectAll}
        />
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
