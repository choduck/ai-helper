import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import withAuth from '../hocs/withAuth';

/**
 * 채팅 페이지
 */
const ChatPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            AI 챗봇
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            AI 어시스턴트에게 질문하고 답변을 받아보세요. 코드, 데이터 분석, 창의적인 작업 등 다양한 주제에 대해 도움을 받을 수 있습니다.
          </Typography>
          <Chat />
        </Box>
      </Container>
    </Layout>
  );
};

// 인증이 필요한 페이지로 설정
export default withAuth(ChatPage); 