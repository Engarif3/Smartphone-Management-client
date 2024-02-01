import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/layout/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Products from "../components/Products";
import SingleProduct from "../components/SingleProduct";
import AddProduct from "../components/AddProduct";
import UpdateAProduct from "../components/UpdateAProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <SingleProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-product",
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/updateProduct/:id",
    element: (
      <ProtectedRoute>
        <UpdateAProduct />
      </ProtectedRoute>
    ),
  },
]);

export default router;
