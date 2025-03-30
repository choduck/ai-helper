import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FiUsers, FiMessageSquare, FiSettings, FiDatabase, FiBarChart2, FiList, FiCreditCard } from 'react-icons/fi';
import UserForm from '../../components/admin/UserForm';
import TokenUsageManagement from '../../components/admin/TokenUsageManagement';

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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // 사용자 폼 상태
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
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
  
  // 사용자 목록 로딩
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      // API를 통해 사용자 목록 조회
      const response = await fetch(`/api/admin/users?page=${currentPage}&size=${pageSize}&search=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('사용자 목록을 불러오는데 실패했습니다.');
      }
      
      const data = await response.json();
      
      // fullname 필드를 name 필드로 매핑
      const mappedUsers = (data.users || []).map(user => ({
        ...user,
        name: user.fullname || user.name || '',
      }));
      
      setUsers(mappedUsers);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error('사용자 목록 조회 에러:', err);
      setError('사용자 목록을 불러오는데 실패했습니다. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // 사용자 목록 로딩
  useEffect(() => {
    if (activeMenu === 'users') {
      fetchUsers();
    }
  }, [activeMenu, currentPage, pageSize, searchTerm]);
  
  // 사용자 삭제 처리
  const handleDeleteUser = async (userId) => {
    if (!confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('사용자 삭제에 실패했습니다.');
      }
      
      // 성공 시 목록 새로고침
      setUsers(users.filter(user => user.user_id !== userId));
      alert('사용자가 삭제되었습니다.');
      
      // 필요한 경우 목록 전체 갱신 (사용자가 적어져서 페이지가 줄어들 수 있음)
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error('사용자 삭제 에러:', err);
      alert('사용자 삭제에 실패했습니다. ' + err.message);
    }
  };
  
  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };
  
  // 검색어 입력 시 딜레이 검색 (타이핑 후 500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeMenu === 'users') {
        setCurrentPage(1); // 검색어 변경 시 첫 페이지로 이동
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // 필터링된 사용자 목록 (더 이상 필요 없음 - API에서 처리)
  const filteredUsers = users;
  
  // 사용자 추가 모달 열기
  const handleAddUser = () => {
    setEditUser(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };
  
  // 사용자 편집 모달 열기
  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditMode(true);
    setIsFormOpen(true);
  };
  
  // 사용자 저장 처리 (추가 또는 수정)
  const handleSaveUser = async (userData) => {
    const token = localStorage.getItem('token');
    
    try {
      // 필드 이름 매핑 (name -> fullname)
      const dataToSubmit = { ...userData };
      if (dataToSubmit.name) {
        dataToSubmit.fullname = dataToSubmit.name;
        delete dataToSubmit.name;
      }
      
      let response;
      
      if (isEditMode) {
        // 사용자 수정
        response = await fetch(`/api/admin/users/${editUser.user_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSubmit)
        });
      } else {
        // 새 사용자 추가
        response = await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSubmit)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '사용자 저장에 실패했습니다.');
      }
      
      // 성공 시 사용자 정보 업데이트
      const updatedUserData = await response.json();
      
      // fullname 필드를 name 필드로 매핑
      const updatedUser = {
        ...updatedUserData,
        name: updatedUserData.fullname || updatedUserData.name || '',
      };
      
      if (isEditMode) {
        // 편집 모드에서는 현재 목록에서 해당 사용자만 업데이트
        setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
        alert('사용자 정보가 수정되었습니다.');
      } else {
        // 추가 모드에서는 첫 페이지로 이동 후 전체 목록 새로고침
        setCurrentPage(1);
        // 사용자 목록 즉시 갱신
        setTimeout(() => fetchUsers(), 100);
        alert('새 사용자가 추가되었습니다.');
      }
      
      setIsFormOpen(false);
    } catch (err) {
      console.error('사용자 저장 에러:', err);
      throw err;
    }
  };
  
  // 메뉴 렌더링 함수
  const renderMenu = () => {
    return (
      <div className="flex flex-col sm:flex-row bg-gray-800 text-white p-2 sm:p-0">
        <button
          className={`flex items-center px-4 py-2 ${activeMenu === 'users' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveMenu('users')}
        >
          <FiUsers className="mr-2" /> 사용자 관리
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeMenu === 'token_usage' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveMenu('token_usage')}
        >
          <FiBarChart2 className="mr-2" /> 토큰 사용량 관리
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeMenu === 'conversations' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveMenu('conversations')}
        >
          <FiMessageSquare className="mr-2" /> 대화 내역
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeMenu === 'knowledge' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveMenu('knowledge')}
        >
          <FiDatabase className="mr-2" /> 지식 베이스
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeMenu === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveMenu('settings')}
        >
          <FiSettings className="mr-2" /> 시스템 설정
        </button>
      </div>
    );
  };

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    switch (activeMenu) {
      case 'users':
        return renderUsersContent();
      case 'token_usage':
        return <TokenUsageManagement />;
      case 'conversations':
        return <div className="text-center p-8 text-gray-500">대화 내역 기능은 아직 구현되지 않았습니다.</div>;
      case 'knowledge':
        return <div className="text-center p-8 text-gray-500">지식 베이스 기능은 아직 구현되지 않았습니다.</div>;
      case 'settings':
        return <div className="text-center p-8 text-gray-500">시스템 설정 기능은 아직 구현되지 않았습니다.</div>;
      default:
        return renderUsersContent();
    }
  };

  // 사용자 관리 컨텐츠
  const renderUsersContent = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">사용자 관리</h1>
          <div className="flex">
            <form onSubmit={handleSearch} className="flex">
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
              <button type="submit" className="hidden">검색</button>
            </form>
            <button 
              onClick={handleAddUser} 
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              새 사용자 추가
            </button>
          </div>
        </div>
        
        {/* 오류 메시지 표시 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">오류:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        
        {/* 로딩 상태 표시 */}
        {loading ? (
          <div className="bg-white shadow-md rounded-lg p-8 flex justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-500">사용자 데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <>
            {/* 사용자 목록 테이블 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {users.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  사용자가 없거나 검색 결과가 없습니다.
                </div>
              ) : (
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
                      <tr key={user.user_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.user_id}
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
                            user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 
                            user.role === 'DEVELOPER' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'TESTER' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '로그인 기록 없음'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            편집
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.user_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* 페이지네이션 */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                총 {totalItems}명의 사용자 ({currentPage} / {totalPages} 페이지)
              </div>
              {totalPages > 1 && (
                <div className="flex">
                  <button 
                    className={`px-3 py-1 border rounded-l-md bg-white text-gray-700 hover:bg-gray-50 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    이전
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // 현재 페이지 주변의 페이지 번호만 표시
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`px-3 py-1 border-t border-b ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    className={`px-3 py-1 border rounded-r-md bg-white text-gray-700 hover:bg-gray-50 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>관리자 모드 - AI헬퍼</title>
        <meta name="description" content="AI헬퍼 관리자 모드" />
      </Head>
      
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">관리자 모드</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">관리자님 환영합니다</span>
          <button 
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('isLoggedIn');
              router.push('/login');
            }}
          >
            로그아웃
          </button>
        </div>
      </header>
      
      {renderMenu()}
      
      <main className="container mx-auto p-4">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
            <h3 className="font-bold">오류 발생</h3>
            <p>{error}</p>
          </div>
        )}
        
        {renderContent()}
      </main>
      
      {/* 사용자 관리 폼 모달 */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <UserForm 
              user={editUser} 
              isEditMode={isEditMode} 
              onSave={handleSaveUser} 
              onCancel={() => setIsFormOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 