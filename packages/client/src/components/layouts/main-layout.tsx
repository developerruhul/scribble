import React from 'react';
import Navbar from '../navbar';
import { type ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

interface layoutProps {
  children: React.ReactNode;
  className: ClassValue;
}

const MainLayout = ({ children, className }: layoutProps) => {
  return (
    <>
      <Navbar />
      <main className={cn('pt-14', className)}>{children}</main>
    </>
  );
};

export default MainLayout;
