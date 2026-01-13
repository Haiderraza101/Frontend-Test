import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';

export function AppRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
