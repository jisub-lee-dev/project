# @repo/db

**타입 안전한** 데이터베이스 클라이언트 및 스키마 관리 패키지입니다. Prisma ORM을 기반으로 구축되었습니다.

## ✨ 특징

- 🔒 **Prisma ORM**: 100% 타입 안전한 데이터베이스 클라이언트
- 🐘 **PostgreSQL**: 프로덕션 준비된 관계형 데이터베이스
- 📋 **스키마 관리**: 버전 관리되는 데이터베이스 스키마
- 🔄 **마이그레이션**: 자동화된 데이터베이스 마이그레이션
- 🎯 **TypeScript**: 완전한 타입 안전성
- 🛡️ **검증**: Zod 스키마와 통합된 데이터 검증
- 🔍 **Prisma Studio**: 직관적인 데이터베이스 GUI

## 🚀 빠른 시작

### 기본 사용법

```typescript
import { db } from "@repo/db";
import { userSchema } from "@repo/validation";

// 사용자 조회
const users = await db.user.findMany({
  where: {
    active: true,
  },
  include: {
    profile: true,
  },
});

// 새 사용자 생성 (검증 포함)
const userData = userSchema.parse({
  email: "user@example.com",
  name: "홍길동",
});

const newUser = await db.user.create({
  data: userData,
});
```

### 트랜잭션 사용

```typescript
import { db } from "@repo/db";

const result = await db.$transaction(async tx => {
  const user = await tx.user.create({
    data: {
      email: "user@example.com",
      name: "홍길동",
    },
  });

  const profile = await tx.profile.create({
    data: {
      userId: user.id,
      bio: "안녕하세요!",
    },
  });

  return { user, profile };
});
```

## 🗄️ 데이터베이스 관리

### 개발 명령어

```bash
# Prisma 클라이언트 생성
pnpm db:generate

# 스키마를 데이터베이스에 푸시 (개발용)
pnpm db:push

# Prisma Studio 실행 (데이터베이스 GUI)
pnpm db:studio

# 마이그레이션 생성 및 실행
pnpm db:migrate
```

### 환경 설정

```bash
# 환경 변수 설정 (.env 파일)
DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
```

## 📊 스키마 구조

데이터베이스 스키마는 `prisma/schema.prisma`에 정의되어 있습니다.

### 기본 설정

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 모델 예시

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // 관계
  profile   Profile?
  posts     Post[]

  @@map("users")
}

model Profile {
  id     String  @id @default(cuid())
  bio    String?
  avatar String?
  userId String  @unique

  // 관계
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}
```

## 🔧 고급 사용법

### 커스텀 쿼리

```typescript
import { db } from "@repo/db";

// Raw SQL 쿼리
const result = await db.$queryRaw`
  SELECT * FROM users 
  WHERE created_at > ${new Date("2024-01-01")}
`;

// 집계 쿼리
const stats = await db.user.aggregate({
  _count: {
    id: true,
  },
  _avg: {
    age: true,
  },
});
```

### 페이지네이션

```typescript
const posts = await db.post.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: {
    createdAt: "desc",
  },
});
```

## 🛠️ 개발 가이드

### 스키마 변경 워크플로우

1. **스키마 수정**: `prisma/schema.prisma` 파일 편집
2. **마이그레이션 생성**: `pnpm db:migrate`
3. **클라이언트 재생성**: `pnpm db:generate`
4. **타입 확인**: TypeScript 컴파일 확인

### 시드 데이터

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "관리자",
      profile: {
        create: {
          bio: "시스템 관리자입니다.",
        },
      },
    },
  });

  console.log("시드 데이터 생성 완료:", user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## 🔒 보안 고려사항

### SQL 인젝션 방지

- Prisma는 자동으로 SQL 인젝션을 방지합니다
- Raw 쿼리 사용 시 매개변수화된 쿼리 사용

### 접근 제어

```typescript
// 현재 사용자의 데이터만 조회
const userPosts = await db.post.findMany({
  where: {
    authorId: currentUserId,
  },
});
```

## 📈 성능 최적화

### 인덱스 최적화

```prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  name  String

  // 복합 인덱스
  @@index([name, email])
}
```

### 쿼리 최적화

```typescript
// N+1 문제 해결
const usersWithPosts = await db.user.findMany({
  include: {
    posts: true, // 한 번의 쿼리로 관련 데이터 로드
  },
});
```

## 📚 추가 리소스

- [Prisma 문서](https://www.prisma.io/docs)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)
- [데이터베이스 설계 가이드](https://www.prisma.io/dataguide/)

---

**안전하고 효율적인 데이터 관리를 시작하세요! 🗄️**
