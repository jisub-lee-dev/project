---
inclusion: always
---

# 프로젝트 표준 및 규칙

## 코딩 표준

### TypeScript 규칙

- 모든 새로운 코드는 TypeScript로 작성
- `any` 타입 사용 금지 - 대신 적절한 타입 정의 사용
- 인터페이스보다 `type` 키워드 선호
- 함수 반환 타입 명시적 선언 권장

### 네이밍 컨벤션

- 파일명: kebab-case (예: `user-profile.tsx`)
- 컴포넌트: PascalCase (예: `UserProfile`)
- 함수/변수: camelCase (예: `getUserData`)
- 상수: SCREAMING_SNAKE_CASE (예: `API_BASE_URL`)
- 타입/인터페이스: PascalCase (예: `UserData`)

### 폴더 구조

- `apps/`: 애플리케이션 코드
- `packages/`: 공유 패키지
- 각 패키지는 `@repo/` 네임스페이스 사용
- 컴포넌트는 `index.ts`로 export

## 패키지 관리

### 의존성 규칙

- 새 의존성 추가 시 workspace root에서 `pnpm add` 사용
- 패키지별 의존성은 해당 패키지 디렉토리에서 추가
- devDependencies는 가능한 root에서 관리
- 패키지 간 순환 의존성 절대 금지

### 버전 관리

- 모든 패키지는 동일한 버전 정책 사용
- 주요 의존성 업데이트 시 전체 프로젝트 테스트 필수

## 코드 품질

### 필수 검사

- 코드 작성 후 항상 `pnpm check-all` 실행
- 커밋 전 `pnpm fix-all` 실행하여 자동 수정
- TypeScript 에러 0개 유지
- ESLint 경고 최소화

### 테스트

- 새로운 기능에는 테스트 코드 작성
- 유틸리티 함수는 100% 테스트 커버리지 목표
- 컴포넌트는 주요 기능에 대한 테스트 작성

## 성능 최적화

### 번들 크기

- 불필요한 의존성 추가 금지
- Tree-shaking 고려한 import 사용
- Dynamic import 적극 활용

### 이미지 최적화

- Next.js Image 컴포넌트 사용
- WebP/AVIF 포맷 우선 사용
- 적절한 크기 및 품질 설정

## 보안

### 환경 변수

- 민감한 정보는 반드시 환경 변수 사용
- 클라이언트 노출 변수는 `NEXT_PUBLIC_` 접두사 사용
- 환경 변수 스키마 검증 필수

### 데이터 검증

- 모든 외부 입력은 Zod 스키마로 검증
- API 응답도 검증 스키마 적용
- 클라이언트와 서버 모두에서 검증

## 접근성

### UI 컴포넌트

- Radix UI 기반 컴포넌트 사용
- WCAG 2.1 AA 수준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성 확인

### 색상 및 대비

- 충분한 색상 대비 비율 유지
- 다크모드 지원
- 색상에만 의존하지 않는 정보 전달
