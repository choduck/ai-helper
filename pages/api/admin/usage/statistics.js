import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { timeRange = 'month' } = req.query;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: '인증이 필요합니다' });
    }

    // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
    // const response = await axios.get(`${BACKEND_URL}/api/admin/usage/statistics?timeRange=${timeRange}`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    
    // 테스트용 더미 데이터
    // 실제 구현에서는 이 부분을 제거하고 백엔드 API 호출로 대체
    const dummyData = {
      totalTokens: 1250000,
      inputTokens: 450000,
      outputTokens: 800000,
      estimatedCost: 27.5,
      costChange: 12.4,
      activeUsers: 28,
      activeUsersPercentage: 82,
      modelUsage: [
        { model: 'GPT-4', tokens: 450000, cost: 18.2 },
        { model: 'GPT-3.5', tokens: 800000, cost: 9.3 }
      ],
      dailyUsage: [
        { date: '2023-04-01', tokens: 38000, cost: 0.85 },
        { date: '2023-04-02', tokens: 42000, cost: 0.92 },
        // ... more dates
      ]
    };

    return res.status(200).json(dummyData);
  } catch (error) {
    console.error('Error fetching token usage statistics:', error);
    return res.status(500).json({ 
      message: '토큰 사용량 통계를 가져오는 중 오류가 발생했습니다', 
      error: error.message 
    });
  }
} 