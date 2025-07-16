# @repo/db

Prisma 기반 데이터베이스 클라이언트와 스키마 정의를 제공합니다.

## 특징

- 🗄️ **Prisma ORM**: 타입 안전한 데이터베이스 액세스
- 🔄 **마이그레이션**: 스키마 버전 관리
- 🎯 **타입 생성**: 자동 TypeScript 타입 생성
- 🔍 **Prisma Studio**: 데이터베이스 GUI

## 사용법

```typescript
import { prisma } from "@repo/db";

// 사용자 생성
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});

// 사용자 조회
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: "@example.com",
    },
  },
});
```

## 스크립트

```bash
# Prisma 클라이언트 생성
pnpm db:generate

# 데이터베이스 스키마 푸시
pnpm db:push

# Prisma Studio 실행
pnpm db:studio

# 마이그레이션 생성 및 실행
pnpm db:migrate
```

## 환경 변수

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
```
