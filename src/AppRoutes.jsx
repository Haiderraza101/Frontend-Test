import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Analytics } from './pages/Analytics';
import { Sales } from './pages/Sales';
import { Categories } from './pages/Categories';
import { Suppliers } from './pages/Suppliers';
import { Promotions } from './pages/Promotions';
import { Customers } from './pages/Customers';
import { Prescribers } from './pages/Prescribers';
import { Reports } from './pages/Reports';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/prescribers" element={<Prescribers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}
