import { z } from "zod";

// 사용자 스키마들
export const UserSchema = z.object({
  id: z.string().min(1, "사용자 ID는 필수입니다"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  name: z
    .string()
    .min(1, "이름은 필수입니다")
    .max(50, "이름은 50자 이하여야 합니다"),
  avatar: z.string().url("올바른 URL 형식이 아닙니다").optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
});

export const LoginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호는 필수입니다"),
});

// 사용자 타입들
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Login = z.infer<typeof LoginSchema>;
