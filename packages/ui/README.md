# @repo/ui

**프로덕션 준비 완료된** UI 컴포넌트 라이브러리입니다. 접근성과 사용성을 최우선으로 설계되었습니다.

## ✨ 특징

- 🎨 **Radix UI**: 접근성이 뛰어난 헤드리스 컴포넌트
- 🎯 **Tailwind CSS v4**: 최신 유틸리티 기반 스타일링
- 📱 **완전 반응형**: 모든 디바이스 완벽 지원
- ♿ **WCAG 준수**: 웹 접근성 가이드라인 준수
- 🔧 **TypeScript**: 100% 타입 안전성
- 🎭 **다크모드**: 자동 다크/라이트 모드 지원
- 🚀 **성능 최적화**: Tree-shaking 및 번들 최적화

## 🚀 빠른 시작

### 설치

```bash
# 이미 워크스페이스에 포함되어 있습니다
pnpm --filter your-app add @repo/ui
```

### 기본 사용법

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@repo/ui";

export function MyComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>환영합니다!</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg" className="w-full">
          시작하기
        </Button>
      </CardContent>
    </Card>
  );
}
```

## 📦 컴포넌트 카테고리

### 🔘 기본 컴포넌트

- **Button** - 다양한 변형과 크기
- **Input** - 텍스트 입력 필드
- **Textarea** - 멀티라인 텍스트 입력
- **Label** - 폼 라벨
- **Badge** - 상태 표시 배지
- **Avatar** - 사용자 아바타

### 📋 폼 컴포넌트

- **Form** - React Hook Form 통합
- **FormField** - 폼 필드 래퍼
- **FormItem** - 폼 아이템 컨테이너
- **FormLabel** - 폼 라벨
- **FormControl** - 폼 컨트롤
- **FormMessage** - 에러/도움말 메시지
- **Select** - 드롭다운 선택
- **Checkbox** - 체크박스
- **RadioGroup** - 라디오 버튼 그룹
- **Switch** - 토글 스위치

### 🗂️ 레이아웃 컴포넌트

- **Card** - 카드 컨테이너
- **Separator** - 구분선
- **Accordion** - 접을 수 있는 콘텐츠
- **Tabs** - 탭 인터페이스
- **ScrollArea** - 스크롤 영역
- **AspectRatio** - 비율 유지 컨테이너

### 💬 피드백 컴포넌트

- **Dialog** - 모달 다이얼로그
- **AlertDialog** - 확인 다이얼로그
- **Toast** - 알림 메시지
- **Tooltip** - 툴팁
- **Popover** - 팝오버
- **HoverCard** - 호버 카드
- **Progress** - 진행률 표시

### 🎛️ 고급 컴포넌트

- **DropdownMenu** - 드롭다운 메뉴
- **ContextMenu** - 컨텍스트 메뉴
- **NavigationMenu** - 네비게이션 메뉴
- **Menubar** - 메뉴바
- **DatePicker** - 날짜 선택기
- **Slider** - 슬라이더

## 🎨 스타일링 시스템

### 변형 (Variants)

```tsx
// Button 변형 예시
<Button variant="default">기본</Button>
<Button variant="destructive">삭제</Button>
<Button variant="outline">아웃라인</Button>
<Button variant="secondary">보조</Button>
<Button variant="ghost">고스트</Button>
<Button variant="link">링크</Button>
```

### 크기 (Sizes)

```tsx
// 크기 변형 예시
<Button size="sm">작음</Button>
<Button size="default">기본</Button>
<Button size="lg">큼</Button>
<Button size="icon">아이콘</Button>
```

### 커스텀 스타일링

```tsx
import { cn } from "@repo/ui/lib/utils";

<Button
  className={cn(
    "custom-class",
    "hover:bg-custom-color",
    condition && "conditional-class"
  )}
>
  커스텀 버튼
</Button>;
```

## 🔧 개발 가이드

### 로컬 개발

````bash
# 패키지 빌드
pnpm build

# 타입 체크
pnpm type-check

# 린팅
pnpm lint

# 린팅 자동 수정
pnpm lint:fix


### 새 컴포넌트 추가

1. **컴포넌트 생성**: `src/components/ui/` 에 새 컴포넌트 파일 생성
2. **타입 정의**: TypeScript 인터페이스 정의
3. **스타일 적용**: CVA를 사용한 변형 정의
4. **Export 추가**: `src/components/ui/index.ts` 에 export 추가
5. **문서화**: JSDoc 주석 추가


### 컴포넌트 구조 예시

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
````

## 🎬 애니메이션 (Framer Motion)

### 기본 사용법

```tsx
import { motion } from "framer-motion";
import { Button } from "@repo/ui";

// 컴포넌트 애니메이션
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <Button>애니메이션 버튼</Button>
</motion.div>

// 호버 애니메이션
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>인터랙티브 버튼</Button>
</motion.div>
```

### shadcn 컴포넌트 추가

```bash
# 새 컴포넌트 추가
pnpm dlx shadcn@latest add [컴포넌트명] --cwd packages/ui

# 예시: Dialog 컴포넌트 추가
pnpm dlx shadcn@latest add dialog --cwd packages/ui

# 추가 후 packages/ui/src/index.ts에 export 추가 필요:
# export * from "./components/ui/dialog";
```

## 🎯 베스트 프랙티스

### 접근성

- 모든 인터랙티브 요소에 적절한 ARIA 속성 사용
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 준수

### 성능

- React.memo 사용으로 불필요한 리렌더링 방지
- forwardRef 사용으로 ref 전달 지원
- Tree-shaking을 위한 개별 export

### 일관성

- 통일된 네이밍 컨벤션
- 일관된 props 인터페이스
- 표준화된 스타일 변형

## 📚 추가 리소스

- [Radix UI 문서](https://www.radix-ui.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [CVA 문서](https://cva.style/)
- [React Hook Form 문서](https://react-hook-form.com/)

## 🤝 기여하기

새로운 컴포넌트나 개선사항이 있으시면 언제든 기여해주세요!

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성
3. 컴포넌트 개발 및 테스트
4. Pull Request 생성

---

**아름답고 접근 가능한 UI를 만들어보세요! ✨**
