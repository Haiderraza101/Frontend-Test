import React from 'react';
import { Tag } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Promotions() {
  return (
    <ComingSoon 
      title="Promotions" 
      description="Create and manage discounts and marketing campaigns." 
      icon={Tag}
    />
  );
}
