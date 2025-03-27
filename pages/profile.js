import React from 'react';
import Head from 'next/head';
import { FiUser, FiMail, FiBriefcase, FiBuilding, FiFileText, FiImage, FiMessageSquare, FiPieChart } from 'react-icons/fi';
import Button from '../components/ui/Button';
import { userProfileData } from '../lib/mockData';

export default function Profile() {
  return (
    <>
      <Head>
        <title>내 프로필 - AI헬퍼</title>
      </Head>
      
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">내 프로필</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  <FiUser className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold">{userProfileData.name}</h2>
                <p className="text-gray-600">{userProfileData.jobTitle}</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FiMail className="w-5 h-5 text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">이메일</p>
                      <p>{userProfileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiBriefcase className="w-5 h-5 text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">직책</p>
                      <p>{userProfileData.jobTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiBuilding className="w-5 h-5 text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">회사</p>
                      <p>{userProfileData.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">사용 통계</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FiFileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-600">생성된 문서</p>
                  <p className="text-xl font-semibold">{userProfileData.usageStats.documentsCreated}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiImage className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-600">생성된 이미지</p>
                  <p className="text-xl font-semibold">{userProfileData.usageStats.imagesGenerated}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <FiMessageSquare className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-600">작성된 이메일</p>
                  <p className="text-xl font-semibold">{userProfileData.usageStats.emailsWritten}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <FiPieChart className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-600">데이터 분석</p>
                  <p className="text-xl font-semibold">{userProfileData.usageStats.dataAnalysesRun}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">구독 정보</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">현재 플랜</p>
                <p className="font-semibold">{userProfileData.subscription.plan}</p>
              </div>
              
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">다음 결제일</p>
                <p>{userProfileData.subscription.nextBillingDate}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">포함된 기능</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {userProfileData.subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Button variant="outline" fullWidth>
              플랜 관리
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">계정 설정</h2>
          
          <div className="space-y-4">
            <div>
              <Button variant="ghost" className="text-left w-full justify-start">
                <FiUser className="mr-2" /> 프로필 정보 수정
              </Button>
            </div>
            
            <div>
              <Button variant="ghost" className="text-left w-full justify-start">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                비밀번호 변경
              </Button>
            </div>
            
            <div>
              <Button variant="ghost" className="text-left w-full justify-start">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                알림 설정
              </Button>
            </div>
            
            <div>
              <Button variant="ghost" className="text-left w-full justify-start text-red-500 hover:bg-red-50">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                계정 삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}