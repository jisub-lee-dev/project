import { z } from "zod";

// Category enum 정의
export const CategoryEnum = z.enum([
  "ELECTRONICS",
  "CLOTHING",
  "BOOKS",
  "FOOD",
  "OTHER",
]);

// 기본 Product 스키마
export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "상품명은 필수입니다")
    .max(100, "상품명은 100자 이하여야 합니다"),
  description: z.string().max(500, "설명은 500자 이하여야 합니다").optional(),
  price: z
    .number()
    .min(0, "가격은 0 이상이어야 합니다")
    .max(999999.99, "가격은 999,999.99 이하여야 합니다"),
  category: CategoryEnum.default("OTHER"),
  inStock: z.boolean().default(true),
});

// Product 생성 스키마 (userId는 서버에서 자동 설정)
export const CreateProductSchema = ProductSchema.extend({
  userId: z.string().optional(), // 서버에서 자동 설정
});

// Product 수정 스키마 (모든 필드 선택적)
export const UpdateProductSchema = ProductSchema.partial();

// Product ID 스키마
export const ProductIdSchema = z.object({
  id: z.string().min(1, "Product ID는 필수입니다"),
});

// Product 목록 조회 스키마
export const ProductListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  inStock: z.boolean().optional(),
  category: CategoryEnum.optional(),
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

// Product 필터 스키마
export const ProductFilterSchema = z.object({
  inStock: z.boolean().optional(),
  category: CategoryEnum.optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

// 타입 정의
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductId = z.infer<typeof ProductIdSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
export type ProductFilter = z.infer<typeof ProductFilterSchema>;
export type Category = z.infer<typeof CategoryEnum>;
