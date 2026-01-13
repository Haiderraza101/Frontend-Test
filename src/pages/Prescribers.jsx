import React from 'react';
import { UserCircle } from 'lucide-react';
import { ComingSoon } from '../components/ComingSoon';

export function Prescribers() {
  return (
    <ComingSoon 
      title="Prescribers" 
      description="Manage healthcare professionals and their prescriptions." 
      icon={UserCircle}
    />
  );
}
