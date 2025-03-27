import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1단계: 하드코딩된 user/user 계정으로만 로그인 가능
    if (email === 'user' && password === 'user') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      router.push('/');  // 로그인 성공 시 메인 채팅 페이지로 이동
    } else {
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다. (힌트: user/user)');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">AI헬퍼 로그인</h2>
      
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 text-center ${isEmailLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setIsEmailLogin(true)}
        >
          이메일 로그인
        </button>
        <button
          className={`flex-1 py-2 text-center ${!isEmailLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setIsEmailLogin(false)}
          disabled
        >
          소셜 로그인 (준비중)
        </button>
      </div>
      
      {isEmailLogin ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              아이디
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="user"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="user"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                로그인 상태 유지
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              로그인
            </button>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            * 1단계 개발 중: 아이디/비밀번호는 user/user를 사용하세요
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center py-4 text-gray-500">소셜 로그인 기능은 2단계에서 개발 예정입니다.</div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link href="/register">
            <span className="text-primary hover:text-primary-dark cursor-pointer">
              회원가입
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;