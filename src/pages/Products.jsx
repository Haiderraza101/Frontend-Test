import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { ProductsHeader } from '../components/products/ProductsHeader';
import { ProductsFilterBar } from '../components/products/ProductsFilterBar';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductsPagination } from '../components/products/ProductsPagination';
import { CreateProductModal } from '../components/products/CreateProductModal';

// Hooks
import { useProductFilters } from '../hooks/useProductFilters';
import { usePagination } from '../hooks/usePagination';
import { useProductSelection } from '../hooks/useProductSelection';

// Constants & Schemas
import { MOCK_PRODUCTS } from '../constants/products';
import { productSchema } from '../schemas/productSchema';

/**
 * Products Page Component
 * Main page for managing products with filtering, pagination, and CRUD operations
 * 
 * Architecture:
 * - Highly modular with separated concerns
 * - Custom hooks for business logic
 * - Presentational components for UI
 * - Clear data flow and state management
 */
export function Products() {
  // State Management
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // UI State for dropdowns
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  // Custom Hooks
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

  // Form Management
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(productSchema),
  });

  // Event Handlers
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

  const handleToggleSelectAll = () => {
    toggleSelectAll(paginatedItems);
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa] overflow-hidden">
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
      />

      {/* Table Container */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
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
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        register={register}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
