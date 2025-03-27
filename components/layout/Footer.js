import React from 'react';
import { FiHome, FiSearch, FiFolder, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t z-10 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link href="/">
          <span className="flex flex-col items-center text-xs text-gray-500 hover:text-primary cursor-pointer">
            <FiHome className="h-6 w-6 mb-1" />
            <span>홈</span>
          </span>
        </Link>
        <Link href="/search">
          <span className="flex flex-col items-center text-xs text-gray-500 hover:text-primary cursor-pointer">
            <FiSearch className="h-6 w-6 mb-1" />
            <span>검색</span>
          </span>
        </Link>
        <Link href="/dashboard">
          <span className="flex flex-col items-center text-xs text-gray-500 hover:text-primary cursor-pointer">
            <FiFolder className="h-6 w-6 mb-1" />
            <span>내 작업</span>
          </span>
        </Link>
        <Link href="/profile">
          <span className="flex flex-col items-center text-xs text-gray-500 hover:text-primary cursor-pointer">
            <FiUser className="h-6 w-6 mb-1" />
            <span>프로필</span>
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;