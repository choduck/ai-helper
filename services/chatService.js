import axios from 'axios';

// 백엔드 서버 URL
const BACKEND_URL = 'http://localhost:8080';

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
      content
    };
  }
};

export default chatService; 