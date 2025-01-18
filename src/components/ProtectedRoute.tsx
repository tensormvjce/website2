import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingAnimation from './LoadingAnimation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!currentUser) {
    // Redirect to home page if not logged in
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect to home page if not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
