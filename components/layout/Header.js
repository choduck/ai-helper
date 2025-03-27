import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();
  
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
              </div>
            </div>
            <div className="flex items-center ml-4">
              <button className="flex items-center text-sm font-medium text-gray-700 focus:outline-none">
                <span>테스크 모드</span>
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 