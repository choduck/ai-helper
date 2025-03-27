import React from 'react';

const MessageItem = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-3 ${
          isAI
            ? 'bg-white border border-gray-200 text-gray-800'
            : 'bg-primary text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;