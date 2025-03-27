// 이것은 프론트엔드 개발 단계에서 사용하는 임시 API입니다.
// 실제로는 Spring Boot 백엔드에 연결해야 합니다.

// 임시 기능 데이터
const features = [
  {
    id: 'document-summary',
    title: '문서 요약',
    description: '긴 문서를 AI가 핵심만 요약해드립니다.',
    category: 'document',
    tags: ['문서', '요약', '자동화']
  },
  {
    id: 'email-writer',
    title: '이메일 작성',
    description: '상황에 맞는 전문적인 이메일을 작성해드립니다.',
    category: 'communication',
    tags: ['이메일', '커뮤니케이션']
  },
  {
    id: 'data-analysis',
    title: '데이터 분석',
    description: '복잡한 데이터를 분석하고 인사이트를 제공합니다.',
    category: 'data',
    tags: ['데이터', '분석', '리포트']
  },
  {
    id: 'image-generation',
    title: '이미지 생성',
    description: '텍스트 설명만으로 원하는 이미지를 생성합니다.',
    category: 'design',
    tags: ['이미지', '디자인', '생성']
  },
  {
    id: 'schedule-management',
    title: '일정 관리',
    description: '스케줄을 효율적으로 관리하고 최적화합니다.',
    category: 'automation',
    tags: ['일정', '관리', '자동화']
  },
  {
    id: 'meeting-summary',
    title: '회의록 작성',
    description: '회의 내용을 자동으로 요약하고 정리합니다.',
    category: 'document',
    tags: ['회의', '요약', '문서']
  },
  {
    id: 'report-generator',
    title: '보고서 생성',
    description: '데이터를 기반으로 전문적인 보고서를 생성합니다.',
    category: 'document',
    tags: ['보고서', '문서', '자동화']
  },
  {
    id: 'time-tracking',
    title: '업무 시간 추적',
    description: '업무 시간을 추적하고 생산성을 분석합니다.',
    category: 'automation',
    tags: ['시간', '생산성', '분석']
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // 카테고리 필터링
    const { category, search } = req.query;
    let filteredFeatures = [...features];
    
    if (category && category !== 'all') {
      filteredFeatures = filteredFeatures.filter(feature => feature.category === category);
    }
    
    if (search) {
      const query = search.toLowerCase();
      filteredFeatures = filteredFeatures.filter(feature => 
        feature.title.toLowerCase().includes(query) || 
        feature.description.toLowerCase().includes(query) ||
        feature.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return res.status(200).json(filteredFeatures);
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}