# 🤖 AI 개발 가이드 - shrimp-rules.md

**이 문서는 AI Agent를 위한 프로젝트 개발 지침입니다. 일반 개발자 문서가 아닙니다.**

---

## 1. 프로젝트 개요

### 프로젝트 정의
- **이름**: claude-nextjs-starters (개인 개발 블로그)
- **목적**: Notion을 CMS로 활용한 자동 블로그 콘텐츠 관리 시스템
- **핵심 기능**: Notion 데이터베이스 연동 → 글 목록/상세 페이지 → 검색/필터링

### 기술 스택
| 영역 | 기술 | 버전 |
|------|------|------|
| **Framework** | Next.js (App Router, Turbopack) | 15.5.3 |
| **Runtime** | React | 19.1.0 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS + shadcn/ui | v4 / new-york |
| **Forms** | React Hook Form + Zod | 7.63.0 / 4.1.11 |
| **CMS** | Notion API (@notionhq/client) | 5.28.0 |
| **Icons** | Lucide React | 0.543.0 |
| **Theme** | next-themes | 0.4.6 |
| **Notifications** | sonner | 2.0.7 |

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조

`
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (전역 설정)
│   ├── page.tsx                 # 홈페이지 (/)
│   ├── globals.css              # 전역 CSS 스타일
│   ├── login/page.tsx           # 로그인 페이지
│   └── signup/page.tsx          # 회원가입 페이지
│
├── components/                   # React 컴포넌트 (역할별 분류)
│   ├── ui/                      # shadcn/ui 기본 컴포넌트
│   ├── layout/                  # 페이지 레이아웃 컴포넌트
│   ├── navigation/              # 네비게이션 관련 컴포넌트
│   ├── sections/                # 페이지 섹션 컴포넌트
│   └── providers/               # Context 프로바이더
│
└── lib/                         # 유틸리티 및 설정
    ├── utils.ts                 # 공통 유틸리티 함수
    └── env.ts                   # 환경변수 검증
`

---

## 3. 코드 표준

### 3.1 네이밍 컨벤션

- **폴더**: kebab-case (소문자)
- **컴포넌트 파일**: kebab-case 파일명, PascalCase 컴포넌트명
- **경로 별칭**: 항상 @/ 사용 (상대 경로 금지)

### 3.2 TypeScript 표준

- strict mode 활성화
- 모든 함수/변수는 명시적 타입 지정
- 암묵적 any 금지

### 3.3 주석 규칙

- 주석 최소화 (코드가 자명해야 함)
- WHY가 명확하지 않은 경우에만 작성

---

## 4. 기능 구현 표준

### 4.1 Notion CMS 통합

- Server Components에서만 Notion 데이터 fetch
- Client Components에서의 직접 fetch 금지
- @notionhq/client API 사용

### 4.2 폼 처리

- React Hook Form + Zod 필수 조합
- Server Actions 활용

---

## 5. 프레임워크/라이브러리 사용 표준

### 5.1 Next.js 15.5.3

- App Router만 사용 (Pages Router 금지)
- Turbopack 활용
- Server Components 우선
- Client Components는 'use client' 선언 필수

### 5.2 스타일링

- Tailwind CSS만 사용
- shadcn/ui 컴포넌트 우선
- inline styles 금지
- CSS-in-JS 라이브러리 금지

### 5.3 아이콘과 테마

- 아이콘: Lucide React
- 테마: next-themes

---

## 6. 워크플로우 표준

### 6.1 개발 명령어

- npm run dev: 개발 서버 실행
- npm run check-all: 모든 검사 실행 (필수)
- npm run build: 프로덕션 빌드

### 6.2 코드 품질

- 변경사항 제출 전 npm run check-all 실행
- 모든 검사 통과 확인 필수

---

## 7. 핵심 파일 상호작용

### 다중 파일 동시 수정 필요 케이스

- 새 페이지 추가 → src/app/[page]/page.tsx + 네비게이션 수정
- 새 Notion 데이터 타입 → lib/types/notion.ts + 해당 페이지
- 환경변수 추가 → src/lib/env.ts + .env.example
- 전역 스타일 변경 → src/app/globals.css + theme-provider.tsx

---

## 8. AI 의사결정 표준

### 8.1 파일 생성 위치

- UI 컴포넌트 → src/components/ui/
- 레이아웃 컴포넌트 → src/components/layout/
- 네비게이션 컴포넌트 → src/components/navigation/
- 페이지 섹션 → src/components/sections/
- Context 프로바이더 → src/components/providers/
- 새 페이지 → src/app/[page-name]/page.tsx
- 유틸리티 (1-2개) → src/lib/utils.ts
- 유틸리티 (3개+) → src/lib/[domain]-utils.ts

### 8.2 기술 선택 가이드

- UI 컴포넌트: shadcn/ui 우선
- 폼: React Hook Form + Zod
- 상태 관리: Context API
- 스타일링: Tailwind CSS만

---

## 9. 금지 사항 (절대 하지 말 것)

### 파일/폴더 구조
- snake_case 파일/폴더명 금지
- 4단계 이상 폴더 중첩 금지
- 의미 없는 폴더 (misc/, common/, shared/) 금지
- 파일 크기 300줄 초과 금지

### Import 관련
- 상대 경로 import 금지
- 혼재된 import 방식 금지

### 스타일링
- inline styles 금지
- CSS-in-JS 라이브러리 금지
- 커스텀 .css 파일 추가 금지
- CSS module 금지

### 라이브러리
- Redux, Zustand 등 전역 상태 관리 라이브러리 금지
- Formik, Final Form 등 다른 폼 라이브러리 금지
- react-icons 등 다른 아이콘 라이브러리 금지
- tailwind-theme-switcher 등 다른 테마 라이브러리 금지

### 코드 품질
- 암묵적 any 타입 금지
- // @ts-ignore 금지
- Pages Router 사용 금지
- Client Components에서 직접 DB/API fetch 금지

---

## 10. 개발 흐름 체크리스트

### 새 기능 추가 시
- [ ] 폴더/파일명 kebab-case 확인
- [ ] 컴포넌트명 PascalCase 확인
- [ ] 경로 별칭 @/ 사용 확인
- [ ] TypeScript 타입 정의 완료
- [ ] npm run check-all 통과
- [ ] 다중 파일 수정 필요한지 확인
- [ ] 파일 크기 300줄 이하 확인
- [ ] 불필요한 주석 제거

---

## 요약

### 핵심 규칙 (Must-Do)
1. 경로 별칭 @/ 사용 (절대 상대 경로 금지)
2. Tailwind CSS만 사용 (inline styles/CSS-in-JS 금지)
3. shadcn/ui 컴포넌트 우선
4. React Hook Form + Zod (폼 처리)
5. Server Components 우선 (Notion fetch)

### 핵심 금지 사항 (Must-Not-Do)
1. snake_case 파일/폴더명
2. 상대 경로 import
3. inline styles
4. CSS-in-JS 라이브러리
5. 전역 상태 관리 라이브러리
6. 파일 크기 300줄 초과

---

**마지막 업데이트**: 2026-11-01  
**대상**: AI Agent Development
