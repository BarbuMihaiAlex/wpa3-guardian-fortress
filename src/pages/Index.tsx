
import React from 'react';
import { RouterProvider } from '@/context/RouterContext';
import LoginPortal from '@/components/LoginPortal';
import RouterInterface from '@/components/RouterInterface';
import { useRouter } from '@/context/RouterContext';

const RouterApp: React.FC = () => {
  const { isLoggedIn } = useRouter();
  
  return isLoggedIn ? <RouterInterface /> : <LoginPortal />;
};

const Index: React.FC = () => {
  return (
    <RouterProvider>
      <RouterApp />
    </RouterProvider>
  );
};

export default Index;
