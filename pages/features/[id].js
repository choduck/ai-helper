import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';
import ChatInterface from '../../components/chat/ChatInterface';
import { featuresData } from '../../lib/mockData';

export default function FeatureDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [showChat, setShowChat] = useState(false);
  
  // 해당 ID의 기능 정보 찾기
  const feature = featuresData.find(f => f.id === id);
  
  // 로딩 상태 또는 기능을 찾지 못했을 때
  if (!feature) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">기능을 불러오는 중...</h1>
        {id && <p className="text-gray-600">ID: {id}</p>}
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{feature.title} - AI헬퍼</title>
      </Head>
      
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primary mb-4 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            뒤로 가기
          </button>
          
          <h1 className="text-2xl font-bold mb-2">{feature.title}</h1>
          <p className="text-gray-600 mb-4">{feature.description}</p>
          
          <div className="flex flex-wrap mb-6">
            {feature.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {!showChat ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">이 기능으로 무엇을 할 수 있나요?</h2>
            
            <div className="mb-6">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>복잡한 작업을 AI의 도움으로 쉽고 빠르게 처리</li>
                <li>시간 절약 및 업무 효율성 향상</li>
                <li>고품질의 결과물 생성</li>
                <li>반복적인 업무 자동화</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">사용 방법</h3>
              <p className="text-gray-700 mb-4">
                아래 버튼을 클릭하여 AI 헬퍼와 대화를 시작하세요. 원하는 작업을 자연스럽게 요청하면 AI가 도와드립니다.
              </p>
            </div>
            
            <Button onClick={() => setShowChat(true)}>
              시작하기
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <ChatInterface />
          </div>
        )}
      </div>
    </>
  );
}