import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Sales() {
  return (
    <ComingSoon 
      title="Sales" 
      description="Monitor your orders and revenue stream." 
      icon={ShoppingBag}
    />
  );
}
