import React from 'react';
import { Home as HomeIcon } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Home() {
  return (
    <ComingSoon 
      title="Home" 
      description="Welcome to your dashboard overview." 
      icon={HomeIcon}
    />
  );
}
