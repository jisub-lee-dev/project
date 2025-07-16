# @repo/utils

공통 유틸리티 함수와 헬퍼를 제공합니다.

## 특징

- 🛠️ **다양한 유틸리티**: 문자열, 배열, 객체, 날짜 처리
- 🔒 **암호화**: crypto-js 기반 암호화 함수
- 🍪 **쿠키 관리**: js-cookie 래퍼
- 🔗 **URL 처리**: query-string, url-parse 통합
- 📝 **검증**: validator.js 통합

## 사용법

```typescript
import {
  formatDate,
  generateId,
  debounce,
  encrypt,
  decrypt,
} from "@repo/utils";

// 날짜 포맷팅
const formatted = formatDate(new Date(), "yyyy-MM-dd");

// 고유 ID 생성
const id = generateId();

// 디바운스 함수
const debouncedFn = debounce(() => {
  console.log("Debounced!");
}, 300);

// 암호화/복호화
const encrypted = encrypt("sensitive data", "secret-key");
const decrypted = decrypt(encrypted, "secret-key");
```

## 포함된 유틸리티

### 문자열 처리

- `slugify`: URL 친화적 문자열 생성
- `truncate`: 문자열 자르기
- `capitalize`: 첫 글자 대문자화

### 배열/객체 처리

- `groupBy`: 배열 그룹화
- `pick`: 객체 속성 선택
- `omit`: 객체 속성 제외

### 날짜 처리

- `formatDate`: 날짜 포맷팅
- `isValidDate`: 날짜 유효성 검사
- `addDays`: 날짜 계산

### 성능 최적화

- `debounce`: 디바운스
- `throttle`: 스로틀
- `memoize`: 메모이제이션
