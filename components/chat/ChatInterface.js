import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiMic } from 'react-icons/fi';
import MessageItem from './MessageItem';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: '안녕하세요! AI헬퍼입니다. 무엇을 도와드릴까요?', sender: 'ai' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
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
    
    if (!inputMessage.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      let aiResponse;
      
      if (inputMessage.includes('안녕') || inputMessage.includes('반가워')) {
        aiResponse = '안녕하세요! 오늘 어떤 업무를 도와드릴까요?';
      } else if (inputMessage.includes('문서') || inputMessage.includes('보고서')) {
        aiResponse = '문서 작성을 도와드릴 수 있습니다. 어떤 종류의 문서가 필요하신가요?';
      } else if (inputMessage.includes('이미지') || inputMessage.includes('그림')) {
        aiResponse = '이미지 생성 기능을 통해 원하시는 이미지를 만들어 드릴 수 있습니다. 어떤 이미지가 필요하신가요?';
      } else {
        aiResponse = '말씀하신 내용에 대해 더 자세히 알려주시면 더 정확한 도움을 드릴 수 있습니다.';
      }
      
      const aiMessage = {
        id: messages.length + 2,
        content: aiResponse,
        sender: 'ai',
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
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