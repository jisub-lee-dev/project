# @repo/validation

Zod 기반 데이터 검증 스키마와 React Hook Form 통합을 제공합니다.

## 특징

- ✅ **Zod 스키마**: 타입 안전한 데이터 검증
- 📝 **React Hook Form**: 폼 상태 관리 통합
- 🔄 **자동 타입 추론**: TypeScript 타입 자동 생성
- 🌐 **국제화**: 다국어 에러 메시지 지원

## 사용법

```typescript
import { userSchema, createUserSchema } from "@repo/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 폼에서 사용
function UserForm() {
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      age: 0,
    },
  });

  const onSubmit = (data: CreateUserInput) => {
    // 타입 안전한 데이터 처리
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}

// 서버에서 검증
function validateUser(data: unknown) {
  const result = userSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data; // 타입 안전한 데이터
}
```

## 스키마

### 사용자 관련

- `userSchema`: 사용자 데이터 검증
- `createUserSchema`: 사용자 생성 데이터 검증
- `updateUserSchema`: 사용자 업데이트 데이터 검증

### 인증 관련

- `loginSchema`: 로그인 데이터 검증
- `registerSchema`: 회원가입 데이터 검증
- `resetPasswordSchema`: 비밀번호 재설정 검증

### 공통 스키마

- `emailSchema`: 이메일 검증
- `passwordSchema`: 비밀번호 검증
- `phoneSchema`: 전화번호 검증
