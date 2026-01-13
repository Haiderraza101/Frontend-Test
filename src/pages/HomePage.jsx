import React from 'react';

export function HomePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        <p className="text-gray-500 mt-1">Welcome to your dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <p className="text-gray-600">Dashboard content will appear here</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600">Activity feed coming soon</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-gray-600">Overview metrics here</p>
        </div>
      </div>
    </div>
  );
}
