import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, fallbackPath = '/menu', redirectAfterLogin }) => {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={redirectAfterLogin || fallbackPath} />
  );
};

export default ProtectedRoute;
