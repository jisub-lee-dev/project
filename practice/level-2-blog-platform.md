# Level 2: Blog Platform 📝

## 🎯 프로젝트 개요

**Blog Platform**은 마크다운 에디터, 파일 업로드, 검색 기능 등을 학습하기 위한 두 번째 프로젝트입니다. 사용자가 블로그 포스트를 작성하고, 이미지를 업로드하며, 콘텐츠를 검색할 수 있는 플랫폼을 구축합니다.

## 📋 학습 목표

- ✅ **마크다운 에디터** 구현 및 파싱
- ✅ **파일 업로드** 시스템 구축
- ✅ **검색 기능** 구현 (Full-text search)
- ✅ **댓글 시스템** 개발
- ✅ **SEO 최적화** 적용
- ✅ **콘텐츠 관리** 시스템

## 🏗️ 프로젝트 구조

```
apps/
├── web/                    # 블로그 사이트
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 홈페이지
│   │   │   ├── posts/      # 포스트 목록
│   │   │   ├── posts/[slug] # 포스트 상세
│   │   │   ├── write/      # 포스트 작성
│   │   │   └── search/     # 검색 페이지
│   │   └── components/     # 페이지별 컴포넌트
│   └── package.json
├── admin/                  # 콘텐츠 관리 대시보드
│   ├── src/
│   │   └── app/
│   └── package.json
└── api/                    # REST API 서버
    ├── src/
    └── package.json

packages/
├── db/                     # 데이터베이스 스키마
├── ui/                     # 공유 UI 컴포넌트
├── validation/             # 유효성 검사 스키마
├── utils/                  # 유틸리티 함수
└── markdown/               # 마크다운 처리 (새로 추가)
```

## 🗄️ 데이터베이스 스키마

### User 모델 (확장)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatar    String?
  bio       String?
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  AUTHOR
  ADMIN
}
```

### Post 모델
```prisma
model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String    @db.Text
  excerpt     String?
  published   Boolean   @default(false)
  featured    Boolean   @default(false)
  viewCount   Int       @default(0)
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  tags        Tag[]
  comments    Comment[]
  images      Image[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  publishedAt DateTime?
}
```

### Comment 모델
```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  parentId  String?
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Tag 모델
```prisma
model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]
}
```

### Image 모델
```prisma
model Image {
  id        String   @id @default(cuid())
  url       String
  alt       String?
  caption   String?
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
}
```

## 🚀 구현 단계

### 1주차: 기본 구조 및 마크다운

#### Day 1-2: 프로젝트 설정
- [ ] 데이터베이스 스키마 생성
- [ ] 마크다운 패키지 설정 (remark, rehype)
- [ ] 기본 UI 컴포넌트 생성

#### Day 3-4: 마크다운 에디터
- [ ] 마크다운 에디터 컴포넌트 구현
- [ ] 실시간 미리보기 기능
- [ ] 마크다운 파싱 및 렌더링

#### Day 5-7: 기본 CRUD API
- [ ] Post 생성/수정/삭제 API
- [ ] Post 조회 API (목록, 상세)
- [ ] Tag 관리 API

### 2주차: 고급 기능

#### Day 8-10: 파일 업로드
- [ ] 이미지 업로드 시스템 (Cloudinary)
- [ ] 드래그 앤 드롭 업로드
- [ ] 이미지 최적화 및 리사이징

#### Day 11-12: 검색 기능
- [ ] Full-text 검색 구현
- [ ] 태그별 필터링
- [ ] 검색 결과 하이라이팅

#### Day 13-14: 댓글 시스템
- [ ] 댓글 CRUD API
- [ ] 중첩 댓글 (대댓글)
- [ ] 실시간 댓글 업데이트

### 3주차: 최적화 및 배포

#### Day 15-17: SEO 및 성능
- [ ] 메타 태그 최적화
- [ ] Open Graph 설정
- [ ] 사이트맵 생성
- [ ] RSS 피드

#### Day 18-21: 관리자 기능
- [ ] 포스트 승인 시스템
- [ ] 사용자 관리
- [ ] 통계 대시보드
- [ ] 백업 및 복원

## 🛠️ 기술 스택

### 백엔드
- **Prisma**: 데이터베이스 ORM
- **Next.js API Routes**: REST API
- **Cloudinary**: 이미지 업로드 및 최적화
- **Zod**: 유효성 검사

### 프론트엔드
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **shadcn/ui**: UI 컴포넌트
- **Tailwind CSS**: 스타일링

### 마크다운 처리
- **remark**: 마크다운 파싱
- **rehype**: HTML 처리
- **react-markdown**: React 마크다운 렌더러

### 검색
- **Prisma Full-text search**: 데이터베이스 검색
- **Fuse.js**: 클라이언트 사이드 검색 (선택사항)

### 공유 패키지
- **@repo/db**: 데이터베이스 클라이언트
- **@repo/validation**: Zod 스키마
- **@repo/ui**: 공유 컴포넌트
- **@repo/utils**: 유틸리티 함수
- **@repo/markdown**: 마크다운 처리 (새로 추가)

## 📝 구현 예시

### 마크다운 에디터 컴포넌트
```typescript
// apps/web/src/components/MarkdownEditor.tsx
'use client';

import { useState } from 'react';
import { Button } from '@repo/ui';
import { processMarkdown } from '@repo/markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="border rounded-lg">
      <div className="flex border-b">
        <Button
          variant={!isPreview ? 'default' : 'ghost'}
          onClick={() => setIsPreview(false)}
        >
          편집
        </Button>
        <Button
          variant={isPreview ? 'default' : 'ghost'}
          onClick={() => setIsPreview(true)}
        >
          미리보기
        </Button>
      </div>
      
      <div className="p-4">
        {!isPreview ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 p-2 border rounded"
            placeholder="마크다운을 입력하세요..."
          />
        ) : (
          <div className="prose max-w-none">
            {processMarkdown(value)}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 이미지 업로드 컴포넌트
```typescript
// apps/web/src/components/ImageUpload.tsx
'use client';

import { useState } from 'react';
import { Button } from '@repo/ui';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const { url } = await response.json();
      onUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <Button disabled={isUploading}>
          {isUploading ? '업로드 중...' : '이미지 업로드'}
        </Button>
      </label>
    </div>
  );
}
```

### 검색 API
```typescript
// apps/web/src/app/api/posts/search/route.ts
import { prisma } from '@repo/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const tag = searchParams.get('tag');

  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          { published: true },
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ]
          } : {},
          tag ? {
            tags: {
              some: {
                slug: tag
              }
            }
          } : {}
        ]
      },
      include: {
        author: {
          select: { name: true, avatar: true }
        },
        tags: true,
        _count: {
          select: { comments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return Response.json({ success: true, data: posts });
  } catch (error) {
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}
```

## 🎨 UI/UX 가이드

### 디자인 원칙
- **가독성**: 긴 텍스트도 편안하게 읽을 수 있는 타이포그래피
- **직관성**: 마크다운 에디터와 미리보기 전환
- **반응형**: 모바일에서도 편리한 편집 경험

### 색상 팔레트
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

## 📊 성능 최적화

### 프론트엔드
- **React Query**: 포스트 캐싱 및 백그라운드 업데이트
- **Code Splitting**: 마크다운 에디터 지연 로딩
- **Image Optimization**: Next.js Image 컴포넌트 활용

### 백엔드
- **Prisma**: 데이터베이스 쿼리 최적화
- **Caching**: Redis를 통한 검색 결과 캐싱
- **CDN**: Cloudinary를 통한 이미지 전송 최적화

## 🧪 테스트 전략

### 단위 테스트
- **마크다운 파싱**: 다양한 마크다운 문법 테스트
- **이미지 업로드**: 파일 형식 및 크기 검증
- **검색 기능**: 정확한 검색 결과 확인

### 통합 테스트
- **포스트 작성 플로우**: 작성부터 발행까지
- **댓글 시스템**: 댓글 작성 및 중첩 댓글
- **검색 플로우**: 검색부터 결과 표시까지

## 🚀 배포

### 개발 환경
- **로컬**: `pnpm dev`
- **데이터베이스**: Docker PostgreSQL
- **이미지**: Cloudinary 개발 계정

### 프로덕션 환경
- **Vercel**: Next.js 앱 배포
- **PlanetScale**: 데이터베이스 호스팅
- **Cloudinary**: 이미지 호스팅
- **GitHub Actions**: CI/CD 파이프라인

## 📚 추가 학습 자료

- [remark 공식 문서](https://github.com/remarkjs/remark)
- [rehype 공식 문서](https://github.com/rehypejs/rehype)
- [Cloudinary 공식 문서](https://cloudinary.com/documentation)
- [Prisma Full-text search](https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search)

## 🎯 다음 단계

Level 2 완료 후 다음을 확인하세요:
- ✅ 마크다운 에디터가 정상 작동하는가?
- ✅ 이미지 업로드가 안전하게 구현되었는가?
- ✅ 검색 기능이 정확한 결과를 반환하는가?
- ✅ 댓글 시스템이 실시간으로 업데이트되는가?

**모든 항목이 완료되면 [Level 3: Portfolio Builder](./level-3-portfolio-builder.md)으로 진행하세요!**

---

**Happy Coding! 🚀** 