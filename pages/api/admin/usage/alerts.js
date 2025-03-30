import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다' });
  }

  // GET 요청 - 알림 목록 조회
  if (req.method === 'GET') {
    try {
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.get(`${BACKEND_URL}/api/admin/usage/alerts`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // 테스트용 더미 데이터
      const dummyAlerts = [
        {
          alert_id: 1,
          user_id: 2,
          username: 'user1',
          email: 'user1@example.com',
          org_id: 1,
          alert_type: 'WARNING',
          threshold_percentage: 80,
          message: '이번 달 토큰 사용량이 80%에 도달했습니다.',
          is_read: false,
          is_email_sent: true,
          created_at: '2023-04-05T09:10:15Z'
        },
        {
          alert_id: 2,
          user_id: 3,
          username: 'developer',
          email: 'dev@example.com',
          org_id: 1,
          alert_type: 'CRITICAL',
          threshold_percentage: 95,
          message: '이번 달 토큰 사용량이 95%에 도달했습니다. 곧 제한에 도달할 수 있습니다.',
          is_read: true,
          is_email_sent: true,
          created_at: '2023-04-06T14:22:30Z'
        },
        {
          alert_id: 3,
          user_id: null,
          org_id: 1,
          alert_type: 'ANOMALY',
          threshold_percentage: 0,
          message: '조직 전체의 토큰 사용량이 지난 24시간 동안 비정상적으로 증가했습니다.',
          is_read: false,
          is_email_sent: true,
          created_at: '2023-04-07T08:45:10Z'
        },
        {
          alert_id: 4,
          user_id: 5,
          username: 'manager',
          email: 'manager@example.com',
          org_id: 1,
          alert_type: 'LIMIT_REACHED',
          threshold_percentage: 100,
          message: '이번 달 토큰 사용량 제한에 도달했습니다. 추가 사용을 위해 관리자에게 문의하세요.',
          is_read: false,
          is_email_sent: true,
          created_at: '2023-04-07T16:30:00Z'
        }
      ];

      return res.status(200).json({ alerts: dummyAlerts });
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return res.status(500).json({ 
        message: '알림 목록을 가져오는 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } 
  // POST 요청 - 알림 설정 저장
  else if (req.method === 'POST') {
    try {
      const alertSettings = req.body;
      
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.post(`${BACKEND_URL}/api/admin/usage/alerts/settings`, alertSettings, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // 테스트용 더미 응답
      const dummyResponse = {
        success: true,
        message: '알림 설정이 저장되었습니다',
        settings: alertSettings
      };
      
      return res.status(200).json(dummyResponse);
    } catch (error) {
      console.error('Error saving alert settings:', error);
      return res.status(500).json({ 
        message: '알림 설정 저장 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 