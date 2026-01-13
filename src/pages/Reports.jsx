import React from 'react';
import { PieChart } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Reports() {
  return (
    <ComingSoon 
      title="Reports" 
      description="Generate and export detailed business reports." 
      icon={PieChart}
    />
  );
}
