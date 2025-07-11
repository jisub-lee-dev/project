# Project (Monorepo)

이 프로젝트는 **Turborepo + pnpm + Next.js + shadcn/ui + zod + framer-motion** 등  
2025년 최신 프론트엔드 스택을 반영한 모노레포 환경입니다.

## 🏗️ 실제 폴더 구조

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
│       ├── tsconfig.json    # TypeScript 설정
│       ├── .eslintrc.json   # ESLint 설정
│       ├── next.config.mjs   # Next.js 설정
│       ├── postcss.config.mjs
│       └── next-env.d.ts
├── packages/
│   ├── tsconfig/           # TypeScript 설정 공유 패키지
│   │   ├── package.json
│   │   ├── base.json       # 기본 TypeScript 설정
│   │   ├── nextjs.json     # Next.js 전용 설정
│   │   └── react-library.json
│   ├── eslint-config/      # ESLint 설정 공유 패키지
│   │   ├── package.json
│   │   ├── library.js
│   │   ├── next.js         # Next.js 전용 ESLint 설정
│   │   └── react-internal.js
│   ├── db/                 # Prisma 데이터베이스 공유 패키지
│   │   ├── package.json
│   │   ├── index.ts        # Prisma 클라이언트 export
│   │   └── prisma/
│   │       └── schema.prisma # 데이터베이스 스키마
│   ├── ui/                 # UI 컴포넌트 공유 패키지
│   │   ├── package.json    # shadcn/ui, radix, framer-motion
│   │   ├── tsconfig.json
│   │   └── .eslintrc.json
│   ├── validation/         # 유효성 검증 공유 패키지
│   │   ├── package.json    # zod, react-hook-form
│   │   ├── tsconfig.json
│   │   └── .eslintrc.json
│   └── utils/              # 유틸리티 공유 패키지
│       ├── package.json    # date-fns, lodash-es 등
│       ├── tsconfig.json
│       └── .eslintrc.json
├── package.json            # 루트 package.json
├── pnpm-workspace.yaml     # pnpm 워크스페이스 설정
├── turbo.json              # Turborepo 설정 (tasks 사용)
├── .gitignore              # Git 무시 파일
└── README.md               # 이 파일
```

## 📦 주요 패키지 및 기술스택

### ⚡ 빌드/런타임
- **Turborepo**: 모노레포 빌드 시스템
- **pnpm**: 패키지 매니저
- **Next.js 15+**: React 프레임워크
- **TypeScript 5+**: 타입 안전성

### 🎨 UI/UX 라이브러리
- **shadcn/ui**: 복사 가능한 UI 컴포넌트 라이브러리
- **Radix UI**: 접근성 중심 헤드리스 UI 컴포넌트
- **Framer Motion**: React 애니메이션 라이브러리
- **Lucide React**: 아이콘 라이브러리
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### 🔍 유효성 검증
- **Zod**: TypeScript-first 스키마 검증
- **React Hook Form**: 고성능 폼 라이브러리
- **@hookform/resolvers**: Zod 등과 `react-hook-form`을 연결

### 🛠️ 유틸리티
- **Date-fns**: 날짜 처리 라이브러리
- **Lodash-es**: ES 모듈을 지원하는 유틸리티 함수 라이브러리
- **UUID**: 고유 ID 생성
- **Crypto-js**: 암호화 라이브러리
- **JS-Cookie**: 쿠키 관리

### 🗄️ 데이터베이스
- **Prisma**: TypeScript ORM
- **PostgreSQL**: 관계형 데이터베이스

## 🚀 시작하기

### 사전 요구사항

- **Node.js** v24.x
- **pnpm** v10.x 이상
- **Git**
- **Docker** (로컬 데이터베이스 사용 시)

### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. 개발 서버 실행
pnpm dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 웹 애플리케이션을 확인할 수 있습니다.

### 로컬 데이터베이스 실행 (Docker)

이 프로젝트는 개발용 PostgreSQL 데이터베이스를 Docker로 실행할 수 있도록 `docker-compose.yml` 파일을 제공합니다.

1.  컴퓨터에 [Docker](https://www.docker.com/products/docker-desktop/)가 설치 및 실행 중인지 확인하세요.
2.  프로젝트 루트에서 다음 명령어를 실행하여 데이터베이스를 시작합니다.
    ```bash
    docker-compose up -d
    ```
3.  데이터베이스 스키마를 적용하려면 다음 명령어를 실행하세요.
    ```bash
    pnpm --filter=@repo/db db:push
    ```
4.  데이터베이스를 중지하려면 다음 명령어를 사용합니다.
    ```bash
    docker-compose down
    ```

## 📦 사용 가능한 스크립트

### 루트 레벨 명령어

```bash
# 개발 서버 실행 (모든 앱)
pnpm dev

# 빌드 (모든 앱)
pnpm build

# 린트 검사 (모든 앱)
pnpm lint

# 코드 포맷팅 (Prettier)
pnpm format

# 정리 (node_modules, dist, .turbo 등 캐시 삭제)
pnpm clean
```

### 특정 앱/패키지 명령어

Turborepo의 `--filter` 플래그를 사용하여 특정 앱이나 패키지에서만 명령을 실행할 수 있습니다.

```bash
# web 앱만 개발 서버 실행
pnpm dev --filter=web

# web 앱만 빌드
pnpm build --filter=web

# db 패키지의 Prisma 명령어
pnpm --filter=@repo/db db:generate
pnpm --filter=@repo/db db:push
pnpm --filter=@repo/db db:studio
pnpm --filter=@repo/db db:migrate

# ui 패키지 린트
pnpm lint --filter=@repo/ui

# validation 패키지 타입 체크
pnpm type-check --filter=@repo/validation
```

## 🛠️ 공유 패키지 사용법

### @repo/tsconfig

TypeScript 설정을 공유하는 패키지입니다.

**사용법:**
```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/tsconfig/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

**포함된 설정:**
- `base.json` - 모든 패키지에 적용되는 기본 TypeScript 설정
- `nextjs.json` - Next.js 앱 전용 설정
- `react-library.json` - React 라이브러리 패키지 전용 설정

### @repo/eslint-config

ESLint 설정을 공유하는 패키지입니다.

**사용법:**
```json
// apps/web/.eslintrc.json
{
  "root": true,
  "extends": ["@repo/eslint-config/next.js"]
}
```

**포함된 파일:**
- `next.js` - Next.js 앱 전용 ESLint 설정
- `library.js` - 일반 라이브러리 패키지 전용 설정
- `react-internal.js` - React 기반 라이브러리 패키지 전용 설정

### @repo/db

Prisma 데이터베이스 설정을 공유하는 패키지입니다.

**사용법:**
```typescript
// 데이터베이스 클라이언트 사용
// @repo/db는 싱글톤 Prisma Client 인스턴스를 export합니다.
import { prisma } from '@repo/db';

// 예시: await prisma.user.findMany();
```

**현재 스키마 모델:**
- `User` - 사용자 모델 (id, email, name, password, createdAt, updatedAt)

### @repo/ui

`shadcn/ui` 기반의 UI 컴포넌트를 공유하는 패키지입니다.

**사용법:**
```tsx
// 컴포넌트 사용
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';

function MyComponent() {
  return <Button>클릭하세요</Button>;
}
```

**새로운 컴포넌트 추가:**

`@repo/ui` 패키지에 새로운 `shadcn/ui` 컴포넌트를 추가하려면, **프로젝트 루트 디렉토리**에서 다음 명령어를 실행하세요.

```bash
pnpm dlx shadcn@latest add [component-name] --cwd packages/ui
```
이 명령어는 `packages/ui` 디렉토리에 컴포넌트를 직접 추가합니다.

### @repo/validation

`zod`를 사용한 유효성 검증 스키마를 공유하는 패키지입니다.

**사용법:**
```typescript
// Zod 스키마 정의 및 사용
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

// React Hook Form과 함께 사용
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(LoginSchema),
});
```

### @repo/utils

여러 프로젝트에서 공통으로 사용되는 유틸리티 함수를 공유합니다.

**사용법:**
```typescript
import { format } from 'date-fns';
import { debounce } from 'lodash-es';

console.log(format(new Date(), "yyyy-MM-dd"));
```

## 🔧 새로운 앱/패키지 추가

### Next.js 앱 추가

```bash
# 1. apps 폴더에 새로운 Next.js 앱 생성
pnpm create next-app@latest apps/[앱이름] --ts --tailwind --eslint --app --src-dir --import-alias="@/*"

# 2. 생성된 앱의 package.json에 공유 패키지 의존성 추가
# "@repo/tsconfig": "workspace:*"
# "@repo/eslint-config": "workspace:*"
# ... 등 필요한 패키지 추가

# 3. 설정 파일 연결
# tsconfig.json: "extends": "@repo/tsconfig/nextjs.json"
# .eslintrc.json: "extends": ["@repo/eslint-config/next.js"]

# 4. 루트에서 의존성 재설치
pnpm install
```

### 라이브러리 패키지 추가

```bash
# 1. packages 폴더에 디렉토리 생성
mkdir packages/[라이브러리이름]
cd packages/[라이브러리이름]

# 2. package.json 생성 및 설정 (pnpm init)
# 3. tsconfig.json 생성 및 설정 ("extends": "@repo/tsconfig/react-library.json")
# 4. .eslintrc.json 생성 및 설정 ("extends": ["@repo/eslint-config/library.js"])
# 5. 루트에서 의존성 재설치
pnpm install
```

## 🌐 환경 변수 설정

### 데이터베이스 연결

프로젝트 루트의 `.env.example` 파일을 복사하여 `.env` 파일을 생성하세요. 이 파일은 `docker-compose.yml`에서 사용하는 데이터베이스 환경변수를 설정하는 데 사용됩니다.

```bash
cp .env.example .env
```

`.env.example` 파일의 내용은 다음과 같습니다. 이 값들은 `docker-compose.yml`의 기본값과 일치합니다. 만약 설정을 변경했거나 다른 데이터베이스를 사용한다면, 생성된 `.env` 파일의 값을 수정해주세요.

```env
# .env

# PostgreSQL Database connection for Docker and Prisma
# These values are used by docker-compose.yml and the DATABASE_URL below.
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb

# Full database connection string for Prisma.
# It reads the variables from above to connect to the PostgreSQL container.
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
```

### 앱별 환경 변수

각 앱(`apps/web` 등)의 루트에 `.env.local` 파일을 생성하여 해당 앱에서만 사용할 환경 변수를 설정할 수 있습니다.

## 🚀 배포

### Vercel 배포

Vercel은 모노레포 구조를 자동으로 감지합니다. Git 저장소를 Vercel에 연결하면, 루트 디렉토리 설정만으로 쉽게 배포할 수 있습니다.

1.  **Vercel 프로젝트 생성**: Git 저장소를 Vercel에 import합니다.
2.  **루트 디렉토리 설정**: 배포하려는 앱 (e.g., `apps/web`)을 루트 디렉토리로 지정합니다.
3.  **빌드 설정**: Vercel이 Next.js를 감지하고 빌드 설정을 자동으로 구성합니다.

## 🐛 문제 해결

### 1. `eslint-plugin-turbo` 관련 `TypeError` 발생 시
`pnpm lint` 실행 시 `TypeError: Cannot convert undefined or null to object` 오류가 발생한다면, `eslint-config-turbo`의 버전 문제일 가능성이 높습니다.

-   **원인**: 오래된 `eslint-config-turbo` (v1.x)와 최신 Turborepo 환경 간의 호환성 문제.
-   **해결책**:
    1.  `packages/eslint-config/package.json`에서 `eslint-config-turbo`를 최신 버전으로 업데이트합니다.
    2.  `pnpm install`을 실행합니다.
    3.  `packages/eslint-config/library.js`의 `extends` 배열에서 `"eslint-config-turbo"`를 `"turbo"`로 수정합니다.

### 2. ESLint 파싱 오류 (`Parsing error: The keyword 'export' is reserved`)
-   **원인**: ESLint가 TypeScript 문법을 제대로 해석하지 못하는 경우입니다.
-   **해결책**: `packages/eslint-config/library.js` 파일에 다음 두 가지 설정이 올바르게 추가되었는지 확인합니다.
    ```javascript
    module.exports = {
      // ...
      parser: "@typescript-eslint/parser", // 1. 파서 지정
      extends: [
        "plugin:@typescript-eslint/recommended", // 2. TS 추천 규칙 추가
        // ...
      ],
      // ...
    };
    ```

### 3. TypeScript 버전 지원 경고
`pnpm lint` 실행 시 `WARNING: You are currently running a version of TypeScript which is not officially supported...` 경고가 나타날 수 있습니다.

-   **원인**: 프로젝트에 설치된 TypeScript 버전이 `@typescript-eslint/parser`가 공식적으로 지원하는 버전보다 높은 경우입니다.
-   **영향**: 대부분의 경우 정상 작동하지만, 일부 최신 TypeScript 문법에서 예기치 않은 오류가 발생할 수 있습니다.
-   **해결책**: 당장 조치할 필요는 없지만, 문제가 발생하면 `@typescript-eslint/` 관련 패키지들을 최신 버전으로 업데이트하는 것을 고려해 보세요.

### 4. 의존성 또는 캐시 문제
오류의 원인을 알 수 없을 때 시도해 볼 수 있는 일반적인 해결책입니다.

```bash
# 1. 모든 캐시 및 node_modules 삭제
pnpm clean

# 2. 의존성 재설치
pnpm install
```

## 📚 추가 리소스

- [Turborepo 공식 문서](https://turbo.build/repo/docs)
- [pnpm 공식 문서](https://pnpm.io/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Zod 공식 문서](https://zod.dev/)

## 🤝 기여하기

1. 이 저장소를 포크(Fork)합니다.
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**Happy Coding! 🚀**
