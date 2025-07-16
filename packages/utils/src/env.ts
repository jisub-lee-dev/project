import { z } from "zod";

// 환경 변수 스키마 정의
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

// 환경 변수 타입
export type Env = z.infer<typeof envSchema>;

// 환경 변수 검증 함수
export function validateEnv(env: Record<string, string | undefined>): Env {
  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error("❌ 환경 변수 검증 실패:", error);
    throw new Error("환경 변수가 올바르지 않습니다.");
  }
}

// 안전한 환경 변수 접근
export function getEnv(): Env {
  return validateEnv(process.env);
}

// 개발 환경 여부 확인
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === "development";
}

// 프로덕션 환경 여부 확인
export function isProduction(): boolean {
  return getEnv().NODE_ENV === "production";
}

// 테스트 환경 여부 확인
export function isTest(): boolean {
  return getEnv().NODE_ENV === "test";
}
