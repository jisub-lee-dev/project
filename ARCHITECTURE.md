# 🏗️ 아키텍처 문서

이 문서는 모노레포의 전체 아키텍처와 설계 원칙을 설명합니다.

## 📋 목차

- [개요](#개요)
- [모노레포 구조](#모노레포-구조)
- [패키지 의존성](#패키지-의존성)
- [빌드 시스템](#빌드-시스템)
- [개발 워크플로우](#개발-워크플로우)
- [배포 전략](#배포-전략)

## 개요

이 프로젝트는 **Turborepo**를 기반으로 한 모던 풀스택 모노레포입니다. 코드 공유, 일관된 개발 환경, 효율적인 빌드 시스템을 통해 개발 생산성을 극대화합니다.

### 핵심 원칙

- **코드 재사용성**: 공통 로직을 패키지로 분리하여 중복 제거
- **타입 안전성**: TypeScript를 통한 엄격한 타입 체크
- **일관성**: 통합된 린팅, 포맷팅, 빌드 설정
- **성능**: Turborepo 캐싱을 통한 빠른 빌드
- **확장성**: 새로운 앱과 패키지 추가 용이

## 모노레포 구조

```
project/
├── apps/                    # 애플리케이션
│   └── web/                # Next.js 웹 앱
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── next.config.ts
├── packages/               # 공유 패키지
│   ├── ui/                # UI 컴포넌트 라이브러리
│   ├── db/                # 데이터베이스 스키마 & 클라이언트
│   ├── utils/             # 유틸리티 함수
│   ├── validation/        # 스키마 검증
│   ├── eslint-config/     # ESLint 설정
│   └── tsconfig/          # TypeScript 설정
├── scripts/               # 빌드/배포 스크립트
├── .github/              # GitHub Actions
└── 설정 파일들
```

### 애플리케이션 (apps/)

#### web/

- **기술**: Next.js 15 + React 19 + TypeScript
- **스타일링**: Tailwind CSS v4
- **라우팅**: App Router
- **상태관리**: React Hook Form + Zod
- **데이터베이스**: Prisma ORM

### 공유 패키지 (packages/)

#### @repo/ui

- **목적**: 재사용 가능한 UI 컴포넌트
- **기술**: Radix UI + Tailwind CSS + CVA
- **특징**:
  - 접근성 준수 (WCAG)
  - 다크모드 지원
  - 반응형 디자인
  - TypeScript 완전 지원

#### @repo/db

- **목적**: 데이터베이스 스키마 및 클라이언트
- **기술**: Prisma ORM + PostgreSQL
- **특징**:
  - 타입 안전한 쿼리
  - 마이그레이션 관리
  - 스키마 검증

#### @repo/utils

- **목적**: 공통 유틸리티 함수
- **포함**: 날짜, 문자열, 배열, 객체 조작 함수
- **특징**: Tree-shaking 최적화

#### @repo/validation

- **목적**: 데이터 검증 스키마
- **기술**: Zod + React Hook Form
- **특징**: 클라이언트/서버 공통 검증

#### @repo/eslint-config

- **목적**: 통합 ESLint 설정
- **설정**: Next.js, React, TypeScript, 라이브러리별 설정

#### @repo/tsconfig

- **목적**: 공유 TypeScript 설정
- **설정**: 기본, Next.js, 라이브러리별 설정

## 패키지 의존성

```mermaid
graph TD
    A[apps/web] --> B[@repo/ui]
    A --> C[@repo/db]
    A --> D[@repo/utils]
    A --> E[@repo/validation]

    B --> E
    B --> F[@repo/eslint-config]
    B --> G[@repo/tsconfig]

    C --> E
    C --> F
    C --> G

    D --> E
    D --> F
    D --> G

    E --> F
    E --> G
```

### 의존성 규칙

1. **앱은 모든 패키지를 사용할 수 있음**
2. **패키지 간 순환 의존성 금지**
3. **설정 패키지는 다른 패키지에 의존하지 않음**
4. **validation 패키지는 최상위 공통 패키지**

## 빌드 시스템

### Turborepo 설정

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build", "db:generate"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["db:generate"]
    }
  }
}
```

### 빌드 순서

1. **설정 패키지** (eslint-config, tsconfig)
2. **기본 패키지** (validation, utils)
3. **데이터베이스** (db - Prisma 생성)
4. **UI 패키지** (ui)
5. **애플리케이션** (web)

### 캐싱 전략

- **로컬 캐시**: `.turbo/cache/`
- **원격 캐시**: Vercel (선택사항)
- **캐시 키**: 파일 해시 + 의존성 해시

## 개발 워크플로우

### 1. 초기 설정

```bash
pnpm setup  # 환경 변수 + 의존성 설치 + DB 설정
```

### 2. 개발 서버 시작

```bash
pnpm dev    # 모든 패키지 watch 모드
```

### 3. 코드 품질 검사

```bash
pnpm check-all  # 린트 + 타입체크 + 포맷 검사
pnpm fix-all    # 자동 수정
```

### 4. 빌드 및 테스트

```bash
pnpm build      # 프로덕션 빌드
pnpm test       # 테스트 실행
```

### Git 워크플로우

1. **Feature Branch**: `feature/feature-name`
2. **Pre-commit**: 자동 린트 + 포맷
3. **CI/CD**: GitHub Actions
4. **Deploy**: Vercel (자동)

## 배포 전략

### 환경별 설정

- **Development**: `.env.local`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

### 배포 플랫폼

#### Vercel (권장)

- **자동 배포**: Git push 시 자동 배포
- **프리뷰**: PR별 프리뷰 환경
- **엣지 함수**: API Routes 최적화

#### Docker

- **멀티스테이지 빌드**: 최적화된 이미지
- **프로덕션 준비**: standalone 출력

### 데이터베이스 배포

1. **마이그레이션**: `pnpm db:migrate`
2. **시드 데이터**: `pnpm db:seed`
3. **백업**: 정기 백업 스케줄

## 성능 최적화

### 번들 최적화

- **Tree Shaking**: 사용하지 않는 코드 제거
- **Code Splitting**: 페이지별 코드 분할
- **Dynamic Import**: 지연 로딩

### 이미지 최적화

- **Next.js Image**: 자동 최적화
- **WebP/AVIF**: 최신 포맷 지원
- **Lazy Loading**: 뷰포트 기반 로딩

### 캐싱 전략

- **Static Generation**: 정적 페이지 생성
- **ISR**: 증분 정적 재생성
- **API Caching**: API 응답 캐싱

## 모니터링 및 로깅

### 에러 추적

- **Sentry**: 프로덕션 에러 모니터링
- **로그 레벨**: 환경별 로그 레벨 설정

### 성능 모니터링

- **Web Vitals**: Core Web Vitals 추적
- **Analytics**: 사용자 행동 분석

## 보안

### 환경 변수

- **민감 정보**: 환경 변수로 관리
- **타입 검증**: 환경 변수 스키마 검증

### 의존성 보안

- **정기 업데이트**: 보안 패치 적용
- **취약점 스캔**: npm audit

## 확장 가이드

### 새 앱 추가

1. `apps/` 디렉토리에 새 앱 생성
2. `pnpm-workspace.yaml`에 추가
3. 공통 패키지 의존성 설정

### 새 패키지 추가

1. `packages/` 디렉토리에 새 패키지 생성
2. `@repo/` 네임스페이스 사용
3. 의존성 그래프 확인

### 마이그레이션

- **점진적 마이그레이션**: 기존 코드를 단계적으로 이전
- **호환성 유지**: 기존 API 호환성 보장
