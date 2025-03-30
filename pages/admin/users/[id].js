import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiTrash2, FiAlertCircle } from 'react-icons/fi';

const UserDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'USER',
    name: '',
    status: 'ACTIVE',
    // 비밀번호는 보안상 상세 페이지에서는 포함하지 않음
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  
  // 유저 데이터 로드
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/admin/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('사용자 정보를 불러오는데 실패했습니다.');
        }
        
        const userData = await response.json();
        setUser(userData);
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          role: userData.role || 'USER',
          name: userData.name || '',
          status: userData.status || 'ACTIVE',
        });
      } catch (err) {
        console.error('사용자 정보 조회 에러:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 비밀번호 필드 변경 처리
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '사용자 이름은 필수입니다.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일은 필수입니다.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 비밀번호 유효성 검사
  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호는 필수입니다.';
    } else if (passwordData.newPassword.length < 4) {
      newErrors.newPassword = '비밀번호는 최소 4자 이상이어야 합니다.';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };
  
  // 사용자 정보 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('사용자 정보 수정에 실패했습니다.');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      alert('사용자 정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error('사용자 정보 수정 에러:', err);
      setError('사용자 정보 수정에 실패했습니다. ' + err.message);
    } finally {
      setSaving(false);
    }
  };
  
  // 비밀번호 변경
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${id}/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: passwordData.newPassword })
      });
      
      if (!response.ok) {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }
      
      setPasswordData({
        newPassword: '',
        confirmPassword: '',
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (err) {
      console.error('비밀번호 변경 에러:', err);
      setError('비밀번호 변경에 실패했습니다. ' + err.message);
    } finally {
      setSaving(false);
    }
  };
  
  // 사용자 삭제
  const handleDeleteUser = async () => {
    if (!confirm('정말 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('사용자 삭제에 실패했습니다.');
      }
      
      alert('사용자가 성공적으로 삭제되었습니다.');
      router.push('/admin');
    } catch (err) {
      console.error('사용자 삭제 에러:', err);
      setError('사용자 삭제에 실패했습니다. ' + err.message);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-gray-500">사용자 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{user ? `${user.username} 사용자 정보` : '사용자 정보'} - AI헬퍼 관리자</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin">
                <span className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
                  <FiArrowLeft className="mr-2" />
                  사용자 목록으로 돌아가기
                </span>
              </Link>
            </div>
            
            <button
              onClick={handleDeleteUser}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiTrash2 className="mr-2" />
              사용자 삭제
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">사용자 상세 정보</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">사용자 ID: {id}</p>
              </div>
              
              {user && (
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <div className="flex items-center">
                  <FiAlertCircle className="mr-2" />
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200">
              <form onSubmit={handleSubmit}>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">사용자 이름</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="username"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={true}
                      />
                      {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">이메일</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="email"
                        name="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">이름</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">역할</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        name="role"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="USER">일반 사용자</option>
                        <option value="ADMIN">관리자</option>
                        <option value="DEVELOPER">개발자</option>
                        <option value="TESTER">테스터</option>
                      </select>
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">상태</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        name="status"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="ACTIVE">활성</option>
                        <option value="INACTIVE">비활성</option>
                        <option value="SUSPENDED">정지</option>
                      </select>
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">마지막 로그인</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user && user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '로그인 기록 없음'}
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500"></dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={saving}
                      >
                        {saving ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            저장 중...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FiSave className="mr-2" />
                            정보 저장
                          </span>
                        )}
                      </button>
                    </dd>
                  </div>
                </dl>
              </form>
            </div>
          </div>
          
          {/* 비밀번호 변경 카드 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">비밀번호 변경</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">사용자의 새 비밀번호를 설정합니다.</p>
            </div>
            
            <div className="border-t border-gray-200">
              <form onSubmit={handlePasswordSubmit}>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">새 비밀번호</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="password"
                        name="newPassword"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                      {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">비밀번호 확인</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500"></dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={saving}
                      >
                        {saving ? '저장 중...' : '비밀번호 변경'}
                      </button>
                    </dd>
                  </div>
                </dl>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage; 