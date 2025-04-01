import axios from 'axios';

// 백엔드 서버 URL - 환경 변수에서 가져오거나 현재 도메인과 포트를 기반으로 설정
let BACKEND_URL;

// Next.js의 환경 변수가 있으면 사용
if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BACKEND_URL) {
  BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
} 
// 환경 변수가 없으면 기본값으로 설정
else {
  // 브라우저 환경에서 실행 중이면 현재 호스트를 기준으로 API URL 구성
  if (typeof window !== 'undefined') {
    // 프로덕션 환경에서는 동일한 호스트의 8080 포트 사용
    // 이는 EC2 환경에서 작동하도록 함
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // 로컬 개발 환경
      BACKEND_URL = 'http://localhost:8080';
    } else {
      // 프로덕션 환경 (EC2 등)
      // 동일한 호스트의 다른 포트 또는 API 경로
      // EC2의 IP 또는 도메인을 사용하고 포트도 지정
      BACKEND_URL = `http://${window.location.hostname}:8080`;
    }
  } else {
    // 서버 사이드 렌더링 중 기본값
    BACKEND_URL = 'http://localhost:8080';
  }
}

// 백엔드 URL 로깅
// 브라우저 환경에서만 window 객체에 접근
if (typeof window !== 'undefined') {
  console.log('💬 window.location.hostname :', window.location.hostname + ' 설정된 백엔드 URL:', BACKEND_URL + ' 현재 호스트:', window.location.hostname  );
}
/**
 * 채팅 관련 API 호출을 처리하는 서비스
 */
const chatService = {
  /**
   * 채팅 메시지를 전송하고 AI 응답을 받아옵니다.
   * 
   * @param {Array} messages 채팅 메시지 배열
   * @param {Object} options 추가 옵션 (모델, 온도 등)
   * @returns {Promise} API 응답
   */
  async sendMessage(messages, options = {}) {
    try {
      console.log('💬 chatService - sendMessage 호출됨');
      
      // 토큰 가져오기
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('💬 chatService - 토큰이 없음');
        throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
      }
      
      console.log('💬 chatService - 토큰 확인됨', token.substring(0, 10) + '...');
      
      // 요청 본문 생성
      const requestBody = {
        messages,
        ...options
      };
      
      console.log('💬 chatService - 요청 전송 준비');
      console.log('💬 chatService - 메시지 개수:', messages.length);
      console.log('💬 chatService - 메시지 내용:', messages[messages.length - 1].content);
      
      // 백엔드 URL 로깅
      console.log('💬 chatService - 백엔드 URL:', `${BACKEND_URL}/api/chat/completions`);
      
      // API 호출 - 백엔드에 직접 요청
      const response = await axios.post(`${BACKEND_URL}/api/chat/completions`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        // withCredentials 제거 - CORS 문제 방지
      });
      
      console.log('💬 chatService - 응답 수신 성공!');
      console.log('💬 chatService - 응답 상태 코드:', response.status);
      
      // 응답 내용 로깅 (너무 길면 잘라냄)
      const responseStr = JSON.stringify(response.data);
      if (responseStr.length > 200) {
        console.log('💬 chatService - 응답 데이터(일부):', responseStr.substring(0, 200) + '...');        
      } else {
        console.log('💬 chatService - 응답 데이터:', responseStr);
      }
      
      return response.data;
    } catch (error) {
      console.error('💬 chatService - 오류 발생:', error.message);
      
      // 응답 정보가 있으면 상세 로깅
      if (error.response) {
        console.error('💬 chatService - 응답 상태:', error.response.status);
        console.error('💬 chatService - 응답 데이터:', error.response.data);
        console.error('💬 chatService - 응답 헤더:', error.response.headers);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('💬 chatService - 응답 없음. 요청 정보:', error.request);
      }
      
      throw error;
    }
  },
  
  /**
   * 스트리밍 채팅을 위한 URL을 가져옵니다.
   * 
   * @returns {Promise<string>} 스트리밍 URL
   */
  async getStreamUrl() {
    try {
      console.log('💬 chatService - getStreamUrl 호출됨');
      
      // 토큰 가져오기
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('💬 chatService - 토큰이 없음');
        throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
      }
      
      console.log('💬 chatService - 스트림 URL 요청 준비');
      
      // API 호출 - 백엔드에 직접 요청
      const response = await axios.get(`${BACKEND_URL}/api/chat/stream-url`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
        // withCredentials 제거 - CORS 문제 방지
      });
      
      console.log('💬 chatService - 스트림 URL 응답 수신:', response.data.url);
      
      return response.data.url;
    } catch (error) {
      console.error('💬 chatService - 스트림 URL 가져오기 오류:', error.message);
      throw error;
    }
  },
  
  /**
   * 채팅 메시지 형식을 생성합니다.
   * 
   * @param {string} role 역할 ('user', 'assistant', 'system')
   * @param {string} content 메시지 내용
   * @returns {Object} 채팅 메시지 객체
   */
  createMessage(role, content) {
    console.log('💬 chatService - 메시지 생성:', role);
    return {
      role,
      content,
      timestamp: new Date().toISOString()
    };
  },
  
  /**
   * 대화 내역 저장 함수
   * @param {string} conversationId - 대화 ID (없으면 새로 생성)
   * @param {Array} messages - 저장할 메시지 목록
   * @returns {Promise<Object>} - 저장 결과
   */
  async saveConversation(conversationId, messages) {
    // 로컬 스토리지에서 인증 토큰 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }
    
    const response = await fetch(`${BACKEND_URL}/api/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        conversationId,
        messages
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `대화 저장 실패: ${response.status}`);
    }
    
    return await response.json();
  },
  
  /**
   * 대화 내역 조회 함수
   * @param {string} conversationId - 조회할 대화 ID
   * @returns {Promise<Object>} - 대화 내역
   */
  async getConversation(conversationId) {
    // 로컬 스토리지에서 인증 토큰 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }
    
    const response = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('대화를 찾을 수 없습니다.');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `대화 조회 실패: ${response.status}`);
    }
    
    return await response.json();
  }
};

export default chatService; 