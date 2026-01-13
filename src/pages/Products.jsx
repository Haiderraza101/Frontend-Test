import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../components/ui/dialog';
import { cn } from '../lib/utils';

// Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, category: 'Electronics', stock: 45, status: 'Active' },
  { id: 2, name: 'Ergonomic Office Chair', price: 159.50, category: 'Furniture', stock: 12, status: 'Active' },
  { id: 3, name: 'Mechanical Keyboard', price: 129.00, category: 'Electronics', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Smart Fitness Watch', price: 199.95, category: 'Wearables', stock: 28, status: 'Active' },
  { id: 5, name: 'Minimalist Desk Lamp', price: 45.00, category: 'Lighting', stock: 150, status: 'Active' },
];

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Price must be a positive number'),
  category: z.string().min(2, 'Category is required'),
  stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, 'Stock must be a non-negative number'),
});

export function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema)
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSubmit = (data) => {
    const newProduct = {
      id: products.length + 1,
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      stock: parseInt(data.stock),
      status: 'Active'
    };
    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 bg-white border-gray-200 focus-visible:ring-green-500"
            />
          </div>
          <Button variant="outline" className="h-10 px-3 bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white shadow-sm font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">Stock</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                        product.status === 'Active' 
                          ? "bg-green-50 text-green-700 ring-green-600/20" 
                          : "bg-red-50 text-red-700 ring-red-600/20"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums text-gray-600">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right tabular-nums text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Modal/Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          isMobile ? (
            // Mobile Drawer using Framer Motion
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] p-6 shadow-2xl safe-bottom"
                style={{ maxHeight: '85vh', overflowY: 'auto' }}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                <ProductForm 
                  register={register} 
                  errors={errors} 
                  onSubmit={handleSubmit(onSubmit)} 
                  onCancel={() => setIsModalOpen(false)}
                />
              </motion.div>
            </>
          ) : (
            // Desktop Dialog
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-50"
              >
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                <ProductForm 
                  register={register} 
                  errors={errors} 
                  onSubmit={handleSubmit(onSubmit)} 
                  onCancel={() => setIsModalOpen(false)}
                />
              </motion.div>
            </div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductForm({ register, errors, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...register('name')} placeholder="e.g. Wireless Mouse" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" {...register('price')} placeholder="0.00" />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" {...register('stock')} placeholder="0" />
          {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" {...register('category')} placeholder="e.g. Electronics" />
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-[#16a34a] hover:bg-[#15803d]">
          Create Product
        </Button>
      </div>
    </form>
  );
}
