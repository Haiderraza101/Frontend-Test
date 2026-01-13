import React from 'react';
import { Users } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Suppliers() {
  return (
    <ComingSoon 
      title="Suppliers" 
      description="Manage your vendor relationships and sourcing." 
      icon={Users}
    />
  );
}
