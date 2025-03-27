// 임시 데이터 모듈

export const featuresData = [
  {
    id: 'document-summary',
    title: '문서 요약',
    description: '긴 문서를 AI가 핵심만 요약해드립니다.',
    category: 'document',
    tags: ['문서', '요약', '자동화'],
    popularityScore: 98
  },
  {
    id: 'email-writer',
    title: '이메일 작성',
    description: '상황에 맞는 전문적인 이메일을 작성해드립니다.',
    category: 'communication',
    tags: ['이메일', '커뮤니케이션'],
    popularityScore: 95
  },
  {
    id: 'data-analysis',
    title: '데이터 분석',
    description: '복잡한 데이터를 분석하고 인사이트를 제공합니다.',
    category: 'data',
    tags: ['데이터', '분석', '리포트'],
    popularityScore: 90
  },
  {
    id: 'image-generation',
    title: '이미지 생성',
    description: '텍스트 설명만으로 원하는 이미지를 생성합니다.',
    category: 'design',
    tags: ['이미지', '디자인', '생성'],
    popularityScore: 93
  },
  {
    id: 'schedule-management',
    title: '일정 관리',
    description: '스케줄을 효율적으로 관리하고 최적화합니다.',
    category: 'automation',
    tags: ['일정', '관리', '자동화'],
    popularityScore: 85
  },
  {
    id: 'meeting-summary',
    title: '회의록 작성',
    description: '회의 내용을 자동으로 요약하고 정리합니다.',
    category: 'document',
    tags: ['회의', '요약', '문서'],
    popularityScore: 88
  },
  {
    id: 'report-generator',
    title: '보고서 생성',
    description: '데이터를 기반으로 전문적인 보고서를 생성합니다.',
    category: 'document',
    tags: ['보고서', '문서', '자동화'],
    popularityScore: 92
  },
  {
    id: 'time-tracking',
    title: '업무 시간 추적',
    description: '업무 시간을 추적하고 생산성을 분석합니다.',
    category: 'automation',
    tags: ['시간', '생산성', '분석'],
    popularityScore: 82
  }
];

export const recentWorkData = [
  {
    id: 1,
    title: '월간 보고서 초안',
    description: '4월 마케팅 성과 보고서 초안',
    category: 'document',
    createdAt: '2023-05-02T09:30:00'
  },
  {
    id: 2,
    title: '브레인스토밍 아이디어',
    description: '신제품 개발을 위한 아이디어 생성',
    category: 'communication',
    createdAt: '2023-05-01T14:15:00'
  },
  {
    id: 3,
    title: '제품 출시 이메일',
    description: '신제품 출시 안내 이메일 템플릿',
    category: 'communication',
    createdAt: '2023-04-28T11:45:00'
  }
];

export const categoriesData = [
  { id: 'all', name: '전체' },
  { id: 'automation', name: '업무 자동화', count: 12 },
  { id: 'document', name: '문서 처리', count: 18 },
  { id: 'communication', name: '커뮤니케이션', count: 9 },
  { id: 'data', name: '데이터 분석', count: 7 },
  { id: 'design', name: '디자인', count: 5 }
];

export const userProfileData = {
  name: '김지민',
  email: 'jimin.kim@example.com',
  jobTitle: '마케팅 매니저',
  company: '테크 이노베이션 주식회사',
  usageStats: {
    documentsCreated: 28,
    imagesGenerated: 15,
    emailsWritten: 42,
    dataAnalysesRun: 7
  },
  subscription: {
    plan: 'Premium',
    nextBillingDate: '2023-06-15',
    features: ['무제한 문서 생성', '고급 데이터 분석', '우선 지원']
  }
};

export const notificationsData = [
  {
    id: 1,
    title: '분석 완료',
    message: '요청하신 데이터 분석이 완료되었습니다.',
    time: '10분 전',
    read: false
  },
  {
    id: 2,
    title: '새로운 기능',
    message: '새로운 이미지 생성 모델이 출시되었습니다.',
    time: '1시간 전',
    read: true
  },
  {
    id: 3,
    title: '결제 알림',
    message: '다음 달 구독이 갱신될 예정입니다.',
    time: '어제',
    read: true
  }
];