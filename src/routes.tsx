import Layout from './components/Layout';
import Home from './routes/Home';
import Collections from './routes/Collections';
import Product from './routes/Product';
import Cart from './routes/Cart';
import Error404 from './routes/Error404';

const routes = {
  path: '/',
  element: <Layout />, // Common Layout with header and footer
  children: [
    { path: '', element: <Home /> },
    { path: 'collections', element: <Collections /> },
    { path: 'product/:id', element: <Product /> },
    { path: 'cart', element: <Cart /> },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
};

export default routes;
