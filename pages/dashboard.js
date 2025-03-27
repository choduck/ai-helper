import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CategoryButtons from '../components/dashboard/CategoryButtons';
import FeatureCard from '../components/dashboard/FeatureCard';
import SearchBar from '../components/ui/SearchBar';
import { FiFileText, FiImage, FiMail, FiBarChart2, FiPenTool, FiCalendar, FiClock, FiMessageSquare } from 'react-icons/fi';

// 임시 데이터
const featuresData = [
  {
    id: 'document-summary',
    title: '문서 요약',
    description: '긴 문서를 AI가 핵심만 요약해드립니다.',
    category: 'document',
    icon: <FiFileText className="w-5 h-5 text-primary" />,
    tags: ['문서', '요약', '자동화']
  },
  {
    id: 'email-writer',
    title: '이메일 작성',
    description: '상황에 맞는 전문적인 이메일을 작성해드립니다.',
    category: 'communication',
    icon: <FiMail className="w-5 h-5 text-primary" />,
    tags: ['이메일', '커뮤니케이션']
  },
  {
    id: 'data-analysis',
    title: '데이터 분석',
    description: '복잡한 데이터를 분석하고 인사이트를 제공합니다.',
    category: 'data',
    icon: <FiBarChart2 className="w-5 h-5 text-primary" />,
    tags: ['데이터', '분석', '리포트']
  },
  {
    id: 'image-generation',
    title: '이미지 생성',
    description: '텍스트 설명만으로 원하는 이미지를 생성합니다.',
    category: 'design',
    icon: <FiImage className="w-5 h-5 text-primary" />,
    tags: ['이미지', '디자인', '생성']
  },
  {
    id: 'schedule-management',
    title: '일정 관리',
    description: '스케줄을 효율적으로 관리하고 최적화합니다.',
    category: 'automation',
    icon: <FiCalendar className="w-5 h-5 text-primary" />,
    tags: ['일정', '관리', '자동화']
  },
  {
    id: 'meeting-summary',
    title: '회의록 작성',
    description: '회의 내용을 자동으로 요약하고 정리합니다.',
    category: 'document',
    icon: <FiMessageSquare className="w-5 h-5 text-primary" />,
    tags: ['회의', '요약', '문서']
  },
  {
    id: 'report-generator',
    title: '보고서 생성',
    description: '데이터를 기반으로 전문적인 보고서를 생성합니다.',
    category: 'document',
    icon: <FiFileText className="w-5 h-5 text-primary" />,
    tags: ['보고서', '문서', '자동화']
  },
  {
    id: 'time-tracking',
    title: '업무 시간 추적',
    description: '업무 시간을 추적하고 생산성을 분석합니다.',
    category: 'automation',
    icon: <FiClock className="w-5 h-5 text-primary" />,
    tags: ['시간', '생산성', '분석']
  }
];

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeatures, setFilteredFeatures] = useState(featuresData);
  const router = useRouter();

  useEffect(() => {
    // 카테고리와 검색어에 따라 기능 필터링
    let filtered = featuresData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(feature => feature.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(feature => 
        feature.title.toLowerCase().includes(query) || 
        feature.description.toLowerCase().includes(query) ||
        feature.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredFeatures(filtered);
  }, [activeCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <Head>
        <title>대시보드 - AI헬퍼</title>
      </Head>
      
      <div className="container mx-auto max-w-5xl px-4 py-6 mb-16 md:mb-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-6">대시보드</h1>
          
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="mb-6">
            <CategoryButtons 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeatures.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
          
          {filteredFeatures.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}