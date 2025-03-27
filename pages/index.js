import React, { useEffect } from 'react';
import Head from 'next/head';
import ChatInterface from '../components/chat/ChatInterface';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>AI헬퍼 - 일 잘하는 AI 어시스턴트</title>
      </Head>
      
      <div className="container mx-auto max-w-5xl px-4 py-6 h-[calc(100vh-4rem)]">
        <div className="flex flex-col h-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">일 잘하는 AI 어시스턴트</h1>
            <p className="text-gray-600">업무 자동화, 문서 처리, 이미지 생성까지</p>
          </div>
          
          <div className="flex-grow bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </>
  );
}