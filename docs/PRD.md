# 📝 개인 개발 블로그 - PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 프로젝트명
개인 개발 블로그 (Personal Dev Blog with Notion CMS)

### 목적
Notion을 CMS(Content Management System)로 활용하여 개인 기술 블로그를 구축합니다. 개발자가 Notion에서 글을 작성하면 자동으로 블로그에 반영되는 시스템을 제공합니다.

### CMS 선택 이유
- **간단한 콘텐츠 관리**: 별도의 관리자 페이지 없이 Notion UI 활용
- **빠른 개발**: Notion API를 통한 쉬운 통합
- **실시간 동기화**: Notion 데이터베이스의 변경사항이 즉시 반영
- **낮은 비용**: 무료 Notion 플랜으로도 가능
- **개발자 친화적**: API 기반으로 커스터마이징 용이

---

## 2. 비전 및 목표

### 비전
개발자들이 복잡한 CMS 설정 없이, 익숙한 Notion에서 블로그를 작성하고 관리할 수 있는 블로그 플랫폼 제공

### 목표
- ✅ Notion API 연동을 통한 완벽한 CMS 통합
- ✅ 30분 이내 MVP 배포 가능한 아키텍처 구현
- ✅ 반응형 디자인으로 모든 디바이스에서 최적의 경험 제공
- ✅ SEO 최적화를 통한 검색 가능성 확보

---

## 3. 주요 기능

### 3.1 핵심 기능

| 기능 | 설명 | 우선순위 |
|------|------|---------|
| **Notion 데이터베이스 연동** | Notion API를 통해 블로그 글 데이터 실시간 동기화 | 🔴 필수 |
| **글 목록 페이지** | 최근 글을 목록 형식으로 표시 (페이지네이션) | 🔴 필수 |
| **글 상세 페이지** | 개별 글의 전체 내용 표시 | 🔴 필수 |
| **카테고리별 필터링** | 카테고리 선택으로 해당 글만 표시 | 🔴 필수 |
| **검색 기능** | 제목/태그로 글 검색 | 🟠 중요 |
| **태그 시스템** | 글에 여러 태그 추가 및 필터링 | 🟠 중요 |
| **반응형 디자인** | 모바일, 태블릿, 데스크톱 최적화 | 🔴 필수 |

### 3.2 부가 기능 (추후 확장)
- 검색 엔진 최적화 (SEO)
- 소셜 미디어 공유
- 댓글 시스템
- 글 좋아요 기능
- 다크모드 지원

---

## 4. 기술 스택

### Frontend
- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style)
- **Icons**: Lucide React
- **HTTP Client**: fetch API (내장)

### CMS & Database
- **CMS**: Notion API (@notionhq/client)
- **Data Source**: Notion Database
- **Integration**: Server-side data fetching

### Development & Build
- **Bundler**: Turbopack
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

### Deployment
- **Host**: Vercel
- **CI/CD**: Vercel Auto-Deploy
- **Environment**: Node.js 18+

---

## 5. Notion 데이터베이스 구조

### Database Schema

| 속성명 | 속성 타입 | 설명 | 예시 |
|--------|---------|------|------|
| **Title** | Title | 글의 제목 | "Next.js 15 완벽 가이드" |
| **Slug** | Text | URL용 슬러그 (고유) | "nextjs-15-guide" |
| **Category** | Select | 글의 카테고리 | "Next.js", "React", "TypeScript" |
| **Tags** | Multi-select | 글의 태그 (여러 개) | "성능", "최적화", "초보자" |
| **Published Date** | Date | 글 발행일 | 2026-10-25 |
| **Updated Date** | Date | 글 수정일 | 2026-10-25 |
| **Status** | Select | 글의 상태 | "초안", "발행됨", "보관" |
| **Excerpt** | Text | 글의 요약 (150자 이내) | "Next.js 15의 새로운 기능..." |
| **Featured** | Checkbox | 홈페이지에 강조 표시 | true/false |
| **Content** | Page Content | 글의 본문 (Notion 블록) | Markdown 지원 |

### Database Filter Rules
- 기본 필터: `Status = "발행됨"` AND `Published Date ≤ 현재날짜`
- 순서: `Published Date` 내림차순 (최신순)

---

## 6. 화면 구성 및 페이지 구조

### 6.1 홈페이지 (`/`)
**목적**: 최근 글 목록 표시

**구성요소**:
- 헤더 (블로그 제목, 네비게이션)
- 인트로 섹션 (블로그 소개)
- 강조 글 섹션 (Featured posts)
- 최근 글 목록 (10개, 페이지네이션)
- 푸터

**주요 기능**:
- 글 카드 미리보기 (제목, 요약, 카테고리, 날짜)
- 카테고리 필터 태그
- 페이지네이션

### 6.2 글 상세 페이지 (`/blog/[slug]`)
**목적**: 개별 글의 전체 내용 표시

**구성요소**:
- 글 제목
- 메타정보 (작성일, 수정일, 카테고리, 태그)
- 글 본문 (Notion 콘텐츠)
- 이전/다음 글 네비게이션
- 관련 글 추천 (같은 카테고리)

**주요 기능**:
- 마크다운 렌더링
- 목차 (TOC) 자동 생성
- 코드 하이라이팅
- 소셜 공유 버튼

### 6.3 카테고리 페이지 (`/category/[name]`)
**목적**: 특정 카테고리의 글 목록 표시

**구성요소**:
- 카테고리 제목
- 카테고리 설명
- 글 목록 (필터링)
- 다른 카테고리 네비게이션

### 6.4 검색 페이지 (`/search`)
**목적**: 글 검색 기능 제공

**구성요소**:
- 검색 입력 필드
- 검색 결과 목록
- 필터 옵션 (카테고리, 태그)

---

## 7. MVP (Minimum Viable Product) 범위

### 포함되는 기능
- ✅ Notion API 연동 (읽기 전용)
- ✅ 글 목록 페이지 (홈페이지)
- ✅ 글 상세 페이지
- ✅ 카테고리별 필터링 (기본)
- ✅ Tailwind CSS + shadcn/ui로 기본 스타일링
- ✅ 반응형 디자인
- ✅ Vercel 배포

### 제외되는 기능 (추후 개선)
- ❌ 고급 검색 기능
- ❌ 태그 페이지
- ❌ 댓글 시스템
- ❌ 좋아요 기능
- ❌ 소셜 공유
- ❌ SEO 메타 태그 (기본만)
- ❌ 다크모드
- ❌ 관리자 대시보드

---

## 8. 구현 단계 (30분 MVP)

### Phase 1: 초기 설정 (5분)
- [ ] Notion API 패키지 설치 (`@notionhq/client`)
- [ ] `.env.local` 설정 (Notion API Key, Database ID)
- [ ] TypeScript 타입 정의

### Phase 2: Notion 연동 (8분)
- [ ] Notion 데이터베이스 생성 및 구조 설정
- [ ] API Key 발급 및 Database 연결 권한 설정
- [ ] 글 목록 페이지 API 함수 구현 (`lib/notion.ts`)
- [ ] 글 상세 조회 API 함수 구현

### Phase 3: 페이지 구현 (12분)
- [ ] 홈페이지 (`app/page.tsx`) - 글 목록 표시
- [ ] 글 상세 페이지 (`app/blog/[slug]/page.tsx`)
- [ ] 카테고리 페이지 (`app/category/[name]/page.tsx`)
- [ ] Notion 콘텐츠 렌더링 (Markdown 변환)

### Phase 4: 스타일링 및 최적화 (5분)
- [ ] 기본 레이아웃 및 컴포넌트 스타일링
- [ ] 반응형 디자인 구현
- [ ] 성능 최적화 (이미지 최적화, 캐싱)
- [ ] 배포 설정

---

## 9. 성공 기준

### 필수 기준 (Must-Have)
- [ ] Notion 데이터베이스와 성공적으로 연동
- [ ] 홈페이지에서 글 목록 정상 표시
- [ ] 개별 글 상세 페이지 정상 작동
- [ ] 모든 디바이스에서 반응형 레이아웃 작동
- [ ] 30분 이내에 Vercel 배포 완료

### 추가 기준 (Nice-to-Have)
- [ ] 카테고리별 필터링 작동
- [ ] 검색 기능 작동
- [ ] 글 로딩 속도 < 1초
- [ ] Lighthouse 성능 점수 > 80

---

## 10. 환경 설정

### Notion API 설정
1. Notion Workspace 접속
2. `Settings & members` → `Integrations` → `Develop integrations`
3. 새 Integration 생성
4. `Internal Integration` 타입 선택
5. API Key 복사 → `.env.local`에 저장
6. 데이터베이스에서 Integration에 접근 권한 부여

### 환경 변수 (`.env.local`)
```env
NEXT_PUBLIC_NOTION_API_KEY=your-notion-api-key
NEXT_PUBLIC_NOTION_DATABASE_ID=your-database-id
```

### Vercel 배포
1. GitHub에 코드 푸시
2. Vercel 대시보드에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포

---

## 11. 참고 자료

### Notion API
- [Notion API 공식 문서](https://developers.notion.com)
- [@notionhq/client 패키지](https://www.npmjs.com/package/@notionhq/client)

### Next.js
- [Next.js 15.5 문서](https://nextjs.org/docs)
- [App Router 가이드](https://nextjs.org/docs/app)

### 관련 문서
- `@/docs/guides/nextjs-15.md` - Next.js 15.5.3 상세 가이드
- `@/docs/guides/component-patterns.md` - 컴포넌트 작성 패턴
- `@/docs/guides/styling-guide.md` - Tailwind CSS 스타일링

---

**최종 수정**: 2026-10-25  
**상태**: 진행 중 (MVP 개발)
