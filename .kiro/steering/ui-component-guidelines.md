---
inclusion: fileMatch
fileMatchPattern: "packages/ui/**/*"
---

# UI 컴포넌트 개발 가이드

## 컴포넌트 구조

### 기본 템플릿

```typescript
import { forwardRef } from "react";
import { cn } from "../../lib/utils"; // UI 패키지 내부에서
import { type VariantProps, cva } from "class-variance-authority";

const componentVariants = cva(
  "기본 클래스들",
  {
    variants: {
      variant: {
        default: "기본 스타일",
        secondary: "보조 스타일",
      },
      size: {
        sm: "작은 크기",
        md: "중간 크기",
        lg: "큰 크기",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ComponentProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof componentVariants> & {
    // 추가 props
  };

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
```

### 실제 파일 구조

```
packages/ui/src/
├── components/
│   └── ui/                   # shadcn/ui 컴포넌트들
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts              # cn 함수 구현
└── index.ts                  # 모든 컴포넌트 export
```

**현재 구현된 컴포넌트들:**

- Badge, Button, Calendar, Card, Checkbox
- Form, Input, Label, Popover, Progress
- Select, Separator, Textarea

## 스타일링 규칙

### Tailwind CSS 사용법

- 유틸리티 클래스 우선 사용
- 커스텀 CSS는 최소화
- 반응형 디자인 고려 (`sm:`, `md:`, `lg:` 등)
- 다크모드 지원 (`dark:` 접두사)

### Class Variance Authority (CVA)

- 컴포넌트 변형은 CVA로 관리
- 기본값 설정 필수
- 타입 안전성 보장

### 색상 시스템

```typescript
// 기본 색상 팔레트 사용
const colors = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
};
```

## 접근성 (A11y) 요구사항

### 필수 속성

- `aria-label` 또는 `aria-labelledby`
- `role` 속성 (필요시)
- `tabIndex` 관리
- 키보드 네비게이션 지원

### 키보드 지원

```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case "Enter":
    case " ":
      // 활성화 로직
      break;
    case "Escape":
      // 닫기 로직
      break;
    case "ArrowDown":
    case "ArrowUp":
      // 네비게이션 로직
      break;
  }
};
```

### 포커스 관리

- 포커스 가능한 요소에 적절한 포커스 스타일
- 포커스 트랩 구현 (모달, 드롭다운 등)
- 논리적 탭 순서 유지

## 컴포넌트 타입

### Props 타입 정의

```typescript
// 기본 HTML 속성 확장
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

// 제네릭 타입 사용 (필요시)
export type SelectProps<T> = {
  value?: T;
  onValueChange?: (value: T) => void;
  options: Array<{ label: string; value: T }>;
};
```

### Ref 전달

- `forwardRef` 사용 필수
- 적절한 HTML 요소 타입 지정
- `displayName` 설정

## 상태 관리

### 내부 상태

```typescript
const [isOpen, setIsOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState<string>();

// 제어/비제어 패턴
const isControlled = value !== undefined;
const internalValue = isControlled ? value : selectedValue;
```

### 이벤트 핸들링

```typescript
const handleClick = (event: React.MouseEvent) => {
  // 내부 로직
  setIsOpen(!isOpen);

  // 외부 핸들러 호출
  onClick?.(event);
};
```

## 성능 최적화

### 메모이제이션

```typescript
// 비용이 큰 계산
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(props);
}, [props.dependency]);

// 콜백 메모이제이션
const handleCallback = useCallback(
  (value: string) => {
    onValueChange?.(value);
  },
  [onValueChange]
);
```

### 지연 로딩

```typescript
// 큰 컴포넌트는 지연 로딩
const HeavyComponent = lazy(() => import("./heavy-component"));

// 조건부 렌더링
{showHeavyComponent && (
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
)}
```

## 테스트 가이드

### 테스트 구조

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    fireEvent.keyDown(button, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 접근성 테스트

```typescript
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("should not have accessibility violations", async () => {
  const { container } = render(<Button>Accessible button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 문서화

### JSDoc 주석

````typescript
/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   클릭하세요
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", ...props }, ref) => {
    // 구현
  }
);
````

### README 작성

각 컴포넌트 폴더에 README.md 포함:

- 사용법 예시
- Props 설명
- 접근성 정보
- 디자인 토큰 정보

## 품질 체크리스트

### 개발 완료 전 확인사항

- [ ] TypeScript 타입 에러 없음
- [ ] ESLint 경고 없음
- [ ] 접근성 요구사항 충족
- [ ] 키보드 네비게이션 동작
- [ ] 다크모드 지원
- [ ] 반응형 디자인 확인
- [ ] 테스트 코드 작성
- [ ] 문서화 완료
