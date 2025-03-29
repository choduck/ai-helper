import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 백엔드 API로 요청 전달
    const response = await axios.post(`${BACKEND_URL}/api/auth/logout`);
    
    // 백엔드 응답을 그대로 클라이언트에 전달
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('백엔드 로그아웃 API 호출 에러:', error);
    
    // 에러 응답 전달
    if (error.response) {
      // 백엔드에서 에러 응답이 온 경우
      return res.status(error.response.status).json(error.response.data);
    } else {
      // 네트워크 오류 등의 경우
      return res.status(500).json({ message: '서버 연결 오류가 발생했습니다.' });
    }
  }
} 