import React, { useEffect } from 'react';
import Head from 'next/head';
import LoginForm from '../components/auth/LoginForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  
  useEffect(() => {
    // 이미 로그인되어 있으면 메인 페이지로 리다이렉트
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>로그인 - AI헬퍼</title>
      </Head>
      
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link href="/">
              <div className="inline-flex items-center cursor-pointer">
                <div className="bg-primary text-white rounded-md p-2 mr-2">
                  <span className="font-bold">AI</span>
                </div>
                <span className="font-bold text-xl">AI헬퍼</span>
              </div>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">업무 효율을 높이는<br />스마트한 비즈니스 어시스턴트</h1>
            <p className="text-gray-600">AI의 힘을 활용하여 업무 생산성을 높이세요.</p>
            <p className="text-gray-600">AI헬퍼가 있다면 어려운 업무도 쉽고 빠르게 처리할 수 있습니다.</p>
            <p className="text-gray-600">최고의 AI 기술이 당신의 업무를 지원합니다.</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </>
  );
}