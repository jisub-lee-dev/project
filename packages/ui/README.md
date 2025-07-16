# @repo/ui

공유 UI 컴포넌트 라이브러리입니다. Radix UI와 Tailwind CSS를 기반으로 구축되었습니다.

## 특징

- 🎨 **Radix UI**: 접근성이 뛰어난 헤드리스 컴포넌트
- 🎯 **Tailwind CSS**: 유틸리티 우선 스타일링
- 📱 **반응형**: 모든 디바이스에서 완벽하게 작동
- ♿ **접근성**: WCAG 가이드라인 준수
- 🔧 **TypeScript**: 완전한 타입 안전성

## 사용법

```tsx
import { Button, Card, Input } from "@repo/ui";

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## 컴포넌트

### 기본 컴포넌트

- Button
- Input
- Card
- Badge
- Avatar

### 폼 컴포넌트

- Form
- FormField
- FormItem
- FormLabel
- FormControl
- FormMessage

### 레이아웃 컴포넌트

- Container
- Grid
- Flex
- Stack

## 개발

```bash
# 타입 체크
pnpm type-check

# 린트
pnpm lint

# 린트 자동 수정
pnpm lint:fix
```
