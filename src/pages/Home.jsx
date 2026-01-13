import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Users, Package, BarChart3 } from 'lucide-react';

export function Home() {
  const stats = [
    { label: 'Total Sales', value: '$24,560', change: '+12.5%', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Customers', value: '1,240', change: '+8.2%', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Products', value: '456', change: '+4.1%', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue', value: '$12,240', change: '+15.3%', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-500 text-sm font-medium">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">JD</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe purchased a Wireless Headphone</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div className="text-sm font-bold text-gray-900">$299.00</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-4">
            {['Electronics', 'Furniture', 'Clothing'].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{cat}</span>
                  <span className="text-gray-500">65%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${85 - (i * 15)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
