import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Collections from '@/pages/CollectionsPage';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/CartPage';
import Error404 from '@/pages/Error404';
import { Navigate } from 'react-router-dom';

const routes = {
  path: '/',
  element: <Layout />, // Common Layout with header and footer
  children: [
    { path: '', element: <Home /> },
    { path: 'collections', element: <Navigate to="/collection/all" replace /> }, // 👈 redirect
    { path: 'collections/:handle', element: <Collections /> },
    { path: 'product/:handle', element: <ProductPage /> },
    { path: 'cart', element: <Cart /> },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
};

export default routes;
