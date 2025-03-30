import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography, CircularProgress, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import chatService from '../services/chatService';

/**
 * 채팅 인터페이스 컴포넌트
 */
const Chat = () => {
  // 상태 관리
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // 새 메시지가 추가되면 자동 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // 채팅창 맨 아래로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 메시지 전송 처리
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage = chatService.createMessage('user', input);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // 채팅 이력 준비
      const chatHistory = [...messages, userMessage];
      
      // API 호출
      const response = await chatService.sendMessage(chatHistory);
      
      // AI 응답 추가
      if (response.choices && response.choices.length > 0) {
        const aiMessage = response.choices[0].message;
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      // 오류 메시지 추가
      setMessages(prev => [
        ...prev, 
        chatService.createMessage('assistant', '죄송합니다. 요청을 처리하는 중 오류가 발생했습니다.')
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  // 입력 변경 처리
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  // 엔터 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* 채팅 메시지 영역 */}
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          p: 2, 
          mb: 2, 
          overflow: 'auto', 
          maxHeight: 'calc(100vh - 200px)',
          backgroundColor: '#f5f5f5'
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="body1" color="text.secondary">
              AI 어시스턴트에게 질문을 입력해보세요.
            </Typography>
          </Box>
        ) : (
          messages.map((msg, index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                {msg.role === 'user' ? '사용자' : 'AI 어시스턴트'}
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  maxWidth: '80%',
                  backgroundColor: msg.role === 'user' ? '#e3f2fd' : 'white'
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>
      
      {/* 입력 영역 */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            multiline
            minRows={1}
            maxRows={4}
            disabled={loading}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ ml: 1 }}
            disabled={!input.trim() || loading}
          >
            <SendIcon />
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Chat; 