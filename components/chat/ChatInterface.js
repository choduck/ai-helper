import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiMic } from 'react-icons/fi';
import MessageItem from './MessageItem';
import chatService from '../../services/chatService';

// 백엔드 URL 정의
const BACKEND_URL = 'http://localhost:8080';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: '안녕하세요! AI 도우미입니다. 무엇을 도와드릴까요?', sender: 'ai' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiMessages, setApiMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('💬 ChatInterface - 컴포넌트 마운트');
    scrollToBottom();
  }, []);

  useEffect(() => {
    console.log('💬 ChatInterface - 메시지 업데이트됨');
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      console.log('💬 ChatInterface - 빈 메시지 전송 시도, 무시됨');
      return;
    }

    console.log('💬 ChatInterface - 사용자 메시지 전송:', inputMessage);

    // 사용자 메시지 추가
    const userMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
    };

    // API 요청용 메시지 배열에도 추가
    const userApiMessage = { role: 'user', content: inputMessage };
    const updatedApiMessages = [...apiMessages, userApiMessage];
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setApiMessages(updatedApiMessages);
    setInputMessage('');
    setIsTyping(true);

    console.log('💬 ChatInterface - API 메시지 배열:', updatedApiMessages);

    try {
      console.log('💬 ChatInterface - 백엔드 API 호출 시작');
      console.log('💬 ChatInterface - 토큰 확인:', localStorage.getItem('token') ? '있음' : '없음');
      
      // 백엔드 API 호출
      const response = await chatService.sendMessage(updatedApiMessages);
      console.log('💬 ChatInterface - API 응답 받음:', response);

      if (response && response.choices && response.choices.length > 0) {
        const aiContent = response.choices[0].message.content;
        console.log('💬 ChatInterface - AI 응답 내용:', aiContent);

        // AI 응답 메시지 추가
        const aiMessage = {
          id: messages.length + 2,
          content: aiContent,
          sender: 'ai',
        };

        // API 메시지 배열에도 추가
        setApiMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } else {
        console.error('💬 ChatInterface - API 응답 형식 오류:', response);
        handleApiError('응답 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('💬 ChatInterface - API 호출 에러:', error);
      console.error('💬 ChatInterface - 에러 상세:', error.message);
      handleApiError('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleApiError = (errorMessage) => {
    // 에러 메시지를 채팅창에 표시
    const errorResponse = {
      id: messages.length + 2,
      content: errorMessage,
      sender: 'ai',
      isError: true
    };
    setMessages(prevMessages => [...prevMessages, errorResponse]);
  };

  // 사용자가 로그인되어 있는지 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('💬 ChatInterface - 사용자 인증 상태 확인:', token ? '로그인됨' : '로그인 안됨');
    
    if (!token) {
      console.warn('💬 ChatInterface - 로그인되지 않은 상태');
      // 로그인 안내 메시지 추가 (옵션)
      /*
      setMessages([
        { 
          id: 1, 
          content: '채팅을 시작하려면 로그인이 필요합니다.', 
          sender: 'ai',
          isSystem: true 
        }
      ]);
      */
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            isError={message.isError}
            isSystem={message.isSystem}
          />
        ))}

        {isTyping && (
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2 w-16 h-8 flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="bg-gray-500 rounded-full w-2 h-2 animate-bounce"></div>
                <div className="bg-gray-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-gray-500 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSend} className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:text-primary hover:bg-gray-100"
          >
            <FiPaperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            className="flex-grow mx-2 py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="무엇을 도와드릴까요?"
          />

          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:text-primary hover:bg-gray-100 mr-2"
          >
            <FiMic className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;