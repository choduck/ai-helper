import React from 'react';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';

const MessageItem = ({ message, isError, isSystem }) => {
  const isAI = message.sender === 'ai';
  
  // 메시지 스타일 결정
  let bgColorClass = isAI
    ? 'bg-white border border-gray-200 text-gray-800'
    : 'bg-primary text-white';
    
  // 에러 메시지일 경우 스타일 변경
  if (isError) {
    bgColorClass = 'bg-red-50 border border-red-200 text-red-700';
  }
  
  // 시스템 메시지일 경우 스타일 변경
  if (isSystem) {
    bgColorClass = 'bg-blue-50 border border-blue-200 text-blue-700';
  }
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-3 ${bgColorClass}`}
      >
        {isError && (
          <div className="flex items-center mb-1 text-red-500">
            <FiAlertTriangle className="mr-1" />
            <span className="text-xs font-medium">오류 발생</span>
          </div>
        )}
        
        {isSystem && (
          <div className="flex items-center mb-1 text-blue-500">
            <FiInfo className="mr-1" />
            <span className="text-xs font-medium">시스템 메시지</span>
          </div>
        )}
        
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;