import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BarChart3, 
  ShoppingBag, 
  Package, 
  Grid3x3, 
  Users, 
  Tag,
  UserCircle, 
  PieChart,
  Settings,
  Store,
  Calendar,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const SidebarContent = () => {
  const location = useLocation();
  const [isTabletExpanded, setIsTabletExpanded] = useState(false);
  
  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-full relative isolate group/sidebar">
      {/* 1. Icon Sidebar - Always visible, static width */}
      <div className="flex w-[60px] shrink-0 flex-col items-center border-r border-gray-200 bg-[#fafafa] py-4 z-40 relative bg-[#fafafa]">
        <div className="mb-4 flex h-8 w-8 items-center justify-center font-bold text-lg tracking-tighter text-black">
          SLAP
        </div>

        {/* App Icons */}
        <div className="flex flex-col gap-3 w-full px-2">
          <button className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-all">
            AP
          </button>
          
          <button className="flex aspect-square w-full items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-gray-300 transition-all shadow-sm">
            <Store className="h-4 w-4" />
          </button>
          <button className="flex aspect-square w-full items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-black transition-all">
            <Calendar className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-3 mb-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-black transition-all">
             <Settings className="h-5 w-5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-medium text-xs">
            H
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Sidebar */}
      <div className={cn(
        "flex flex-col h-full bg-[#fafafa] shrink-0 z-30 group/nav transition-[width] duration-300 ease-in-out relative overflow-visible",
        // Mobile: 250px fixed width
        "w-[250px]",
        // Tablet (md): 60px default, 200px expanded
        "md:w-[60px]",
        isTabletExpanded ? "md:w-[200px] tablet-expanded" : "",
        // Desktop (lg): Always 200px
        "lg:w-[200px]"
      )}>
         {/* Tablet Toggle Button - Positioned in front of SLAP */}
         <button 
            onClick={() => setIsTabletExpanded(!isTabletExpanded)}
            className={cn(
              "hidden md:flex lg:hidden mt-5 ml-3 mb-2 aspect-square w-10 items-center justify-center rounded-xl transition-all shadow-sm",
              isTabletExpanded 
                ? "bg-[#f0fdf4] text-[#16a34a]" 
                : "bg-white border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50"
            )}
         >
            {isTabletExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
         </button>

         {/* Organization Header */}
         <div className="px-5 mb-2 mt-4 transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100">
            <h2 className="text-sm font-bold text-gray-900 whitespace-nowrap overflow-hidden">Organization</h2>
         </div>

         {/* Scrollable Menu Area */}
         <div className={cn(
           "flex-1 overflow-y-auto px-1.5 lg:px-3 pt-2 no-scrollbar md:px-1.5",
           isTabletExpanded ? "md:px-3" : ""
         )}>
            
            {/* Organization Group */}
            <div className="space-y-0.5">
              <NavItem 
                active={isActive('/home')} 
                to="/home"
                icon={Home}
                label="Home"
              />
              <NavItem 
                active={isActive('/analytics')} 
                to="/analytics"
                icon={BarChart3}
                label="Analytics"
              />
              <NavItem 
                active={isActive('/sales')} 
                to="/sales"
                icon={ShoppingBag}
                label="Sales"
              />
            </div>

            {/* Catalog Group */}
            <div className="space-y-0.5">
              <div className="px-2 pb-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100 whitespace-nowrap overflow-hidden mt-4">Catalog</div>
              <NavItem 
                active={isActive('/products')} 
                to="/products"
                icon={Package}
                label="Products"
              />
              <NavItem 
                active={isActive('/categories')} 
                to="/categories"
                icon={Grid3x3}
                label="Categories"
              />
              <NavItem 
                active={isActive('/suppliers')} 
                to="/suppliers"
                icon={Users}
                label="Suppliers"
              />
            </div>

            {/* Marketing Group */}
            <div className="space-y-0.5">
              <div className="px-2 pb-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100 whitespace-nowrap overflow-hidden mt-4">Marketing</div>
              <NavItem 
                active={isActive('/promotions')} 
                to="/promotions"
                icon={Tag}
                label="Promotions"
              />
            </div>

             {/* People Group */}
             <div className="space-y-0.5">
              <div className="px-2 pb-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100 whitespace-nowrap overflow-hidden mt-4">People</div>
              <NavItem 
                active={isActive('/customers')} 
                to="/customers"
                icon={Users}
                label="Customers"
              />
              <NavItem 
                active={isActive('/prescribers')} 
                to="/prescribers"
                icon={UserCircle}
                label="Prescribers"
              />
            </div>

            {/* Insights Group */}
            <div className="space-y-0.5">
              <div className="px-2 pb-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100 whitespace-nowrap overflow-hidden mt-4">Insights</div>
              <NavItem 
                active={isActive('/reports')} 
                to="/reports"
                icon={PieChart}
                label="Reports"
              />
            </div>

         </div>
      </div>
    </div>
  );
};

export function DashboardLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#f3f4f6]">
      {/* Desktop Sidebar - Hidden on mobile, flex on md and up */}
      <div className="hidden md:flex h-full shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar Container */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 flex h-full bg-[#fafafa] shadow-xl md:hidden"
            >
              <SidebarContent />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-[-40px] p-2 bg-white rounded-r-lg shadow-md text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-[#fafafa] pt-2 pr-2 pb-2">
         {/* The White Card Container with Rounded Top-Left */}
         <div className="h-full w-full overflow-hidden rounded-tl-3xl bg-white shadow-sm border border-gray-100/50 flex flex-col relative">
            
            {/* Minimal Header inside the content area */}
             <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-100 px-6">
                 <div className="flex items-center gap-3">
                   {/* Hamburger Button for Mobile */}
                   <button 
                     onClick={() => setIsMobileMenuOpen(true)}
                     className="md:hidden p-1 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
                   >
                     <Menu className="h-5 w-5" />
                   </button>

                   <div className="font-semibold text-sm text-gray-900">
                      {location.pathname === '/' || location.pathname === '/home' ? 'Home' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2)}
                   </div>
                 </div>
                 
                 {/* Right side header text similar to the image */}
                 <div className="text-sm font-medium text-gray-500">
                     {/* Placeholder for breadcrumbs or date */}
                 </div>
             </div>

            {/* Content Area - No scroll or padding here, children handle it */}
            <main className="flex-1 overflow-hidden">
              <Outlet />
            </main>
         </div>
      </div>
    </div>
  );
}

function NavItem({ active, to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-500 overflow-hidden whitespace-nowrap",
        active
          ? "bg-[#e8f5e9] text-[#16a34a]"
          : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
      )}
    >
      <Icon 
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active ? "text-[#16a34a]" : "text-gray-400 group-hover:text-gray-500"
        )} 
      />
      <span className="transition-opacity duration-300 opacity-100 md:opacity-0 group-[.tablet-expanded]/nav:md:opacity-100 lg:opacity-100">
        {label}
      </span>
    </Link>
  );
}
