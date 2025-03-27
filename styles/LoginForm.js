import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 실제 구현에서는 API 호출로 대체
    console.log('로그인 시도:', { email, password });
    
    // 임시로 로그인 성공 처리
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">시작하기</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center font-medium ${isEmailLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setIsEmailLogin(true)}
          >
            아이디로 로그인
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${!isEmailLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setIsEmailLogin(false)}
          >
            간편 로그인
          </button>
        </div>
        
        {isEmailLogin ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                아이디 또는 이메일
              </label>
              <input
                id="email"
                type="text"
                className="ai-input mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소 입력"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="ai-input mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                required
              />
            </div>
            
            <div>
              <button type="submit" className="w-full ai-button">
                로그인
              </button>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                  로그인 상태 유지
                </label>
              </div>
              <div className="text-gray-600">
                <Link href="/forgot-password">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <button className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center">
              <img src="/images/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              <span>Google로 계속하기</span>
            </button>
            <button className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center">
              <img src="/images/kakao.svg" alt="Kakao" className="w-5 h-5 mr-2" />
              <span>카카오로 계속하기</span>
            </button>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link href="/register">
              <span className="text-primary font-medium cursor-pointer">
                회원가입
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;