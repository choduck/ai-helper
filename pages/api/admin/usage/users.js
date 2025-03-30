import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { timeRange = 'month', page = 1, size = 50, search = '' } = req.query;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: '인증이 필요합니다' });
    }

    // 백엔드 API 호출 (실제 구현에서는 이 부분을 백엔드와 연동)
    // const response = await axios.get(
    //   `${BACKEND_URL}/api/admin/usage/users?timeRange=${timeRange}&page=${page}&size=${size}&search=${search}`, 
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   }
    // );
    
    // 테스트용 더미 데이터
    // 실제 구현에서는 이 부분을 제거하고 백엔드 API 호출로 대체
    const dummyUsers = [
      {
        user_id: 1,
        username: 'admin',
        email: 'admin@example.com',
        input_tokens: 150000,
        output_tokens: 250000,
        total_tokens: 400000,
        conversations_count: 45,
        estimated_cost: 8.75,
        monthly_token_limit: 500000
      },
      {
        user_id: 2,
        username: 'user1',
        email: 'user1@example.com',
        input_tokens: 120000,
        output_tokens: 180000,
        total_tokens: 300000,
        conversations_count: 32,
        estimated_cost: 6.20,
        monthly_token_limit: 400000
      },
      {
        user_id: 3,
        username: 'developer',
        email: 'dev@example.com',
        input_tokens: 200000,
        output_tokens: 350000,
        total_tokens: 550000,
        conversations_count: 65,
        estimated_cost: 12.30,
        monthly_token_limit: 600000
      },
      {
        user_id: 4,
        username: 'tester',
        email: 'test@example.com',
        input_tokens: 80000,
        output_tokens: 120000,
        total_tokens: 200000,
        conversations_count: 28,
        estimated_cost: 4.10,
        monthly_token_limit: null
      },
      {
        user_id: 5,
        username: 'manager',
        email: 'manager@example.com',
        input_tokens: 50000,
        output_tokens: 80000,
        total_tokens: 130000,
        conversations_count: 15,
        estimated_cost: 2.80,
        monthly_token_limit: 200000
      }
    ];

    // 검색어로 필터링
    let filteredUsers = dummyUsers;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = dummyUsers.filter(user => 
        user.username.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // 페이지네이션
    const startIdx = (page - 1) * size;
    const endIdx = startIdx + size;
    const paginatedUsers = filteredUsers.slice(startIdx, endIdx);

    const responseData = {
      users: paginatedUsers,
      totalItems: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / size),
      currentPage: parseInt(page),
      pageSize: parseInt(size)
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching user token usage:', error);
    return res.status(500).json({ 
      message: '사용자별 토큰 사용량을 가져오는 중 오류가 발생했습니다', 
      error: error.message 
    });
  }
} 