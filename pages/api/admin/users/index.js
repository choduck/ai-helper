import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export default async function handler(req, res) {
  // 인증 토큰 확인
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  try {
    if (req.method === 'GET') {
      // 사용자 목록 가져오기
      const { page = 1, size = 10, search = '' } = req.query;
      const response = await axios.get(`${BACKEND_URL}/api/admin/users`, {
        params: { page, size, search },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return res.status(response.status).json(response.data);
    } else if (req.method === 'POST') {
      // 사용자 생성
      const response = await axios.post(`${BACKEND_URL}/api/admin/users`, req.body, {
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