import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      // localStorage 접근
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const isAuthPage = router.pathname === '/login' || router.pathname === '/register';
      
      if (!isLoggedIn && !isAuthPage) {
        router.push('/login');
      }
      
      setIsLoading(false);
    }
  }, [router.pathname]);

  // 로딩 상태일 때는 빈 화면 표시
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;