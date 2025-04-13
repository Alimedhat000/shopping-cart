import Layout from './components/Layout';
import Home from './routes/Home';
import Collections from './routes/Collections';
import ProductPage from './routes/Product';
import Cart from './routes/Cart';
import Error404 from './routes/Error404';
import { Navigate } from 'react-router-dom';

const routes = {
  path: '/',
  element: <Layout />, // Common Layout with header and footer
  children: [
    { path: '', element: <Home /> },
    { path: 'collections', element: <Navigate to="/collection/all" replace /> }, // 👈 redirect
    { path: 'collections/:category', element: <Collections /> },
    { path: 'product/:id', element: <ProductPage /> },
    { path: 'cart', element: <Cart /> },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
};

export default routes;
