import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProductsHeader } from '../components/products/ProductsHeader';
import { ProductsFilterBar } from '../components/products/ProductsFilterBar';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductsPagination } from '../components/products/ProductsPagination';
import { ProductModal } from '../components/products/ProductModal';
import { DeleteConfirmationModal } from '../components/products/DeleteConfirmationModal';
import { useToast } from '../context/ToastContext';


import { useProductFilters } from '../hooks/useProductFilters';
import { usePagination } from '../hooks/usePagination';
import { useProductSelection } from '../hooks/useProductSelection';

import { MOCK_PRODUCTS } from '../constants/products';
import { productSchema } from '../schemas/productSchema';

export function Products() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
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

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const handleSubmitProduct = (data) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: data.name,
              price: parseFloat(data.price || '0'),
              category: data.category || p.category,
              sku: data.sku || p.sku,
              stock: parseInt(data.stock || '0'),
              status: data.status || p.status,
              description: data.description || '',
              imageUrl: data.imageUrl || p.imageUrl,
            }
          : p
      ));
      showToast(`${data.name} updated successfully!`, 'success');
    } else {
      // Create new product
      const newProduct = {
        id: Date.now(),
        name: data.name,
        price: parseFloat(data.price || '0'),
        category: data.category || 'General',
        stock: parseInt(data.stock || '0'),
        sku: data.sku || 'SKU-000',
        status: data.status || 'Published',
        stockStatus: 'Normal',
        image: '📦',
        description: data.description || '',
        imageUrl: data.imageUrl || null,
      };
      
      setProducts([newProduct, ...products]);
      showToast(`${data.name} created successfully!`, 'success');
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length > 0) {
      setDeletingProduct({ isMultiple: true, count: selectedProducts.length });
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (deletingProduct?.isMultiple) {
      // Delete multiple products
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      showToast(`${deletingProduct.count} products deleted successfully!`, 'success');
      clearSelection();
    } else if (deletingProduct) {
      // Delete single product
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      showToast(`${deletingProduct.name} deleted successfully!`, 'success');
    }
    setIsDeleteModalOpen(false);
    setDeletingProduct(null);
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
        onDeleteSelected={handleDeleteSelected}
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
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
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

      {/* Create/Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        register={register}
        handleSubmit={handleSubmit}
        editProduct={editingProduct}
        reset={reset}
        watch={watch}
        setValue={setValue}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={deletingProduct?.name}
        isMultiple={deletingProduct?.isMultiple}
        count={deletingProduct?.count}
      />
    </div>
  );
}
