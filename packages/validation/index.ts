import { z } from "zod";

// 기본 사용자 스키마
export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  name: z.string().min(1, { message: "이름은 필수입니다." }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 로그인 스키마
export const LoginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

// 회원가입 스키마
export const RegisterSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  confirmPassword: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  name: z.string().min(1, { message: "이름은 필수입니다." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

// 타입 추출
export type User = z.infer<typeof UserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>; 