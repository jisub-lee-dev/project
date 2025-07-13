# Level 1: Todo Manager 📝

## 🎯 프로젝트 개요

**Todo Manager**는 모노레포 환경에서 기본적인 CRUD 작업과 상태 관리를 학습하기 위한 첫 번째 프로젝트입니다. 사용자가 할일을 생성, 조회, 수정, 삭제할 수 있는 웹 애플리케이션을 구축합니다.

## 📋 학습 목표

- ✅ **모노레포 구조** 이해 및 활용
- ✅ **기본 CRUD** 작업 구현
- ✅ **상태 관리** (React Query)
- ✅ **폼 처리** (React Hook Form + Zod)
- ✅ **인증 시스템** (NextAuth.js)
- ✅ **타입 안전성** 확보

## 🏗️ 프로젝트 구조

```
apps/
├── web/                    # 메인 웹 애플리케이션
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 홈페이지
│   │   │   ├── todos/      # 할일 관리 페이지
│   │   │   └── auth/       # 인증 페이지
│   │   └── components/     # 페이지별 컴포넌트
│   └── package.json
└── admin/                  # 관리자 대시보드 (선택사항)
    ├── src/
    │   └── app/
    └── package.json

packages/
├── db/                     # 데이터베이스 스키마
├── ui/                     # 공유 UI 컴포넌트
├── validation/             # 유효성 검사 스키마
└── utils/                  # 유틸리티 함수
```

## 🗄️ 데이터베이스 스키마

### User 모델
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  todos     Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Todo 모델
```prisma
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    Priority @default(MEDIUM)
  dueDate     DateTime?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 🚀 구현 단계

### 1주차: 기본 구조 및 CRUD

#### Day 1-2: 프로젝트 설정
- [ ] 데이터베이스 스키마 생성
- [ ] Prisma 클라이언트 설정
- [ ] 기본 UI 컴포넌트 생성 (Button, Input, Card)

#### Day 3-4: 기본 CRUD API
- [ ] Todo 생성 API (`POST /api/todos`)
- [ ] Todo 조회 API (`GET /api/todos`)
- [ ] Todo 수정 API (`PUT /api/todos/[id]`)
- [ ] Todo 삭제 API (`DELETE /api/todos/[id]`)

#### Day 5-7: 기본 UI 구현
- [ ] 할일 목록 페이지
- [ ] 할일 추가 폼
- [ ] 할일 수정/삭제 기능
- [ ] 완료 상태 토글

### 2주차: 고급 기능

#### Day 8-10: 인증 시스템
- [ ] NextAuth.js 설정
- [ ] 소셜 로그인 (Google, GitHub)
- [ ] 사용자별 할일 관리
- [ ] 보호된 라우트

#### Day 11-12: 상태 관리
- [ ] React Query 설정
- [ ] 서버 상태 관리
- [ ] 낙관적 업데이트
- [ ] 에러 처리

#### Day 13-14: 고급 기능
- [ ] 검색 및 필터링
- [ ] 우선순위별 정렬
- [ ] 마감일 알림
- [ ] 반응형 디자인

## 🛠️ 기술 스택

### 백엔드
- **Prisma**: 데이터베이스 ORM
- **Next.js API Routes**: REST API
- **NextAuth.js**: 인증 시스템
- **Zod**: 유효성 검사

### 프론트엔드
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **shadcn/ui**: UI 컴포넌트
- **Tailwind CSS**: 스타일링

### 공유 패키지
- **@repo/db**: 데이터베이스 클라이언트
- **@repo/validation**: Zod 스키마
- **@repo/ui**: 공유 컴포넌트
- **@repo/utils**: 유틸리티 함수

## 📝 구현 예시

### Todo 생성 API
```typescript
// apps/web/src/app/api/todos/route.ts
import { prisma } from '@repo/db';
import { TodoSchema } from '@repo/validation';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = TodoSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    const todo = await prisma.todo.create({
      data: {
        ...validatedData,
        userId: user!.id
      }
    });

    return Response.json({ success: true, data: todo });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Todo 목록 컴포넌트
```typescript
// apps/web/src/components/TodoList.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { TodoCard } from '@repo/ui';

export function TodoList() {
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('/api/todos');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div className="space-y-4">
      {todos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

## 🎨 UI/UX 가이드

### 디자인 원칙
- **심플함**: 복잡하지 않은 직관적인 인터페이스
- **반응형**: 모바일부터 데스크톱까지 모든 화면 크기 지원
- **접근성**: 키보드 네비게이션, 스크린 리더 지원

### 색상 팔레트
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

## 📊 성능 최적화

### 프론트엔드
- **React Query**: 서버 상태 캐싱
- **React.memo**: 불필요한 리렌더링 방지
- **Code Splitting**: 페이지별 코드 분할

### 백엔드
- **Prisma**: 데이터베이스 쿼리 최적화
- **Next.js**: 자동 코드 분할 및 최적화
- **Caching**: API 응답 캐싱

## 🧪 테스트 전략

### 단위 테스트
- **API 라우트**: 각 엔드포인트 테스트
- **컴포넌트**: UI 컴포넌트 테스트
- **유틸리티**: 헬퍼 함수 테스트

### 통합 테스트
- **사용자 플로우**: 전체 사용자 시나리오
- **API 통합**: 프론트엔드-백엔드 연동

## 🚀 배포

### 개발 환경
- **로컬**: `pnpm dev`
- **데이터베이스**: Docker PostgreSQL

### 프로덕션 환경
- **Vercel**: Next.js 앱 배포
- **PlanetScale**: 데이터베이스 호스팅
- **GitHub Actions**: CI/CD 파이프라인

## 📚 추가 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React Query 공식 문서](https://tanstack.com/query)
- [Prisma 공식 문서](https://www.prisma.io/docs)
- [NextAuth.js 공식 문서](https://next-auth.js.org/)

## 🎯 다음 단계

Level 1 완료 후 다음을 확인하세요:
- ✅ 모든 CRUD 기능이 정상 작동하는가?
- ✅ 인증 시스템이 안전하게 구현되었는가?
- ✅ 타입 안전성이 확보되었는가?
- ✅ 반응형 디자인이 적용되었는가?

**모든 항목이 완료되면 [Level 2: Blog Platform](./level-2-blog-platform.md)으로 진행하세요!**

---

**Happy Coding! 🚀** 