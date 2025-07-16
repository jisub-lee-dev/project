# 🚀 Modern Full-Stack Monorepo

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat&logo=turborepo&logoColor=white)](https://turbo.build/)

**프로덕션 준비 완료된** 현대적인 풀스택 모노레포입니다. 최신 기술 스택과 최적화된 개발 경험을 제공합니다.

## ✨ 주요 특징

### 🏗️ **아키텍처**

- **Turborepo**: 고성능 빌드 시스템과 캐싱
- **PNPM Workspace**: 효율적인 패키지 관리
- **모노레포 구조**: 코드 공유와 일관성 보장

### 🛠️ **기술 스택**

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI
- **Database**: Prisma ORM
- **Validation**: Zod
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

### 📦 **패키지 구조**

```
apps/
├── web/                 # Next.js 웹 애플리케이션
packages/
├── ui/                  # 공유 UI 컴포넌트 (Radix UI + Tailwind)
├── db/                  # 데이터베이스 스키마 및 클라이언트
├── utils/               # 공통 유틸리티 함수
├── validation/          # Zod 스키마 및 검증 로직
├── eslint-config/       # 공유 ESLint 설정
└── tsconfig/           # 공유 TypeScript 설정
```

## 🚀 빠른 시작

### 1. 프로젝트 설정

```bash
# 저장소 클론
git clone <your-repo-url>
cd project

# 초기 설정 실행 (권장)
pnpm setup

# 또는 수동 설정
pnpm install
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local
cp packages/db/.env.example packages/db/.env
```

### 2. 개발 서버 시작

```bash
# 모든 앱 개발 서버 시작
pnpm dev

# 특정 앱만 시작
pnpm --filter web dev
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
pnpm db:generate

# 데이터베이스 스키마 푸시
pnpm db:push

# Prisma Studio 실행
pnpm db:studio
```

## 📋 사용 가능한 명령어

### 🔧 **개발**

```bash
pnpm dev              # 개발 서버 시작
pnpm build            # 프로덕션 빌드
pnpm start            # 프로덕션 서버 시작
```

### 🧹 **코드 품질**

```bash
pnpm lint             # ESLint 실행
pnpm lint:fix         # ESLint 자동 수정
pnpm type-check       # TypeScript 타입 체크
pnpm format           # Prettier 포맷팅
pnpm format:check     # 포맷팅 체크
pnpm check-all        # 모든 검사 실행
pnpm fix-all          # 모든 자동 수정 실행
```

### 🗄️ **데이터베이스**

```bash
pnpm db:generate      # Prisma 클라이언트 생성
pnpm db:push          # 스키마 푸시
pnpm db:studio        # Prisma Studio 실행
pnpm db:migrate       # 마이그레이션 실행
```

### 🎨 **UI 컴포넌트 (shadcn/ui)**

```bash
# shadcn 컴포넌트 추가 (packages/ui 디렉토리에서)
cd packages/ui
pnpm dlx shadcn@latest add [컴포넌트명]

# 또는 루트에서 경로 지정
pnpm dlx shadcn@latest add [컴포넌트명] --cwd packages/ui

# 여러 컴포넌트 한번에 추가
pnpm dlx shadcn@latest add accordion alert-dialog avatar dialog dropdown-menu separator tabs toast tooltip --cwd packages/ui

# 컴포넌트 추가 후 packages/ui/src/index.ts에 export 추가 필요
```

### 🎬 **애니메이션 (Framer Motion)**

```bash
# 페이지 레벨 애니메이션 (apps/web)
pnpm --filter web add framer-motion@latest

# 컴포넌트 레벨 애니메이션 (packages/ui)
pnpm --filter @repo/ui add framer-motion@latest

# 사용 예시
# apps/web/src/app/page.tsx - 페이지 전환, 레이아웃 애니메이션
# packages/ui/src/components - 컴포넌트 내부 애니메이션
```

### 🧽 **정리**

```bash
pnpm clean            # 빌드 파일 및 node_modules 정리
```

## 🏗️ 프로젝트 구조

### **Apps**

- **`apps/web`**: Next.js 15 기반 웹 애플리케이션
  - App Router 사용
  - TypeScript 설정
  - Tailwind CSS v4
  - ESLint Flat Config

### **Packages**

- **`packages/ui`**: 재사용 가능한 UI 컴포넌트
  - Radix UI 기반
  - Tailwind CSS 스타일링
  - TypeScript 지원
  - Storybook 준비

- **`packages/db`**: 데이터베이스 관련
  - Prisma ORM
  - 스키마 정의
  - 클라이언트 설정

- **`packages/utils`**: 공통 유틸리티
  - 날짜 처리 (date-fns)
  - 문자열 조작
  - 배열/객체 유틸리티
  - 성능 최적화 함수

- **`packages/validation`**: 데이터 검증
  - Zod 스키마
  - React Hook Form 통합
  - 타입 안전성

## 🔧 설정 파일

### **TypeScript**

- `packages/tsconfig/base.json`: 기본 TypeScript 설정
- `packages/tsconfig/nextjs.json`: Next.js 전용 설정
- `packages/tsconfig/react-library.json`: React 라이브러리 설정

### **ESLint**

- `packages/eslint-config/index.js`: 기본 ESLint 설정
- `packages/eslint-config/next.js`: Next.js 전용 설정
- `packages/eslint-config/library.js`: 라이브러리 설정
- `packages/eslint-config/react-internal.js`: React 컴포넌트 설정

## 🚀 배포

### **Vercel (권장)**

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### **Docker**

```bash
# Docker 이미지 빌드
docker build -t your-app .

# 컨테이너 실행
docker run -p 3000:3000 your-app
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Prisma](https://www.prisma.io/)

---

**Happy Coding! 🎉**
