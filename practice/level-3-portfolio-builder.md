# Level 3: Portfolio Builder 🎨

## 🎯 프로젝트 개요

**Portfolio Builder**는 드래그 앤 드롭, 실시간 편집, 템플릿 시스템 등을 학습하기 위한 세 번째 프로젝트입니다. 사용자가 드래그 앤 드롭으로 포트폴리오를 만들고, 실시간으로 미리보기하며, 다양한 템플릿을 선택할 수 있는 플랫폼을 구축합니다.

## 📋 학습 목표

- ✅ **드래그 앤 드롭** 인터페이스 구현
- ✅ **실시간 미리보기** 시스템 구축
- ✅ **템플릿 시스템** 개발
- ✅ **컴포넌트 라이브러리** 구축
- ✅ **실시간 협업** 기능
- ✅ **배포 및 호스팅** 시스템

## 🏗️ 프로젝트 구조

```
apps/
├── web/                    # 포트폴리오 사이트
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 홈페이지
│   │   │   ├── portfolio/[id] # 포트폴리오 뷰어
│   │   │   └── templates/  # 템플릿 갤러리
│   │   └── components/     # 페이지별 컴포넌트
│   └── package.json
├── builder/                # 포트폴리오 빌더
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 빌더 메인
│   │   │   ├── editor/     # 에디터 페이지
│   │   │   └── preview/    # 미리보기 페이지
│   │   └── components/     # 빌더 컴포넌트
│   └── package.json
├── admin/                  # 템플릿 관리 대시보드
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
├── builder-core/           # 빌더 핵심 로직 (새로 추가)
├── templates/              # 템플릿 라이브러리 (새로 추가)
└── components/             # 포트폴리오 컴포넌트 (새로 추가)
```

## 🗄️ 데이터베이스 스키마

### User 모델 (확장)
```prisma
model User {
  id          String      @id @default(cuid())
  email       String      @unique
  name        String?
  avatar      String?
  bio         String?
  role        Role        @default(USER)
  portfolios  Portfolio[]
  templates   Template[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum Role {
  USER
  DESIGNER
  ADMIN
}
```

### Portfolio 모델
```prisma
model Portfolio {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  viewCount   Int      @default(0)
  templateId  String
  template    Template @relation(fields: [templateId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  sections    Section[]
  settings    Json?    // 포트폴리오 설정
  customDomain String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  publishedAt DateTime?
}
```

### Template 모델
```prisma
model Template {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  description String?
  thumbnail   String
  category    Category
  isPremium   Boolean     @default(false)
  isActive    Boolean     @default(true)
  config      Json        // 템플릿 설정
  sections    Section[]
  portfolios  Portfolio[]
  creatorId   String
  creator     User        @relation(fields: [creatorId], references: [id])
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum Category {
  PERSONAL
  BUSINESS
  CREATIVE
  TECHNICAL
  MINIMAL
}
```

### Section 모델
```prisma
model Section {
  id          String    @id @default(cuid())
  type        SectionType
  title       String?
  content     Json      // 섹션 데이터
  order       Int
  isVisible   Boolean   @default(true)
  portfolioId String
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  templateId  String?
  template    Template? @relation(fields: [templateId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum SectionType {
  HERO
  ABOUT
  SKILLS
  PROJECTS
  EXPERIENCE
  EDUCATION
  CONTACT
  CUSTOM
}
```

## 🚀 구현 단계

### 1주차: 기본 구조 및 드래그 앤 드롭

#### Day 1-2: 프로젝트 설정
- [ ] 데이터베이스 스키마 생성
- [ ] 드래그 앤 드롭 라이브러리 설정 (react-beautiful-dnd)
- [ ] 기본 UI 컴포넌트 생성

#### Day 3-4: 드래그 앤 드롭 시스템
- [ ] 드래그 앤 드롭 인터페이스 구현
- [ ] 섹션 추가/삭제/이동 기능
- [ ] 드롭존 및 드래그 프리뷰

#### Day 5-7: 기본 CRUD API
- [ ] Portfolio 생성/수정/삭제 API
- [ ] Section 관리 API
- [ ] Template 관리 API

### 2주차: 실시간 편집 및 미리보기

#### Day 8-10: 실시간 편집
- [ ] 실시간 에디터 컴포넌트
- [ ] 자동 저장 기능
- [ ] 변경사항 추적

#### Day 11-12: 실시간 미리보기
- [ ] 미리보기 모드 구현
- [ ] 실시간 업데이트
- [ ] 반응형 미리보기

#### Day 13-14: 템플릿 시스템
- [ ] 템플릿 갤러리
- [ ] 템플릿 적용 기능
- [ ] 커스텀 템플릿 생성

### 3주차: 고급 기능

#### Day 15-17: 컴포넌트 라이브러리
- [ ] 재사용 가능한 섹션 컴포넌트
- [ ] 컴포넌트 설정 패널
- [ ] 컴포넌트 스타일링

#### Day 18-19: 실시간 협업
- [ ] WebSocket 연결
- [ ] 실시간 편집 동기화
- [ ] 사용자 커서 표시

#### Day 20-21: 배포 및 호스팅
- [ ] 커스텀 도메인 설정
- [ ] 정적 사이트 생성
- [ ] CDN 최적화

## 🛠️ 기술 스택

### 백엔드
- **Prisma**: 데이터베이스 ORM
- **Next.js API Routes**: REST API
- **WebSocket**: 실시간 통신
- **Zod**: 유효성 검사

### 프론트엔드
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **shadcn/ui**: UI 컴포넌트
- **Tailwind CSS**: 스타일링

### 드래그 앤 드롭
- **react-beautiful-dnd**: 드래그 앤 드롭
- **@dnd-kit/core**: 모던 드래그 앤 드롭 (대안)

### 실시간 기능
- **Socket.io**: WebSocket 통신
- **Y.js**: 실시간 협업 (선택사항)

### 공유 패키지
- **@repo/db**: 데이터베이스 클라이언트
- **@repo/validation**: Zod 스키마
- **@repo/ui**: 공유 컴포넌트
- **@repo/utils**: 유틸리티 함수
- **@repo/builder-core**: 빌더 핵심 로직 (새로 추가)
- **@repo/templates**: 템플릿 라이브러리 (새로 추가)
- **@repo/components**: 포트폴리오 컴포넌트 (새로 추가)

## 📝 구현 예시

### 드래그 앤 드롭 섹션 관리
```typescript
// apps/builder/src/components/SectionManager.tsx
'use client';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Button } from '@repo/ui';

interface Section {
  id: string;
  type: string;
  title: string;
  order: number;
}

export function SectionManager({ sections, onReorder, onAdd, onDelete }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.title}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(section.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

### 실시간 에디터 컴포넌트
```typescript
// apps/builder/src/components/LiveEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@repo/utils';
import { useMutation } from '@tanstack/react-query';

interface LiveEditorProps {
  portfolioId: string;
  initialData: any;
}

export function LiveEditor({ portfolioId, initialData }: LiveEditorProps) {
  const [data, setData] = useState(initialData);
  const debouncedData = useDebounce(data, 1000);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`/api/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });

  useEffect(() => {
    if (debouncedData !== initialData) {
      saveMutation.mutate(debouncedData);
    }
  }, [debouncedData]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">편집기</h3>
        {/* 편집 폼들 */}
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">미리보기</h3>
        {/* 실시간 미리보기 */}
      </div>
    </div>
  );
}
```

### 템플릿 적용 시스템
```typescript
// packages/templates/src/index.ts
export interface Template {
  id: string;
  name: string;
  category: string;
  config: TemplateConfig;
  sections: SectionConfig[];
}

export interface TemplateConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  layout: {
    maxWidth: string;
    spacing: string;
  };
}

export function applyTemplate(portfolio: any, template: Template) {
  return {
    ...portfolio,
    templateId: template.id,
    settings: template.config,
    sections: template.sections.map((section, index) => ({
      ...section,
      order: index,
      portfolioId: portfolio.id,
    })),
  };
}
```

## 🎨 UI/UX 가이드

### 디자인 원칙
- **직관성**: 드래그 앤 드롭이 자연스럽게 작동
- **반응성**: 모든 상호작용에 즉각적인 피드백
- **유연성**: 다양한 템플릿과 커스터마이징 옵션

### 색상 팔레트
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

## 📊 성능 최적화

### 프론트엔드
- **React Query**: 포트폴리오 데이터 캐싱
- **React.memo**: 불필요한 리렌더링 방지
- **Code Splitting**: 템플릿별 코드 분할

### 백엔드
- **Prisma**: 데이터베이스 쿼리 최적화
- **WebSocket**: 효율적인 실시간 통신
- **CDN**: 정적 자산 전송 최적화

## 🧪 테스트 전략

### 단위 테스트
- **드래그 앤 드롭**: 섹션 재정렬 테스트
- **템플릿 적용**: 템플릿 변환 테스트
- **실시간 저장**: 자동 저장 기능 테스트

### 통합 테스트
- **포트폴리오 생성 플로우**: 템플릿 선택부터 발행까지
- **실시간 협업**: 다중 사용자 편집
- **배포 플로우**: 커스텀 도메인 설정

## 🚀 배포

### 개발 환경
- **로컬**: `pnpm dev`
- **데이터베이스**: Docker PostgreSQL
- **WebSocket**: Socket.io 개발 서버

### 프로덕션 환경
- **Vercel**: Next.js 앱 배포
- **PlanetScale**: 데이터베이스 호스팅
- **Socket.io**: 실시간 서버
- **Cloudflare**: 커스텀 도메인 및 CDN

## 📚 추가 학습 자료

- [react-beautiful-dnd 공식 문서](https://github.com/atlassian/react-beautiful-dnd)
- [@dnd-kit 공식 문서](https://dndkit.com/)
- [Socket.io 공식 문서](https://socket.io/docs/)
- [Y.js 공식 문서](https://docs.yjs.dev/)

## 🎯 다음 단계

Level 3 완료 후 다음을 확인하세요:
- ✅ 드래그 앤 드롭이 부드럽게 작동하는가?
- ✅ 실시간 미리보기가 정확히 업데이트되는가?
- ✅ 템플릿 시스템이 유연하게 작동하는가?
- ✅ 커스텀 도메인이 정상적으로 설정되는가?

**모든 항목이 완료되면 [Level 4: Learning Platform](./level-4-learning-platform.md)으로 진행하세요!**

---

**Happy Coding! 🚀** 