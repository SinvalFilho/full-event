// components/PublicRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  element: React.ReactElement;
  restricted?: boolean;
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted = false, redirectPath = '/' }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && restricted) {
    return <Navigate to={redirectPath} />;
  }

  return element;
};

export default PublicRoute;
