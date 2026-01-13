import { useState, useMemo } from 'react';

/**
 * useProductFilters Hook
 * Manages all filtering logic for products
 */
export function useProductFilters(products) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, searchQuery, statusFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredProducts
  };
}
