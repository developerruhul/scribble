import React from 'react';
import Navbar from '../navbar';

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="mt-14">{children}</main>
    </>
  );
};

export default MainLayout;
