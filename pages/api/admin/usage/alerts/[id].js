import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: '알림 ID가 필요합니다.' });
  }
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다' });
  }

  // PATCH 요청 - 알림 읽음 표시
  if (req.method === 'PATCH') {
    try {
      const { is_read } = req.body;
      
      if (is_read === undefined) {
        return res.status(400).json({ message: 'is_read 필드가 필요합니다.' });
      }
      
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.patch(`${BACKEND_URL}/api/admin/usage/alerts/${id}`, { is_read }, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // 테스트용 더미 응답
      const dummyResponse = {
        success: true,
        message: '알림이 업데이트되었습니다',
        alert: {
          alert_id: parseInt(id),
          is_read: is_read,
          updated_at: new Date().toISOString()
        }
      };
      
      return res.status(200).json(dummyResponse);
    } catch (error) {
      console.error('Error updating alert:', error);
      return res.status(500).json({ 
        message: '알림 업데이트 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } 
  // DELETE 요청 - 알림 삭제
  else if (req.method === 'DELETE') {
    try {
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.delete(`${BACKEND_URL}/api/admin/usage/alerts/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // 테스트용 더미 응답
      const dummyResponse = {
        success: true,
        message: '알림이 삭제되었습니다',
        alert_id: parseInt(id)
      };
      
      return res.status(200).json(dummyResponse);
    } catch (error) {
      console.error('Error deleting alert:', error);
      return res.status(500).json({ 
        message: '알림 삭제 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 