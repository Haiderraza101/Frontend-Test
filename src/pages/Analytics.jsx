import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Analytics() {
  return (
    <ComingSoon 
      title="Analytics" 
      description="Track your store's performance and growth." 
      icon={BarChart3}
    />
  );
}
