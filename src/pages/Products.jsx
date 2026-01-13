import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProductsHeader } from '../components/products/ProductsHeader';
import { ProductsFilterBar } from '../components/products/ProductsFilterBar';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductsPagination } from '../components/products/ProductsPagination';
import { ProductModal } from '../components/products/ProductModal';


import { useProductFilters } from '../hooks/useProductFilters';
import { usePagination } from '../hooks/usePagination';
import { useProductSelection } from '../hooks/useProductSelection';

import { MOCK_PRODUCTS } from '../constants/products';
import { productSchema } from '../schemas/productSchema';

export function Products() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredProducts
  } = useProductFilters(products);

  const {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange
  } = usePagination(filteredProducts, 7);

  const {
    selectedProducts,
    toggleSelectAll,
    toggleSelect,
    clearSelection
  } = useProductSelection();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleCreateProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleSubmitProduct = (data) => {
    const newProduct = {
      id: Date.now(),
      name: data.name,
      price: parseFloat(data.price || '0'),
      category: data.collection || 'General',
      stock: 0,
      sku: data.sku || 'SKU-000',
      status: 'Published',
      stockStatus: 'Normal',
      image: '📦'
    };
    
    setProducts([newProduct, ...products]);
    handleCloseModal();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSelectedDate(new Date());
  };

  const handleToggleSelectAll = () => {
    toggleSelectAll(paginatedItems);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Page Header */}
      <ProductsHeader onCreateProduct={handleCreateProduct} />

      {/* Filter Bar */}
      <ProductsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        isStatusOpen={isStatusOpen}
        setIsStatusOpen={setIsStatusOpen}
        onReset={handleResetFilters}
        selectedCount={selectedProducts.length}
      />

      {/* Table Container - Modified to allow scrolling */}
      <div className="p-4 sm:p-6">
        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm">
          {/* Table */}
          <ProductsTable
            products={paginatedItems}
            selectedProducts={selectedProducts}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelect={toggleSelect}
          />

          {/* Pagination */}
          <ProductsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            isItemsPerPageOpen={isItemsPerPageOpen}
            setIsItemsPerPageOpen={setIsItemsPerPageOpen}
          />
        </div>
      </div>

      {/* Create Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        register={register}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
