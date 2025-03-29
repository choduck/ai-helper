import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import axios from 'axios';

const Header = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }
    }
  }, []);
  
  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      await axios.post('/api/auth/logout');
      
      // 로컬 스토리지에서 인증 정보 제거
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      
      // 로그인 페이지로 리다이렉트
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 에러:', error);
      // 에러가 발생해도 로컬 스토리지는 비우고 로그인 페이지로 이동
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      router.push('/login');
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button className="inline-flex items-center lg:hidden">
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <Link href="/">
                <span className="flex items-center cursor-pointer">
                  <div className="bg-primary text-white rounded-md p-1 mr-2">
                    <span className="font-bold text-xs">AI</span>
                  </div>
                  <span className="font-bold text-lg">AI헬퍼</span>
                </span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link href="/dashboard">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                    대시보드
                  </span>
                </Link>
                <Link href="/profile">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                    프로필
                  </span>
                </Link>
                {userEmail && (
                  <div className="ml-3 text-sm font-medium text-gray-700">
                    <span>{userEmail}</span>
                  </div>
                )}
                <Link href="/admin">
                  <span className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none cursor-pointer" title="관리자 모드">
                    <FiSettings className="h-4 w-4 text-blue-600" />
                  </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  title="로그아웃"
                >
                  <FiLogOut className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <Link href="/admin" className="md:hidden">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none mr-4" title="관리자 모드">
                  <FiSettings className="h-4 w-4 text-blue-600" />
                </span>
              </Link>
              <button className="flex items-center text-sm font-medium text-gray-700 focus:outline-none">
                <span>테스크 모드</span>
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={handleLogout}
                className="md:hidden ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                title="로그아웃"
              >
                <FiLogOut className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 