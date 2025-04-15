import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { CartProvider } from '@util/CartProvider';

const Layout: React.FC = () => {
  return (
    <CartProvider>
      <div className="bg-main-bg">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;
