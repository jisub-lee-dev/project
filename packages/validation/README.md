# @repo/validation

**타입 안전한** 데이터 검증 스키마 라이브러리입니다. Zod와 React Hook Form을 완벽하게 통합하여 클라이언트와 서버에서 일관된 검증을 제공합니다.

## ✨ 특징

- ✅ **Zod 스키마**: 런타임 타입 안전성과 검증
- 📝 **React Hook Form**: 완벽한 폼 통합
- 🔄 **자동 타입 추론**: TypeScript 타입 자동 생성
- 🌐 **국제화**: 한국어/영어 에러 메시지 지원
- 🛡️ **보안**: XSS 방지 및 데이터 정제
- 🎯 **일관성**: 클라이언트/서버 동일한 검증 로직
- ⚡ **성능**: Tree-shaking 지원

## 🚀 빠른 시작

### React Hook Form과 함께 사용

```typescript
import { userCreateSchema, type UserCreateInput } from "@repo/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function UserForm() {
  const form = useForm<UserCreateInput>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      email: "",
      name: "",
      age: 18,
    },
  });

  const onSubmit = (data: UserCreateInput) => {
    // 타입 안전한 데이터 - 이미 검증됨
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        {...form.register("email")}
        placeholder="이메일"
      />
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}

      <input
        {...form.register("name")}
        placeholder="이름"
      />
      {form.formState.errors.name && (
        <p>{form.formState.errors.name.message}</p>
      )}

      <button type="submit">제출</button>
    </form>
  );
}
```

### 서버에서 검증

```typescript
import { userCreateSchema } from "@repo/validation";

// API 라우트에서 사용
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 데이터 검증
    const validatedData = userCreateSchema.parse(body);

    // 검증된 데이터로 사용자 생성
    const user = await createUser(validatedData);

    return Response.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }

    return Response.json({ error: "서버 오류" }, { status: 500 });
  }
}
```

### 안전한 파싱

```typescript
import { userSchema } from "@repo/validation";

function processUserData(data: unknown) {
  const result = userSchema.safeParse(data);

  if (!result.success) {
    console.error("검증 실패:", result.error.errors);
    return null;
  }

  // 타입 안전한 데이터
  return result.data;
}
```

## 📦 스키마 카테고리

### 👤 사용자 관련 스키마

```typescript
import {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  type User,
  type UserCreateInput,
  type UserUpdateInput,
} from "@repo/validation";

// 기본 사용자 스키마
const user: User = {
  id: "cuid",
  email: "user@example.com",
  name: "홍길동",
  age: 25,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 사용자 생성 스키마
const createData: UserCreateInput = {
  email: "new@example.com",
  name: "김철수",
  age: 30,
};

// 사용자 업데이트 스키마 (부분 업데이트)
const updateData: UserUpdateInput = {
  name: "김영희", // 이름만 업데이트
};
```

### 🔐 인증 관련 스키마

```typescript
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
  type LoginInput,
  type RegisterInput,
} from "@repo/validation";

// 로그인
const loginData: LoginInput = {
  email: "user@example.com",
  password: "securePassword123!",
};

// 회원가입
const registerData: RegisterInput = {
  email: "new@example.com",
  password: "securePassword123!",
  passwordConfirm: "securePassword123!",
  name: "홍길동",
  agreeToTerms: true,
};

// 비밀번호 재설정
const resetData = {
  email: "user@example.com",
};

// 비밀번호 변경
const changeData = {
  currentPassword: "oldPassword123!",
  newPassword: "newPassword123!",
  newPasswordConfirm: "newPassword123!",
};
```

### 📝 게시물 관련 스키마

```typescript
import {
  postSchema,
  postCreateSchema,
  postUpdateSchema,
  commentSchema,
  type Post,
  type PostCreateInput,
} from "@repo/validation";

// 게시물 생성
const postData: PostCreateInput = {
  title: "제목입니다",
  content: "내용입니다",
  tags: ["태그1", "태그2"],
  published: false,
};

// 댓글 생성
const commentData = {
  content: "댓글 내용입니다",
  postId: "post-id",
};
```

### 🏢 공통 스키마

```typescript
import {
  emailSchema,
  passwordSchema,
  phoneSchema,
  urlSchema,
  slugSchema,
} from "@repo/validation";

// 개별 필드 검증
const email = emailSchema.parse("user@example.com");
const password = passwordSchema.parse("securePassword123!");
const phone = phoneSchema.parse("010-1234-5678");
const url = urlSchema.parse("https://example.com");
const slug = slugSchema.parse("my-blog-post");
```

## 🛠️ 고급 사용법

### 커스텀 에러 메시지

```typescript
import { z } from "zod";

const customUserSchema = z.object({
  email: z
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .min(1, "이메일은 필수입니다"),
  name: z
    .string()
    .min(2, "이름은 최소 2글자 이상이어야 합니다")
    .max(50, "이름은 최대 50글자까지 가능합니다"),
  age: z
    .number()
    .min(0, "나이는 0 이상이어야 합니다")
    .max(150, "나이는 150 이하여야 합니다"),
});
```

### 조건부 검증

```typescript
import { z } from "zod";

const conditionalSchema = z
  .object({
    type: z.enum(["individual", "business"]),
    name: z.string(),
    businessNumber: z.string().optional(),
  })
  .refine(
    data => {
      // 사업자인 경우 사업자번호 필수
      if (data.type === "business") {
        return data.businessNumber && data.businessNumber.length > 0;
      }
      return true;
    },
    {
      message: "사업자 유형인 경우 사업자번호는 필수입니다",
      path: ["businessNumber"],
    }
  );
```

### 변환 (Transform)

```typescript
import { z } from "zod";

const transformSchema = z.object({
  email: z
    .string()
    .email()
    .transform(val => val.toLowerCase()),
  name: z.string().transform(val => val.trim()),
  tags: z.string().transform(val => val.split(",").map(tag => tag.trim())),
});

const result = transformSchema.parse({
  email: "USER@EXAMPLE.COM",
  name: "  홍길동  ",
  tags: "태그1, 태그2, 태그3",
});
// {
//   email: "user@example.com",
//   name: "홍길동",
//   tags: ["태그1", "태그2", "태그3"]
// }
```

### 배열 검증

```typescript
import { z } from "zod";

const arraySchema = z.object({
  users: z.array(userSchema).min(1, "최소 1명의 사용자가 필요합니다"),
  tags: z.array(z.string()).max(10, "태그는 최대 10개까지 가능합니다"),
  categories: z.array(z.enum(["tech", "design", "business"])),
});
```

## 🎯 폼 통합 패턴

### 재사용 가능한 폼 훅

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateSchema, type UserCreateInput } from "@repo/validation";

export function useUserForm() {
  return useForm<UserCreateInput>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      email: "",
      name: "",
      age: 18,
    },
    mode: "onChange", // 실시간 검증
  });
}

// 컴포넌트에서 사용
function UserForm() {
  const form = useUserForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}
```

### 에러 처리 컴포넌트

```typescript
import { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: FieldError;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;

  return (
    <p className="text-sm text-red-600 mt-1">
      {error.message}
    </p>
  );
}

// 사용
<FormError error={form.formState.errors.email} />
```

## 🔧 개발 가이드

### 새 스키마 추가

1. **스키마 정의**: `src/schemas/` 에 새 스키마 파일 생성
2. **타입 추출**: `z.infer`를 사용한 타입 정의
3. **Export 추가**: `src/index.ts`에 export 추가
4. **테스트 작성**: 검증 로직 테스트
5. **문서 업데이트**: README에 사용 예시 추가

### 스키마 구조 예시

```typescript
// src/schemas/product.ts
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "상품명은 필수입니다"),
  price: z.number().positive("가격은 양수여야 합니다"),
  description: z.string().optional(),
  categoryId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productCreateSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const productUpdateSchema = productCreateSchema.partial();

// 타입 추출
export type Product = z.infer<typeof productSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
```

## 🧪 테스팅

### 스키마 테스트

```typescript
import { userCreateSchema } from "@repo/validation";

describe("userCreateSchema", () => {
  it("should validate correct user data", () => {
    const validData = {
      email: "test@example.com",
      name: "홍길동",
      age: 25,
    };

    expect(() => userCreateSchema.parse(validData)).not.toThrow();
  });

  it("should reject invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      name: "홍길동",
      age: 25,
    };

    expect(() => userCreateSchema.parse(invalidData)).toThrow();
  });
});
```

## 📈 성능 최적화

### 스키마 재사용

```typescript
// ✅ 좋은 예 - 스키마 재사용
const baseUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const userCreateSchema = baseUserSchema.extend({
  password: z.string().min(8),
});

const userUpdateSchema = baseUserSchema.partial();
```

### 지연 검증

```typescript
import { z } from "zod";

// 복잡한 검증은 지연 실행
const expensiveSchema = z.lazy(() =>
  z.object({
    // 복잡한 스키마 정의
  })
);
```

## 📚 추가 리소스

- [Zod 문서](https://zod.dev/)
- [React Hook Form 문서](https://react-hook-form.com/)
- [Zod 에러 처리 가이드](https://zod.dev/ERROR_HANDLING)

## 🤝 기여하기

새로운 스키마나 개선사항이 있으시면:

1. 기존 스키마와 일관성 유지
2. 적절한 에러 메시지 제공
3. 타입 안전성 보장
4. 테스트 케이스 작성
5. 문서화 완료

---

**타입 안전하고 신뢰할 수 있는 데이터 검증을 시작하세요! ✅**
