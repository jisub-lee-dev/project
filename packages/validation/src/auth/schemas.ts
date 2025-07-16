import { z } from "zod";

// 인증 스키마들
export const RegisterSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirmPassword: z.string().min(1, "비밀번호 확인은 필수입니다"),
    name: z
      .string()
      .min(1, "이름은 필수입니다")
      .max(50, "이름은 50자 이하여야 합니다"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export const ResetPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호는 필수입니다"),
    newPassword: z.string().min(8, "새 비밀번호는 8자 이상이어야 합니다"),
    confirmNewPassword: z.string().min(1, "새 비밀번호 확인은 필수입니다"),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "새 비밀번호가 일치하지 않습니다",
    path: ["confirmNewPassword"],
  });

// 인증 타입들
export type Register = z.infer<typeof RegisterSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
