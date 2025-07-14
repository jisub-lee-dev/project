import { z } from 'zod'

// 공통 스키마들
export const IdSchema = z.object({
  id: z.string().min(1, 'ID는 필수입니다'),
})

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

export const SearchSchema = z.object({
  search: z.string().optional(),
})

export const DateRangeSchema = z.object({
  from: z.date().optional(),
  to: z.date().optional(),
})

// 공통 타입들
export type Id = z.infer<typeof IdSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type Search = z.infer<typeof SearchSchema>
export type DateRange = z.infer<typeof DateRangeSchema> 