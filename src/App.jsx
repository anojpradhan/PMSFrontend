import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Sales from "./pages/Sales";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestLayout>
            <Login />
          </GuestLayout>
        }
      />
      <Route
        path="/register"
        element={
          <GuestLayout>
            <Register />
          </GuestLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <GuestLayout>
            <Home />
          </GuestLayout>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
