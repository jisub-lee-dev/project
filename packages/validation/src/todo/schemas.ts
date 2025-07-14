import { z } from 'zod'

// Priority enum 정의
export const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH'])

// 기본 Todo 스키마
export const TodoSchema = z.object({
  title: z.string()
    .min(1, '제목은 필수입니다')
    .max(100, '제목은 100자 이하여야 합니다'),
  description: z.string()
    .max(500, '설명은 500자 이하여야 합니다')
    .optional(),
  completed: z.boolean().default(false),
  priority: PriorityEnum.default('MEDIUM'),
  dueDate: z.date().optional(),
})

// Todo 생성 스키마 (userId는 서버에서 자동 설정)
export const CreateTodoSchema = TodoSchema.omit({ completed: true }).extend({
  userId: z.string().optional(), // 서버에서 자동 설정
})

// Todo 수정 스키마 (모든 필드 선택적)
export const UpdateTodoSchema = TodoSchema.partial()

// Todo ID 스키마
export const TodoIdSchema = z.object({
  id: z.string().min(1, 'Todo ID는 필수입니다'),
})

// Todo 목록 조회 스키마
export const TodoListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  completed: z.boolean().optional(),
  priority: PriorityEnum.optional(),
  search: z.string().optional(),
})

// Todo 필터 스키마
export const TodoFilterSchema = z.object({
  completed: z.boolean().optional(),
  priority: PriorityEnum.optional(),
  dueDateFrom: z.date().optional(),
  dueDateTo: z.date().optional(),
})

// 타입 정의
export type Todo = z.infer<typeof TodoSchema>
export type CreateTodo = z.infer<typeof CreateTodoSchema>
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>
export type TodoId = z.infer<typeof TodoIdSchema>
export type TodoList = z.infer<typeof TodoListSchema>
export type TodoFilter = z.infer<typeof TodoFilterSchema>
export type Priority = z.infer<typeof PriorityEnum> 