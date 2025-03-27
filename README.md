# AI헬퍼 - Next.js 기반 AI 어시스턴트 웹 앱

이 프로젝트는 Next.js 기반의 AI 어시스턴트 웹 애플리케이션으로, 업무 자동화, 문서 처리, 이미지 생성 등의 기능을 제공합니다.

## 기능

- 로그인 및 회원가입
- AI 챗봇 인터페이스
- 기능별 카테고리 분류
- 대시보드 및 프로필 관리
- 다양한 AI 기능 (문서 요약, 이메일 작성, 데이터 분석 등)

## 시작하기

### 필수 요구사항

- Node.js 14.0.0 이상
- npm 또는 yarn

### 설치

1. 프로젝트 클론하기

```bash
git clone https://github.com/username/ai-helper.git
cd ai-helper
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

4. 브라우저에서 확인

브라우저를 열고 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

## 프로젝트 구조

```
ai-helper/
├── components/      # 컴포넌트 디렉토리
│   ├── auth/        # 인증 관련 컴포넌트
│   ├── chat/        # 채팅 인터페이스 컴포넌트
│   ├── dashboard/   # 대시보드 관련 컴포넌트
│   ├── layout/      # 레이아웃 컴포넌트
│   └── ui/          # UI 공통 컴포넌트
├── pages/           # 페이지 디렉토리 (Next.js 라우팅)
│   ├── api/         # API 라우트
│   └── features/    # 기능별 페이지
├── public/          # 정적 리소스
│   └── images/      # 이미지 파일
├── styles/          # 스타일시트
├── lib/             # 유틸리티 및 모듈
└── contexts/        # React Context
```

## 기술 스택

- **프론트엔드**:
  - Next.js
  - React
  - Tailwind CSS
  - React Icons

- **백엔드** (예정):
  - Spring Boot
  - MySQL
  - JPA/Hibernate

## 개발 로드맵

1. 프론트엔드 구현 (현재)
   - UI/UX 디자인
   - 컴포넌트 구현
   - 페이지 라우팅

2. 백엔드 통합 (예정)
   - Spring Boot 설정
   - API 구현
   - 데이터베이스 연동

3. AI 기능 통합 (예정)
   - 외부 AI API 연동
   - 자연어 처리 기능 구현
   - 이미지 생성 기능 구현

## 테스트 계정

```
이메일: test@example.com
비밀번호: password123
```

## 주의사항

- 이 프로젝트는 현재 개발 중인 상태로, 실제 AI 기능은 아직 구현되지 않았습니다.
- 현재 버전은 프론트엔드 UI만 구현된 상태로, 백엔드 API는 목업 데이터를 사용합니다.

## 향후 계획

- 실제 AI 모델 통합
- 사용자 피드백 시스템 구현
- 다국어 지원
- 모바일 앱 버전 개발

## 라이센스

MIT