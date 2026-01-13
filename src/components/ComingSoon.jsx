import React from 'react';

export function ComingSoon({ title, description, icon: IconComponent }) {
  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 font-medium">{description}</p>
      </div>
      
      <div className="rounded-2xl border border-gray-100 bg-white p-16 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="h-20 w-20 bg-[#f1f8f1] rounded-3xl flex items-center justify-center mb-6 transition-transform hover:scale-105 duration-300">
           {IconComponent && <IconComponent className="h-10 w-10 text-[#16a34a]" />}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title} Dashboard Coming Soon</h3>
        <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
           We're currently perfecting the {title ? title.toLowerCase() : 'this'} experience. Stay tuned for advanced tracking and real-time insights.
        </p>
      </div>
    </div>
  );
}
