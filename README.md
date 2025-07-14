# Modern Monorepo Template (2025)

이 프로젝트는 **Turborepo + Next.js 15 + React 19 + shadcn/ui + Tailwind CSS v4 + Prisma + Zod** 등 2025년 최신 스택을 반영한 모노레포 템플릿입니다.

## ✨ 주요 특징

- 🚀 **최신 기술 스택**: Next.js 15, React 19, Tailwind CSS v4
- 🏗️ **모노레포 구조**: Turborepo 기반의 효율적인 패키지 관리
- 🎨 **UI 시스템**: shadcn/ui + Radix UI 기반의 접근성 높은 컴포넌트
- 🔒 **타입 안전성**: TypeScript + Zod 기반의 엔드-투-엔드 타입 안전성
- 🗄️ **데이터베이스**: Prisma ORM + PostgreSQL
- ⚡ **개발 경험**: 빠른 빌드, Hot Reload, 자동 린팅

## 🏗️ 실제 폴더 구조 (2025 최신화)

```
project/
├── apps/
│   └── web/                 # Next.js 웹 애플리케이션 (App Router)
│       ├── src/
│       │   └── app/         # Next.js App Router 구조
│       │       ├── page.tsx
│       │       ├── layout.tsx
│       │       ├── globals.css
│       │       └── favicon.ico
│       ├── public/          # 정적 파일
│       ├── package.json     # web 앱 설정
│       ├── tsconfig.json    # TypeScript 설정 (@repo/tsconfig/nextjs.json 확장)
│       ├── eslint.config.mjs # ESLint Flat Config
│       ├── next.config.ts   # Next.js 설정
│       ├── postcss.config.mjs
│       ├── tailwind.config.ts
│       └── .env.local.example # NextAuth.js 환경 변수 예시
├── packages/
│   ├── tsconfig/           # TypeScript 설정 공유 패키지
│   │   ├── base.json       # 기본 설정
│   │   ├── nextjs.json     # Next.js 전용 설정
│   │   └── react-library.json # React 라이브러리 설정
│   ├── eslint-config/      # ESLint 설정 공유 패키지
│   │   ├── library.js      # 라이브러리용 설정
│   │   ├── next.js         # Next.js용 설정
│   │   └── react-internal.js # React 내부 설정
│   ├── db/                 # Prisma 데이터베이스 공유 패키지
│   │   ├── package.json
│   │   ├── index.ts        # src/index.ts re-export
│   │   ├── src/
│   │   │   ├── index.ts    # 모든 모듈 re-export
│   │   │   ├── client/
│   │   │   │   ├── client.ts # Prisma 클라이언트 싱글톤
│   │   │   │   └── index.ts
│   │   │   ├── models/
│   │   │   │   └── index.ts # 향후 도메인별 모델 추가 예정
│   │   │   └── migrations/
│   │   │       └── index.ts
│   │   └── prisma/
│   │       └── schema.prisma # 데이터베이스 스키마
│   ├── ui/                 # UI 컴포넌트 공유 패키지
│   │   ├── package.json
│   │   ├── index.ts        # src/index.ts re-export
│   │   ├── components.json # shadcn/ui 설정
│   │   ├── scripts/
│   │   │   └── fix-imports.js # import 경로 수정 스크립트
│   │   └── src/
│   │       ├── index.ts    # 모든 컴포넌트 re-export
│   │       ├── components/
│   │       │   └── ui/     # shadcn/ui 컴포넌트들
│   │       └── lib/
│   │           └── utils.ts
│   ├── validation/         # Zod 유효성 검증 공유 패키지
│   │   ├── package.json
│   │   ├── index.ts        # src/index.ts re-export
│   │   └── src/
│   │       ├── index.ts    # 모든 도메인 스키마 re-export
│   │       ├── product/
│   │       │   ├── schemas.ts
│   │       │   └── index.ts
│   │       ├── user/
│   │       │   ├── schemas.ts
│   │       │   └── index.ts
│   │       ├── auth/
│   │       │   ├── schemas.ts
│   │       │   └── index.ts
│   │       └── common/
│   │           ├── schemas.ts
│   │           └── index.ts
│   └── utils/              # 유틸리티 공유 패키지
│       ├── package.json
│       ├── index.ts        # src/index.ts re-export
│       └── src/
│           ├── index.ts    # 도메인별 유틸리티 re-export
│           ├── date/
│           │   ├── utils.ts
│           │   └── index.ts
│           ├── string/
│           │   ├── utils.ts
│           │   └── index.ts
│           ├── array/
│           │   ├── utils.ts
│           │   └── index.ts
│           ├── object/
│           │   ├── utils.ts
│           │   └── index.ts
│           ├── cookie/
│           │   ├── utils.ts
│           │   └── index.ts
│           ├── id/
│           │   ├── utils.ts
│           │   └── index.ts
│           └── performance/
│               ├── utils.ts
│               └── index.ts
├── docs/                   # 프로젝트 문서
├── tasks/                  # 개발 작업 가이드
├── package.json            # 루트 package.json
├── pnpm-workspace.yaml     # pnpm 워크스페이스 설정
├── turbo.json              # Turborepo 설정
├── docker-compose.yml      # PostgreSQL 데이터베이스
├── .env.example            # 루트 환경 변수 예시
└── README.md               # 이 파일
```

## 📦 주요 패키지 및 기술스택 (2025 최신화)

### ⚡ 빌드/런타임
- **Turborepo**: 모노레포 빌드 시스템
- **pnpm 10.12.4**: 패키지 매니저
- **Next.js 15.3.5**: React 프레임워크 (App Router)
- **TypeScript 5.3.3**: 타입 안전성
- **React 19.1.0**: 최신 React 버전

### 🎨 UI/UX 라이브러리
- **shadcn/ui**: 복사 가능한 UI 컴포넌트 라이브러리
- **Radix UI**: 접근성 중심 헤드리스 UI 컴포넌트
- **Framer Motion 12.23.3**: React 애니메이션 라이브러리
- **Lucide React 0.525.0**: 아이콘 라이브러리
- **Tailwind CSS v4.1.11**: 유틸리티 우선 CSS 프레임워크
- **tw-animate-css 1.3.5**: Tailwind 애니메이션

### 🔍 유효성 검증
- **Zod**: TypeScript-first 스키마 검증
- **React Hook Form 7.60.0**: 고성능 폼 라이브러리
- **@hookform/resolvers 5.1.1**: Zod 등과 `react-hook-form`을 연결

### 🗄️ 데이터베이스
- **Prisma**: TypeScript ORM
- **PostgreSQL**: 관계형 데이터베이스 (Docker)

### 🛠️ 유틸리티
- **class-variance-authority**: 컴포넌트 변형 관리
- **clsx**: 조건부 클래스명
- **tailwind-merge**: Tailwind 클래스 병합

## 🛠️ 공유 패키지 사용법 (2025 최신화)

### @repo/db
```typescript
// Prisma 클라이언트 사용
import { prisma } from '@repo/db';

// 도메인별 모델 사용 (구현 예정)
// import { UserModel, ProductModel } from '@repo/db';

// 사용 예시
const users = await prisma.user.findMany();
```

### @repo/ui
```typescript
// 컴포넌트 사용
import { Button, Card, Input } from '@repo/ui';

// shadcn/ui 컴포넌트 추가
pnpm dlx shadcn@latest add button --cwd packages/ui
pnpm --filter=@repo/ui fix-imports
```

### @repo/validation
```typescript
// 스키마 사용
import { UserSchema, ProductSchema } from '@repo/validation';

// React Hook Form과 연동
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const form = useForm({
  resolver: zodResolver(UserSchema),
});
```

### @repo/utils
```typescript
// 유틸리티 사용
import { formatDate, chunk, generateId } from '@repo/utils';

// 도메인별 유틸리티
import { formatDate } from '@repo/utils/date';
import { chunk } from '@repo/utils/array';
```

## 🚀 개발 환경 설정

### 1. 사전 요구사항
- **Node.js v24.x**
- **pnpm 10.12.4**
- **Docker & Docker Compose**

### 2. 초기 설정
```bash
# 1. 저장소 클론
git clone <repository-url>
cd project

# 2. 데이터베이스 실행
docker compose up -d

# 3. 환경 변수 설정
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local

# 4. NextAuth.js 시크릿 생성
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# 생성된 값을 apps/web/.env.local의 NEXTAUTH_SECRET에 설정

# 5. 의존성 설치
pnpm install

# 6. 데이터베이스 스키마 동기화
pnpm --filter=@repo/db db:push
```

## 📚 모노레포 개발 규칙 (2025 최신화)

### 🏛️ 핵심 원칙
- **Monorepo First**: 새로운 기능은 packages/ 내 공유 모듈로 우선 고려
- **엄격한 관심사 분리**: 각 패키지는 명확한 단일 책임
- **중앙화된 설정**: TypeScript/ESLint 설정은 @repo/tsconfig, @repo/eslint-config에서 관리

### 📂 파일 구조 규칙
- **UI 컴포넌트**: 재사용 가능한 모든 컴포넌트는 packages/ui에 생성
- **데이터베이스**: 스키마는 packages/db/prisma/schema.prisma에서만 수정
- **유효성 검증**: 도메인별 스키마는 packages/validation/src/[도메인]/에 작성
- **유틸리티**: 도메인별 함수는 packages/utils/src/[도메인]/에 작성
- **새로운 앱 추가**: apps/ 디렉토리에 새로운 Next.js 앱 추가 가능

### 💻 기술 스택 규칙
- **Next.js 15**: App Router 우선, Server Components 기본
- **React 19**: 새로운 기능 적극 활용
- **Tailwind CSS v4**: 최신 기능 활용
- **API 응답**: `{ success: true, data }` 또는 `{ success: false, error }` 구조 통일
- **폼**: react-hook-form + zod 조합 필수

## 🛠️ 주요 명령어 (2025 최신화)

### 개발 명령어
```bash
# 전체 개발 서버 실행
pnpm dev

# 특정 앱 개발 서버 실행
pnpm --filter=web dev

# 빌드
pnpm build

# 린트
pnpm lint

# 포맷팅
pnpm format
```

### 패키지별 명령어
```bash
# 타입 체크
pnpm --filter=@repo/ui type-check
pnpm --filter=@repo/db type-check
pnpm --filter=@repo/utils type-check
pnpm --filter=@repo/validation type-check

# Prisma 관련
pnpm --filter=@repo/db db:generate
pnpm --filter=@repo/db db:push
pnpm --filter=@repo/db db:studio
pnpm --filter=@repo/db db:migrate

# shadcn/ui 컴포넌트 추가
pnpm dlx shadcn@latest add [component] --cwd packages/ui
pnpm --filter=@repo/ui fix-imports
```

### 유지보수 명령어
```bash
# 캐시 정리
pnpm clean

# 의존성 재설치
pnpm install

# 전체 정리 및 재설치
pnpm clean && pnpm install
```

## 🐛 문제 해결 (2025 최신화)

### TypeScript/ESLint 오류
```bash
# 1. 중앙 설정 확인
# 2. IDE TypeScript 서버 재시작
# 3. 캐시 정리
pnpm clean && pnpm install
```

### shadcn/ui import 경로 오류
```bash
# 자동 수정
pnpm --filter=@repo/ui fix-imports

# 수동 수정 (필요시)
# @/lib/utils → ../../lib/utils
# @/components/ui/ → ./
```

### React 19 호환성 문제
```bash
# 타입 정의 업데이트
pnpm add -D @types/react@^19.1.8 @types/react-dom@^19.1.6
```

### 의존성 충돌
```bash
# 가장 먼저 시도
pnpm clean && pnpm install
```

## 🚀 빠른 시작

```bash
# 1. 템플릿 사용
npx create-turbo@latest my-app --template=your-template-name

# 2. 또는 직접 클론
git clone <repository-url>
cd my-app

# 3. 개발 환경 설정
docker compose up -d
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local
pnpm install
pnpm --filter=@repo/db db:push

# 4. 개발 서버 실행
pnpm dev
```

## 🤝 기여하기

이 템플릿에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

**이 템플릿으로 멋진 프로젝트를 만들어보세요! 🚀**

---

## 📊 템플릿 통계

- ⭐ **GitHub Stars**: [![GitHub stars](https://img.shields.io/github/stars/your-username/your-repo?style=social)](https://github.com/your-username/your-repo)
- 📦 **npm downloads**: [![npm](https://img.shields.io/npm/dm/your-template-name)](https://www.npmjs.com/package/your-template-name)
- 🔄 **Last updated**: ![GitHub last commit](https://img.shields.io/github/last-commit/your-username/your-repo)
