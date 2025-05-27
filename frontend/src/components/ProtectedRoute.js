import React from 'react';
import { Navigate } from 'react-router-dom';

// Component to protect routes that require authentication
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
