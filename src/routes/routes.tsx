import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/layout/Login";
import CheckProtected from "../components/CheckProtected";
import ProtectedRoute from "../components/layout/ProtectedRoute";

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
    path: "/protected",
    element: (
      <ProtectedRoute>
        <CheckProtected />
      </ProtectedRoute>
    ),
  },
]);

export default router;
