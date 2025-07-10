import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { CartProvider } from '@/features/cart/context/CartProvider';
import ScrollToTop from '@/util/ScrollToTop';

const Layout: React.FC = () => {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="bg-main-bg">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;
