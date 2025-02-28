// src/components/AdminProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminProtectedRoute: React.FC = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If no user or the role is not "Admin", redirect to showcase
  if (!user || role !== 'Admin') {
    return <Navigate to="/showcase" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
