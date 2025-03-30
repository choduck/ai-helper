import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다' });
  }

  // PUT 요청 - 토큰 제한 수정
  if (req.method === 'PUT') {
    try {
      const limitData = req.body;
      
      // 필수 필드 검증
      if (!limitData.user_id) {
        return res.status(400).json({ message: '사용자 ID는 필수 항목입니다' });
      }
      
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.put(`${BACKEND_URL}/api/admin/usage/limits/${id}`, limitData, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // 테스트용 더미 응답
      const dummyResponse = {
        limit_id: parseInt(id),
        ...limitData,
        updated_at: new Date().toISOString()
      };
      
      return res.status(200).json(dummyResponse);
    } catch (error) {
      console.error('Error updating token limit:', error);
      return res.status(500).json({ 
        message: '토큰 제한 설정 수정 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } 
  // DELETE 요청 - 토큰 제한 삭제
  else if (req.method === 'DELETE') {
    try {
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.delete(`${BACKEND_URL}/api/admin/usage/limits/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      return res.status(200).json({ message: '토큰 제한 설정이 삭제되었습니다', deleted: true });
    } catch (error) {
      console.error('Error deleting token limit:', error);
      return res.status(500).json({ 
        message: '토큰 제한 설정 삭제 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 