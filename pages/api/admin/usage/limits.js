import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다' });
  }

  // GET 요청 - 토큰 제한 목록 조회
  if (req.method === 'GET') {
    try {
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.get(`${BACKEND_URL}/api/admin/usage/limits`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // 테스트용 더미 데이터
      const dummyLimits = [
        {
          limit_id: 1,
          user_id: 1,
          username: 'admin',
          email: 'admin@example.com',
          monthly_token_limit: 500000,
          input_token_limit: null,
          output_token_limit: null,
          warning_threshold: 80,
          critical_threshold: 95,
          action_on_limit: 'WARN',
          is_active: true,
          created_at: '2023-04-01T10:15:30Z',
          updated_at: '2023-04-01T10:15:30Z'
        },
        {
          limit_id: 2,
          user_id: 2,
          username: 'user1',
          email: 'user1@example.com',
          monthly_token_limit: 400000,
          input_token_limit: 160000,
          output_token_limit: 240000,
          warning_threshold: 75,
          critical_threshold: 90,
          action_on_limit: 'BLOCK',
          is_active: true,
          created_at: '2023-04-02T14:22:45Z',
          updated_at: '2023-04-02T14:22:45Z'
        },
        {
          limit_id: 3,
          user_id: 3,
          username: 'developer',
          email: 'dev@example.com',
          monthly_token_limit: 600000,
          input_token_limit: null,
          output_token_limit: null,
          warning_threshold: 85,
          critical_threshold: 95,
          action_on_limit: 'WARN',
          is_active: true,
          created_at: '2023-04-03T09:10:15Z',
          updated_at: '2023-04-03T09:10:15Z'
        },
        {
          limit_id: 5,
          user_id: 5,
          username: 'manager',
          email: 'manager@example.com',
          monthly_token_limit: 200000,
          input_token_limit: 80000,
          output_token_limit: 120000,
          warning_threshold: 70,
          critical_threshold: 90,
          action_on_limit: 'APPROVE',
          is_active: false,
          created_at: '2023-04-04T16:55:00Z',
          updated_at: '2023-04-05T11:30:22Z'
        }
      ];

      return res.status(200).json({ limits: dummyLimits });
    } catch (error) {
      console.error('Error fetching token limits:', error);
      return res.status(500).json({ 
        message: '토큰 제한 설정을 가져오는 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } 
  // POST 요청 - 새 토큰 제한 추가
  else if (req.method === 'POST') {
    try {
      const limitData = req.body;
      
      // 필수 필드 검증
      if (!limitData.user_id) {
        return res.status(400).json({ message: '사용자 ID는 필수 항목입니다' });
      }
      
      // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
      // const response = await axios.post(`${BACKEND_URL}/api/admin/usage/limits`, limitData, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // 테스트용 더미 응답
      const dummyResponse = {
        limit_id: Date.now(),
        ...limitData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return res.status(201).json(dummyResponse);
    } catch (error) {
      console.error('Error creating token limit:', error);
      return res.status(500).json({ 
        message: '토큰 제한 설정 생성 중 오류가 발생했습니다', 
        error: error.message 
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 