import React, { useState, useEffect } from 'react';

const UserForm = ({ isOpen, onClose, onSubmit, user = null, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    name: '',
    status: 'ACTIVE',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (user && isEditMode) {
      // 편집 모드일 때는 기존 데이터로 폼 초기화
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // 비밀번호는 빈 값으로 설정
        confirmPassword: '',
        role: user.role || 'USER',
        name: user.name || '',
        status: user.status || 'ACTIVE',
      });
    } else {
      // 추가 모드일 때는 폼 초기화
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        name: '',
        status: 'ACTIVE',
      });
    }
  }, [user, isEditMode, isOpen]);
  
  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
    
    if (!isEditMode && !formData.password) {
      newErrors.password = '비밀번호는 필수입니다.';
    } else if (formData.password && formData.password.length < 4) {
      newErrors.password = '비밀번호는 최소 4자 이상이어야 합니다.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 비밀번호 확인 필드는 제외하고 서버로 전송
      const dataToSubmit = { ...formData };
      delete dataToSubmit.confirmPassword;
      
      // 편집 모드에서 비밀번호를 변경하지 않는 경우 비밀번호 필드 제외
      if (isEditMode && !dataToSubmit.password) {
        delete dataToSubmit.password;
      }
      
      await onSubmit(dataToSubmit);
      onClose();
    } catch (error) {
      console.error('사용자 저장 중 오류 발생:', error);
      setErrors({ submit: error.message || '사용자 저장 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditMode ? '사용자 정보 수정' : '새 사용자 추가'}
          </h2>
          
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{errors.submit}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                사용자 이름*
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                value={formData.username}
                onChange={handleChange}
                disabled={isEditMode} // 편집 모드에서는 사용자명 변경 불가
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                이메일*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                역할*
              </label>
              <select
                id="role"
                name="role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">일반 사용자</option>
                <option value="ADMIN">관리자</option>
                <option value="DEVELOPER">개발자</option>
                <option value="TESTER">테스터</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                상태*
              </label>
              <select
                id="status"
                name="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">활성</option>
                <option value="INACTIVE">비활성</option>
                <option value="SUSPENDED">정지</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {isEditMode ? '새 비밀번호 (변경 시에만 입력)' : '비밀번호*'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                {isEditMode ? '새 비밀번호 확인' : '비밀번호 확인*'}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>
            
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={onClose}
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    저장 중...
                  </span>
                ) : (
                  '저장'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm; 