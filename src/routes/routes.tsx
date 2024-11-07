import { getAuthToken } from '../utils/getAuthToken';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//로그인 안했을 경우
const PublicRoutes: React.FC = () => {
  const isLogin = getAuthToken();

  return isLogin ? <Navigate to="/todo" /> : <Outlet />;
};

//로그인 했을 경우
const PrivateRoutes: React.FC = () => {
  const isLogin = getAuthToken();

  return isLogin ? <Outlet /> : <Navigate to="/auth" />;
};

export { PublicRoutes, PrivateRoutes };
