import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')

  if (!token) {
    
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
