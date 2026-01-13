import React from 'react';
import { Users } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Customers() {
  return (
    <ComingSoon 
      title="Customers" 
      description="View and manage your customer base and their activity." 
      icon={Users}
    />
  );
}
