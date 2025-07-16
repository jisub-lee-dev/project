---
inclusion: fileMatch
fileMatchPattern: "packages/db/**/*"
---

# 데이터베이스 개발 가이드

## Prisma 스키마 설계

### 기본 원칙

- 명확하고 일관된 네이밍 사용
- 관계 설정 시 성능 고려
- 인덱스 적절히 활용
- 데이터 무결성 보장

### 모델 정의 템플릿

```prisma
model User {
  // 기본 필드
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // 비즈니스 필드
  email     String   @unique
  name      String
  avatar    String?
  isActive  Boolean  @default(true)

  // 관계
  posts     Post[]
  profile   Profile?

  // 인덱스
  @@index([email])
  @@index([createdAt])
  @@map("users")
}

model Profile {
  id     String  @id @default(cuid())
  bio    String?
  userId String  @unique
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}

model Post {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  title     String
  content   String   @db.Text
  published Boolean  @default(false)

  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  tags      Tag[]

  @@index([authorId])
  @@index([published, createdAt])
  @@map("posts")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]

  @@map("tags")
}
```

### 네이밍 규칙

- **모델명**: PascalCase (User, BlogPost)
- **필드명**: camelCase (firstName, createdAt)
- **테이블명**: snake_case (users, blog_posts) - `@@map` 사용
- **관계명**: 복수형 사용 (posts, comments)

### 데이터 타입 선택

```prisma
// 문자열
name     String           // VARCHAR(191)
content  String  @db.Text // TEXT
slug     String  @db.VarChar(100) // VARCHAR(100)

// 숫자
age      Int              // INTEGER
price    Decimal @db.Decimal(10, 2) // DECIMAL(10,2)
rating   Float            // DOUBLE

// 날짜/시간
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
birthDate DateTime @db.Date

// 불린
isActive  Boolean @default(true)

// JSON (PostgreSQL)
metadata  Json?

// 열거형
enum UserRole {
  USER
  ADMIN
  MODERATOR
}

role UserRole @default(USER)
```

## 관계 설계

### 일대일 관계

```prisma
model User {
  id      String   @id @default(cuid())
  profile Profile?
}

model Profile {
  id     String @id @default(cuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 일대다 관계

```prisma
model User {
  id    String @id @default(cuid())
  posts Post[]
}

model Post {
  id       String @id @default(cuid())
  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

### 다대다 관계

```prisma
model Post {
  id   String @id @default(cuid())
  tags Tag[]
}

model Tag {
  id    String @id @default(cuid())
  posts Post[]
}

// 또는 명시적 중간 테이블
model PostTag {
  postId String
  tagId  String
  post   Post   @relation(fields: [postId], references: [id])
  tag    Tag    @relation(fields: [tagId], references: [id])

  @@id([postId, tagId])
}
```

### 삭제 동작 설정

```prisma
// Cascade: 부모 삭제 시 자식도 삭제
author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

// Restrict: 자식이 있으면 부모 삭제 불가
author User @relation(fields: [authorId], references: [id], onDelete: Restrict)

// SetNull: 부모 삭제 시 외래키를 NULL로 설정
author User? @relation(fields: [authorId], references: [id], onDelete: SetNull)
```

## 인덱스 최적화

### 단일 컬럼 인덱스

```prisma
model User {
  email String @unique  // 자동으로 인덱스 생성
  name  String

  @@index([name])       // 명시적 인덱스
}
```

### 복합 인덱스

```prisma
model Post {
  authorId  String
  published Boolean
  createdAt DateTime

  // 복합 인덱스 - 순서 중요!
  @@index([published, createdAt])
  @@index([authorId, published])
}
```

### 부분 인덱스 (PostgreSQL)

```prisma
model Post {
  published Boolean
  title     String

  // 게시된 포스트만 인덱싱
  @@index([title], where: { published: true })
}
```

## 마이그레이션 관리

### 개발 환경

```bash
# 스키마 변경 후 개발 DB에 적용
pnpm db:push

# Prisma 클라이언트 재생성
pnpm db:generate
```

### 프로덕션 환경

```bash
# 마이그레이션 파일 생성
pnpm db:migrate dev --name add_user_profile

# 프로덕션 마이그레이션 적용
pnpm db:migrate deploy
```

### 마이그레이션 파일 예시

```sql
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");
```

## 쿼리 최적화

### 효율적인 데이터 로딩

```typescript
// 필요한 필드만 선택
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // password 제외
  },
});

// 관계 데이터 포함
const usersWithPosts = await db.user.findMany({
  include: {
    posts: {
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    },
  },
});

// 조건부 포함
const userWithConditionalData = await db.user.findUnique({
  where: { id },
  include: {
    posts: includesPosts,
    profile: includesProfile,
  },
});
```

### 페이지네이션

```typescript
// 오프셋 기반 페이지네이션
async function getUsersPaginated(page: number, limit: number) {
  const [users, total] = await Promise.all([
    db.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.user.count(),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// 커서 기반 페이지네이션 (더 효율적)
async function getUsersCursor(cursor?: string, limit: number = 10) {
  const users = await db.user.findMany({
    take: limit + 1, // 다음 페이지 존재 여부 확인용
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const hasNextPage = users.length > limit;
  const data = hasNextPage ? users.slice(0, -1) : users;

  return {
    users: data,
    nextCursor: hasNextPage ? data[data.length - 1].id : null,
  };
}
```

### 집계 쿼리

```typescript
// 기본 집계
const stats = await db.user.aggregate({
  _count: { id: true },
  _avg: { age: true },
  _sum: { points: true },
  where: { isActive: true },
});

// 그룹별 집계
const postsByAuthor = await db.post.groupBy({
  by: ["authorId"],
  _count: { id: true },
  having: {
    id: { _count: { gt: 5 } }, // 5개 이상 포스트를 가진 작성자만
  },
});
```

## 트랜잭션

### 기본 트랜잭션

```typescript
async function transferPoints(
  fromUserId: string,
  toUserId: string,
  amount: number
) {
  return await db.$transaction(async tx => {
    // 송신자 포인트 차감
    const fromUser = await tx.user.update({
      where: { id: fromUserId },
      data: { points: { decrement: amount } },
    });

    if (fromUser.points < 0) {
      throw new Error("Insufficient points");
    }

    // 수신자 포인트 증가
    await tx.user.update({
      where: { id: toUserId },
      data: { points: { increment: amount } },
    });

    // 거래 기록 생성
    await tx.transaction.create({
      data: {
        fromUserId,
        toUserId,
        amount,
        type: "TRANSFER",
      },
    });
  });
}
```

### 배치 작업

```typescript
async function createMultipleUsers(userData: CreateUserData[]) {
  return await db.$transaction(
    userData.map(data =>
      db.user.create({
        data,
      })
    )
  );
}

// 또는 createMany 사용 (더 효율적)
async function createUsersInBatch(userData: CreateUserData[]) {
  return await db.user.createMany({
    data: userData,
    skipDuplicates: true, // 중복 시 건너뛰기
  });
}
```

## 데이터 시딩

### 시드 스크립트

```typescript
// packages/db/seed.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // 기본 사용자 생성
  const adminUser = await db.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  // 테스트 데이터 생성
  const testUsers = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      db.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          name: `Test User ${i + 1}`,
          posts: {
            create: [
              {
                title: `Post ${i + 1}`,
                content: `Content for post ${i + 1}`,
                published: Math.random() > 0.5,
              },
            ],
          },
        },
      })
    )
  );

  console.log(`Created ${testUsers.length} test users`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
```

### package.json 스크립트

```json
{
  "scripts": {
    "db:seed": "tsx seed.ts",
    "db:reset": "prisma migrate reset --force && npm run db:seed"
  }
}
```

## 성능 모니터링

### 쿼리 로깅

```typescript
// packages/db/index.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
  ],
});

// 쿼리 로깅
db.$on("query", e => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});

export { db };
```

### 연결 풀 설정

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?connection_limit=20&pool_timeout=20"
```

## 백업 및 복구

### 정기 백업 스크립트

```bash
#!/bin/bash
# scripts/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_NAME="myapp"

mkdir -p $BACKUP_DIR

# PostgreSQL 백업
pg_dump $DATABASE_URL > "$BACKUP_DIR/backup_$DATE.sql"

# 오래된 백업 파일 정리 (7일 이상)
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql"
```

## 보안 고려사항

### 민감한 데이터 처리

```prisma
model User {
  id       String @id @default(cuid())
  email    String @unique
  password String // 해시된 비밀번호만 저장

  // 민감한 정보는 별도 테이블로 분리
  sensitiveData SensitiveUserData?
}

model SensitiveUserData {
  id     String @id @default(cuid())
  userId String @unique
  ssn    String? // 암호화된 주민번호
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 접근 제어

```typescript
// RLS (Row Level Security) 활용 예시
// PostgreSQL에서 사용자별 데이터 접근 제한

// 사용자는 자신의 데이터만 조회 가능
const userPosts = await db.post.findMany({
  where: {
    authorId: currentUserId, // 항상 현재 사용자 ID로 필터링
  },
});
```

## 테스트

### 데이터베이스 테스트 설정

```typescript
// packages/db/test-setup.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

export async function setupTestDb() {
  // 테스트 데이터 초기화
  await db.$executeRaw`TRUNCATE TABLE "users" CASCADE`;
  await db.$executeRaw`TRUNCATE TABLE "posts" CASCADE`;
}

export async function teardownTestDb() {
  await db.$disconnect();
}

export { db as testDb };
```

### 테스트 예시

```typescript
import { testDb, setupTestDb, teardownTestDb } from "./test-setup";

describe("User model", () => {
  beforeEach(async () => {
    await setupTestDb();
  });

  afterAll(async () => {
    await teardownTestDb();
  });

  it("should create a user", async () => {
    const user = await testDb.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
      },
    });

    expect(user.email).toBe("test@example.com");
    expect(user.id).toBeDefined();
  });

  it("should enforce unique email constraint", async () => {
    await testDb.user.create({
      data: { email: "test@example.com", name: "User 1" },
    });

    await expect(
      testDb.user.create({
        data: { email: "test@example.com", name: "User 2" },
      })
    ).rejects.toThrow();
  });
});
```
