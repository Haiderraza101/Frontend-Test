import { useState, useMemo } from 'react';

/**
 * usePagination Hook
 * Manages pagination state and logic
 */
export function usePagination(items, initialItemsPerPage = 7) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange
  };
}
