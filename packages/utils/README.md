# @repo/utils

**프로덕션 준비된** 공통 유틸리티 함수 라이브러리입니다. 타입 안전성과 성능을 최우선으로 설계되었습니다.

## ✨ 특징

- 🛠️ **포괄적인 유틸리티**: 문자열, 배열, 객체, 날짜 처리
- 🔒 **보안**: crypto-js 기반 암호화 및 해싱
- 🍪 **쿠키 관리**: 타입 안전한 쿠키 조작
- 🔗 **URL 처리**: 쿼리 스트링 및 URL 파싱
- 📝 **검증**: validator.js 통합 검증 함수
- 🎯 **TypeScript**: 100% 타입 안전성
- ⚡ **성능 최적화**: Tree-shaking 지원
- 🌍 **환경 변수**: 타입 안전한 환경 변수 관리

## 🚀 빠른 시작

### 기본 사용법

```typescript
import {
  formatDate,
  generateId,
  debounce,
  encrypt,
  decrypt,
  getEnv,
  isDevelopment,
} from "@repo/utils";

// 날짜 포맷팅
const formatted = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

// 고유 ID 생성
const id = generateId();

// 디바운스 함수
const debouncedSearch = debounce((query: string) => {
  console.log("검색:", query);
}, 300);

// 암호화/복호화
const encrypted = encrypt("민감한 데이터", "비밀키");
const decrypted = decrypt(encrypted, "비밀키");

// 환경 변수 (타입 안전)
const env = getEnv();
if (isDevelopment()) {
  console.log("개발 모드입니다");
}
```

### 개별 모듈 임포트

```typescript
// Tree-shaking을 위한 개별 임포트
import { formatDate } from "@repo/utils/date";
import { generateId } from "@repo/utils/id";
import { debounce } from "@repo/utils/performance";
import { getEnv } from "@repo/utils/env";
```

## 📦 유틸리티 카테고리

### 📅 날짜 처리 (Date)

```typescript
import {
  formatDate,
  parseDate,
  addDays,
  subtractDays,
  isValidDate,
  getRelativeTime,
} from "@repo/utils";

// 날짜 포맷팅
formatDate(new Date(), "yyyy-MM-dd"); // "2025-01-16"
formatDate(new Date(), "PPP"); // "January 16th, 2025"

// 날짜 계산
const tomorrow = addDays(new Date(), 1);
const lastWeek = subtractDays(new Date(), 7);

// 상대 시간
getRelativeTime(new Date(Date.now() - 3600000)); // "1시간 전"

// 날짜 유효성 검사
isValidDate("2025-01-16"); // true
isValidDate("invalid"); // false
```

### 🔤 문자열 처리 (String)

```typescript
import {
  slugify,
  truncate,
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  removeAccents,
} from "@repo/utils";

// URL 슬러그 생성
slugify("안녕하세요 세계!"); // "annyeonghaseyo-segye"

// 문자열 자르기
truncate("긴 텍스트입니다", 5); // "긴 텍스..."

// 케이스 변환
camelCase("hello-world"); // "helloWorld"
kebabCase("HelloWorld"); // "hello-world"
snakeCase("HelloWorld"); // "hello_world"

// 대소문자 변환
capitalize("hello world"); // "Hello world"

// 악센트 제거
removeAccents("café"); // "cafe"
```

### 🔢 배열 처리 (Array)

```typescript
import {
  groupBy,
  unique,
  chunk,
  shuffle,
  sortBy,
  findDuplicates,
} from "@repo/utils";

const users = [
  { name: "김철수", age: 25, role: "admin" },
  { name: "이영희", age: 30, role: "user" },
  { name: "박민수", age: 25, role: "user" },
];

// 그룹화
const byAge = groupBy(users, "age");
// { 25: [...], 30: [...] }

// 중복 제거
const ages = unique(users.map(u => u.age)); // [25, 30]

// 청크 분할
const chunks = chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// 정렬
const sorted = sortBy(users, "age"); // 나이순 정렬

// 중복 찾기
const duplicateAges = findDuplicates(users.map(u => u.age)); // [25]
```

### 🗂️ 객체 처리 (Object)

```typescript
import {
  pick,
  omit,
  merge,
  deepClone,
  isEmpty,
  hasProperty,
} from "@repo/utils";

const user = {
  id: 1,
  name: "김철수",
  email: "kim@example.com",
  password: "secret",
  profile: { bio: "안녕하세요" },
};

// 속성 선택
const publicUser = pick(user, ["id", "name", "email"]);

// 속성 제외
const safeUser = omit(user, ["password"]);

// 깊은 복사
const clonedUser = deepClone(user);

// 객체 병합
const updatedUser = merge(user, { age: 25 });

// 빈 객체 확인
isEmpty({}); // true
isEmpty({ name: "김철수" }); // false

// 속성 존재 확인
hasProperty(user, "email"); // true
```

### 🔒 보안 (Crypto)

```typescript
import {
  encrypt,
  decrypt,
  hash,
  generateSalt,
  hashPassword,
  verifyPassword,
} from "@repo/utils";

// 데이터 암호화/복호화
const encrypted = encrypt("민감한 데이터", "비밀키");
const decrypted = decrypt(encrypted, "비밀키");

// 해싱
const hashed = hash("데이터", "sha256");

// 비밀번호 해싱 (솔트 포함)
const salt = generateSalt();
const hashedPassword = hashPassword("password123", salt);
const isValid = verifyPassword("password123", hashedPassword, salt);
```

### 🍪 쿠키 관리 (Cookie)

```typescript
import { setCookie, getCookie, removeCookie, getAllCookies } from "@repo/utils";

// 쿠키 설정
setCookie("user_id", "123", {
  expires: 7, // 7일
  secure: true,
  sameSite: "strict",
});

// 쿠키 조회
const userId = getCookie("user_id");

// 쿠키 삭제
removeCookie("user_id");

// 모든 쿠키 조회
const allCookies = getAllCookies();
```

### 🔗 URL 처리 (URL)

```typescript
import { parseUrl, buildUrl, parseQuery, buildQuery } from "@repo/utils";

// URL 파싱
const parsed = parseUrl("https://example.com/path?name=김철수&age=25");
// { protocol: "https:", host: "example.com", pathname: "/path", ... }

// URL 구성
const url = buildUrl("https://example.com", "/api/users", {
  page: 1,
  limit: 10,
});
// "https://example.com/api/users?page=1&limit=10"

// 쿼리 스트링 파싱
const query = parseQuery("?name=김철수&age=25");
// { name: "김철수", age: "25" }

// 쿼리 스트링 구성
const queryString = buildQuery({ name: "김철수", age: 25 });
// "name=김철수&age=25"
```

### ⚡ 성능 최적화 (Performance)

```typescript
import { debounce, throttle, memoize, once } from "@repo/utils";

// 디바운스 (마지막 호출 후 지연시간 후 실행)
const debouncedSearch = debounce((query: string) => {
  console.log("검색:", query);
}, 300);

// 스로틀 (일정 간격으로만 실행)
const throttledScroll = throttle(() => {
  console.log("스크롤 이벤트");
}, 100);

// 메모이제이션 (결과 캐싱)
const expensiveFunction = memoize((n: number) => {
  return n * n; // 복잡한 계산
});

// 한 번만 실행
const initializeOnce = once(() => {
  console.log("초기화 완료");
});
```

### 🔧 ID 생성 (ID)

```typescript
import {
  generateId,
  generateUuid,
  generateShortId,
  generateSlug,
} from "@repo/utils";

// 기본 ID (nanoid)
const id = generateId(); // "V1StGXR8_Z5jdHi6B-myT"

// UUID v4
const uuid = generateUuid(); // "550e8400-e29b-41d4-a716-446655440000"

// 짧은 ID
const shortId = generateShortId(8); // "aB3xY9mZ"

// 슬러그 ID (URL 친화적)
const slug = generateSlug("제목입니다"); // "jemog-ibnida-abc123"
```

### 🌍 환경 변수 (Environment)

```typescript
import {
  getEnv,
  validateEnv,
  isDevelopment,
  isProduction,
  isTest,
} from "@repo/utils";

// 타입 안전한 환경 변수 접근
const env = getEnv();
console.log(env.DATABASE_URL); // 타입 체크됨

// 환경 확인
if (isDevelopment()) {
  console.log("개발 환경입니다");
}

if (isProduction()) {
  console.log("프로덕션 환경입니다");
}

// 환경 변수 검증
try {
  validateEnv(process.env);
} catch (error) {
  console.error("환경 변수 오류:", error);
}
```

## 🛠️ 개발 가이드

### 새 유틸리티 추가

1. **카테고리 결정**: 적절한 카테고리 폴더 선택
2. **함수 구현**: TypeScript로 타입 안전하게 구현
3. **테스트 작성**: Jest 테스트 케이스 추가
4. **문서화**: JSDoc 주석 추가
5. **Export 추가**: 해당 카테고리 index.ts에 추가

### 예시: 새 문자열 유틸리티 추가

````typescript
// src/string.ts
/**
 * 문자열을 역순으로 뒤집습니다.
 * @param str - 뒤집을 문자열
 * @returns 뒤집힌 문자열
 * @example
 * ```typescript
 * reverse("hello"); // "olleh"
 * reverse("안녕"); // "녕안"
 * ```
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("");
}
````

### 테스트 작성

```typescript
// src/__tests__/string.test.ts
import { reverse } from "../string";

describe("reverse", () => {
  it("should reverse English string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("should reverse Korean string", () => {
    expect(reverse("안녕")).toBe("녕안");
  });

  it("should handle empty string", () => {
    expect(reverse("")).toBe("");
  });
});
```

## 📈 성능 고려사항

### Tree-shaking 최적화

```typescript
// ✅ 좋은 예 - 개별 임포트
import { formatDate } from "@repo/utils/date";

// ❌ 나쁜 예 - 전체 임포트
import { formatDate } from "@repo/utils";
```

### 메모이제이션 활용

```typescript
import { memoize } from "@repo/utils";

// 비용이 큰 계산 함수 메모이제이션
const expensiveCalculation = memoize((data: ComplexData) => {
  // 복잡한 계산...
  return result;
});
```

## 🧪 테스팅

```bash
# 테스트 실행
pnpm test

# 테스트 커버리지
pnpm test:coverage

# 특정 파일 테스트
pnpm test string.test.ts
```

## 📚 추가 리소스

- [date-fns 문서](https://date-fns.org/)
- [lodash-es 문서](https://lodash.com/)
- [crypto-js 문서](https://cryptojs.gitbook.io/)
- [validator.js 문서](https://github.com/validatorjs/validator.js)

## 🤝 기여하기

새로운 유틸리티 함수나 개선사항이 있으시면:

1. 기존 함수와 중복되지 않는지 확인
2. 적절한 카테고리에 배치
3. 테스트 케이스 작성
4. JSDoc 문서화
5. Pull Request 생성

---

**효율적이고 안전한 유틸리티로 개발 속도를 높여보세요! ⚡**
