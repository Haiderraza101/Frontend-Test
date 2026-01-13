import { useState } from 'react';

/**
 * useProductSelection Hook
 * Manages product selection state for checkboxes
 */
export function useProductSelection() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleSelectAll = (products) => {
    if (selectedProducts.length === products.length && products.length > 0) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelect = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  return {
    selectedProducts,
    toggleSelectAll,
    toggleSelect,
    clearSelection
  };
}
