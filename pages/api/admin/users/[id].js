import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export default async function handler(req, res) {
  // ID 확인
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: '사용자 ID가 필요합니다.' });
  }

  // 인증 토큰 확인
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  try {
    if (req.method === 'GET') {
      // 사용자 상세 정보 가져오기
      const response = await axios.get(`${BACKEND_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return res.status(response.status).json(response.data);
    } else if (req.method === 'PUT') {
      // 사용자 정보 수정
      const response = await axios.put(`${BACKEND_URL}/api/admin/users/${id}`, req.body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return res.status(response.status).json(response.data);
    } else if (req.method === 'DELETE') {
      // 사용자 삭제
      const response = await axios.delete(`${BACKEND_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return res.status(response.status).json(response.data);
    } else {
      return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
    }
  } catch (error) {
    console.error('백엔드 API 호출 에러:', error);
    
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ message: '서버 연결 오류가 발생했습니다.' });
    }
  }
} 