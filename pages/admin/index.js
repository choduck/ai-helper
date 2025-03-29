import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FiUsers, FiMessageSquare, FiSettings, FiDatabase, FiBarChart2, FiList } from 'react-icons/fi';

// 사용자 목록 더미 데이터
const DUMMY_USERS = [
  { id: 1, username: 'user1', email: 'user1@example.com', role: '일반 사용자', lastLogin: '2023-03-25 14:30' },
  { id: 2, username: 'admin', email: 'admin@example.com', role: '관리자', lastLogin: '2023-03-26 09:45' },
  { id: 3, username: 'tester', email: 'test@example.com', role: '테스터', lastLogin: '2023-03-24 16:20' },
  { id: 4, username: 'user2', email: 'user2@example.com', role: '일반 사용자', lastLogin: '2023-03-22 11:15' },
  { id: 5, username: 'developer', email: 'dev@example.com', role: '개발자', lastLogin: '2023-03-26 08:30' },
];

const AdminPage = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('users');
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 실제 구현에서는 여기서 인증 체크 필요
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.push('/login');
      }
      // 추가로 관리자 권한 체크 필요
    }
  }, [router]);
  
  // 검색 기능
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Head>
        <title>관리자 모드 - AI헬퍼</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        {/* 상단 가로 메뉴바 */}
        <div className="bg-white shadow-md w-full">
          <div className="max-w-7xl mx-auto">
            <div className="p-4 bg-blue-600">
              <h2 className="text-xl font-bold text-white">관리자 모드</h2>
            </div>
            <nav className="flex overflow-x-auto">
              <div 
                className={`p-4 flex items-center cursor-pointer whitespace-nowrap ${activeMenu === 'users' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveMenu('users')}
              >
                <FiUsers className="mr-2" />
                <span>사용자 관리</span>
              </div>
              <div 
                className={`p-4 flex items-center cursor-pointer whitespace-nowrap ${activeMenu === 'chats' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveMenu('chats')}
              >
                <FiMessageSquare className="mr-2" />
                <span>채팅 관리</span>
              </div>
              <div 
                className={`p-4 flex items-center cursor-pointer whitespace-nowrap ${activeMenu === 'logs' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveMenu('logs')}
              >
                <FiList className="mr-2" />
                <span>로그 관리</span>
              </div>
              <div 
                className={`p-4 flex items-center cursor-pointer whitespace-nowrap ${activeMenu === 'stats' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveMenu('stats')}
              >
                <FiBarChart2 className="mr-2" />
                <span>통계</span>
              </div>
              <div 
                className={`p-4 flex items-center cursor-pointer whitespace-nowrap ${activeMenu === 'settings' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveMenu('settings')}
              >
                <FiSettings className="mr-2" />
                <span>설정</span>
              </div>
              <div className="ml-auto p-4">
                <Link href="/">
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer whitespace-nowrap">
                    ← 메인으로 돌아가기
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
        
        {/* 메인 컨텐츠 영역 */}
        <div className="p-8 max-w-7xl mx-auto">
          {activeMenu === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">사용자 관리</h1>
                <div className="flex">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-64 px-4 py-2 pr-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="이름, 이메일, 역할로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                      🔍
                    </span>
                  </div>
                  <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    새 사용자 추가
                  </button>
                </div>
              </div>
              
              {/* 사용자 목록 테이블 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        사용자명
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이메일
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        역할
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        마지막 로그인
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">{user.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === '관리자' ? 'bg-red-100 text-red-800' : 
                            user.role === '개발자' ? 'bg-purple-100 text-purple-800' : 
                            user.role === '테스터' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            편집
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 페이지네이션 */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  총 {filteredUsers.length}명의 사용자
                </div>
                <div className="flex">
                  <button className="px-3 py-1 border rounded-l-md bg-white text-gray-700 hover:bg-gray-50">
                    이전
                  </button>
                  <button className="px-3 py-1 border-t border-b bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border-t border-b bg-white text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border-t border-b bg-white text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border rounded-r-md bg-white text-gray-700 hover:bg-gray-50">
                    다음
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeMenu !== 'users' && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-xl text-gray-500">
                  {activeMenu === 'chats' && '채팅 관리'}
                  {activeMenu === 'logs' && '로그 관리'}
                  {activeMenu === 'stats' && '통계'}
                  {activeMenu === 'settings' && '설정'}
                </h2>
                <p className="mt-2 text-gray-400">해당 기능은 아직 개발 중입니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage; 