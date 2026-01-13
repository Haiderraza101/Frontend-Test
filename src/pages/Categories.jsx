import React from 'react';
import { Grid3x3 } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Categories() {
  return (
    <ComingSoon 
      title="Categories" 
      description="Organize your products into collections." 
      icon={Grid3x3}
    />
  );
}
