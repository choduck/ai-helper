import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login' || router.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;