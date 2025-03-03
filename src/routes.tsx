import Layout from "./components/Layout";
import Home from "./routes/Home";
import Products from "./routes/ProductPage";
import ProductDetails from "./routes/Products";
import Cart from "./routes/Cart";

const routes = {
  path: "/",
  element: <Layout />, // Common Layout with header and footer
  children: [
    { path: "", element: <Home /> },
    { path: "products", element: <Products /> },
    { path: "product/:id", element: <ProductDetails /> },
    { path: "cart", element: <Cart /> },
  ],
};

export default routes;
