import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {children}
      <ChatBot />
    </>
  );
};

export default Layout;
