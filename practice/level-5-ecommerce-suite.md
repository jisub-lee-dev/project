# Level 5: E-commerce Suite 🛒

## 🎯 프로젝트 개요

**E-commerce Suite**는 결제 시스템, 재고 관리, 모바일 앱 등을 학습하기 위한 최종 프로젝트입니다. 고객용 스토어, 관리자 대시보드, 모바일 앱을 포함한 완전한 전자상거래 플랫폼을 구축합니다.

## 📋 학습 목표

- ✅ **결제 시스템** 구현 (Stripe)
- ✅ **재고 관리** 시스템
- ✅ **주문 처리** 및 배송 추적
- ✅ **모바일 앱** 개발 (React Native)
- ✅ **실시간 알림** 시스템
- ✅ **고급 분석** 대시보드

## 🏗️ 프로젝트 구조

```
apps/
├── store/                   # 고객용 스토어
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 홈페이지
│   │   │   ├── products/   # 상품 목록
│   │   │   ├── products/[id] # 상품 상세
│   │   │   ├── cart/       # 장바구니
│   │   │   ├── checkout/   # 결제
│   │   │   ├── orders/     # 주문 내역
│   │   │   └── profile/    # 프로필
│   │   └── components/     # 스토어 컴포넌트
│   └── package.json
├── admin/                   # 관리자 대시보드
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 대시보드
│   │   │   ├── products/   # 상품 관리
│   │   │   ├── orders/     # 주문 관리
│   │   │   ├── customers/  # 고객 관리
│   │   │   ├── inventory/  # 재고 관리
│   │   │   └── analytics/  # 분석 대시보드
│   │   └── components/     # 관리자 컴포넌트
│   └── package.json
├── mobile/                  # React Native 앱
│   ├── src/
│   │   ├── screens/        # 화면 컴포넌트
│   │   ├── components/     # 공통 컴포넌트
│   │   └── navigation/     # 네비게이션
│   └── package.json
└── api/                     # REST API 서버
    ├── src/
    └── package.json

packages/
├── db/                      # 데이터베이스 스키마
├── ui/                      # 공유 UI 컴포넌트
├── validation/              # 유효성 검사 스키마
├── utils/                   # 유틸리티 함수
├── payment/                 # 결제 시스템 (새로 추가)
├── inventory/               # 재고 관리 (새로 추가)
├── notification/            # 알림 시스템 (새로 추가)
└── analytics/               # 분석 도구 (새로 추가)
```

## 🗄️ 데이터베이스 스키마

### User 모델 (확장)
```prisma
model User {
  id          String      @id @default(cuid())
  email       String      @unique
  name        String?
  avatar      String?
  role        Role        @default(CUSTOMER)
  phone       String?
  addresses   Address[]
  orders      Order[]
  reviews     Review[]
  wishlist    Product[]   @relation("UserWishlist")
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
  MANAGER
}
```

### Product 모델
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  price       Decimal
  comparePrice Decimal?
  images      String[]
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  variants    ProductVariant[]
  reviews     Review[]
  wishlist    User[]   @relation("UserWishlist")
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  sku         String?  @unique
  weight      Float?
  dimensions  Json?    // {length, width, height}
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Category 모델
```prisma
model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  isActive    Boolean   @default(true)
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### ProductVariant 모델
```prisma
model ProductVariant {
  id          String   @id @default(cuid())
  sku         String   @unique
  name        String   // "Red, Large"
  attributes  Json     // {color: "red", size: "large"}
  price       Decimal
  comparePrice Decimal?
  stock       Int      @default(0)
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Order 모델
```prisma
model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  status        OrderStatus @default(PENDING)
  items         OrderItem[]
  subtotal      Decimal
  tax           Decimal
  shipping      Decimal
  discount      Decimal     @default(0)
  total         Decimal
  paymentStatus PaymentStatus @default(PENDING)
  paymentIntent String?     // Stripe Payment Intent ID
  shippingAddress Address
  billingAddress  Address
  trackingNumber String?
  notes         String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

### OrderItem 모델
```prisma
model OrderItem {
  id              String        @id @default(cuid())
  orderId         String
  order           Order         @relation(fields: [orderId], references: [id])
  productId       String
  product         Product       @relation(fields: [productId], references: [id])
  variantId       String?
  variant         ProductVariant? @relation(fields: [variantId], references: [id])
  quantity        Int
  price           Decimal
  total           Decimal
  createdAt       DateTime      @default(now())
}
```

### Address 모델
```prisma
model Address {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        AddressType
  firstName   String
  lastName    String
  company     String?
  address1    String
  address2    String?
  city        String
  state       String
  postalCode  String
  country     String
  phone       String?
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AddressType {
  SHIPPING
  BILLING
}
```

### Review 모델
```prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5
  title     String?
  comment   String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  isVerified Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 구현 단계

### 1주차: 기본 구조 및 상품 관리

#### Day 1-2: 프로젝트 설정
- [ ] 데이터베이스 스키마 생성
- [ ] Stripe 설정 및 웹훅 구성
- [ ] 기본 UI 컴포넌트 생성

#### Day 3-4: 상품 관리 시스템
- [ ] 상품 CRUD API
- [ ] 카테고리 관리
- [ ] 상품 변형 관리

#### Day 5-7: 스토어 프론트엔드
- [ ] 상품 목록 페이지
- [ ] 상품 상세 페이지
- [ ] 검색 및 필터링

### 2주차: 장바구니 및 결제

#### Day 8-10: 장바구니 시스템
- [ ] 장바구니 상태 관리
- [ ] 장바구니 API
- [ ] 장바구니 UI

#### Day 11-12: 결제 시스템
- [ ] Stripe 결제 통합
- [ ] 결제 폼 구현
- [ ] 결제 웹훅 처리

#### Day 13-14: 주문 처리
- [ ] 주문 생성 API
- [ ] 주문 상태 관리
- [ ] 주문 확인 이메일

### 3주차: 고급 기능

#### Day 15-17: 재고 관리
- [ ] 재고 추적 시스템
- [ ] 재고 알림
- [ ] 자동 재고 업데이트

#### Day 18-19: 관리자 대시보드
- [ ] 주문 관리
- [ ] 고객 관리
- [ ] 매출 분석

#### Day 20-21: 모바일 앱
- [ ] React Native 설정
- [ ] 기본 네비게이션
- [ ] 상품 목록 및 상세

## 🛠️ 기술 스택

### 백엔드
- **Prisma**: 데이터베이스 ORM
- **Next.js API Routes**: REST API
- **Stripe**: 결제 시스템
- **Redis**: 세션 및 캐싱

### 프론트엔드
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **shadcn/ui**: UI 컴포넌트
- **Tailwind CSS**: 스타일링

### 결제 시스템
- **Stripe**: 결제 처리
- **Stripe Webhooks**: 결제 이벤트 처리
- **Stripe Elements**: 결제 폼

### 모바일 앱
- **React Native**: 크로스 플랫폼 앱
- **Expo**: 개발 도구
- **React Navigation**: 네비게이션

### 알림 시스템
- **WebSocket**: 실시간 알림
- **Push Notifications**: 모바일 푸시
- **Email**: 이메일 알림

### 공유 패키지
- **@repo/db**: 데이터베이스 클라이언트
- **@repo/validation**: Zod 스키마
- **@repo/ui**: 공유 컴포넌트
- **@repo/utils**: 유틸리티 함수
- **@repo/payment**: 결제 시스템 (새로 추가)
- **@repo/inventory**: 재고 관리 (새로 추가)
- **@repo/notification**: 알림 시스템 (새로 추가)
- **@repo/analytics**: 분석 도구 (새로 추가)

## 📝 구현 예시

### Stripe 결제 컴포넌트
```typescript
// apps/store/src/components/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Card } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';

interface CheckoutFormProps {
  orderId: string;
  amount: number;
  onSuccess: () => void;
}

export function CheckoutForm({ orderId, amount, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const paymentMutation = useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const response = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          paymentMethodId,
        }),
      });
      return response.json();
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message || '결제 처리 중 오류가 발생했습니다.');
      return;
    }

    if (paymentMethod) {
      paymentMutation.mutate(paymentMethod.id, {
        onSuccess: (data) => {
          if (data.success) {
            onSuccess();
          } else {
            setError(data.error || '결제에 실패했습니다.');
          }
        },
        onError: () => {
          setError('결제 처리 중 오류가 발생했습니다.');
        },
      });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">결제 정보</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}

        <Button
          type="submit"
          disabled={!stripe || paymentMutation.isPending}
          className="w-full"
        >
          {paymentMutation.isPending ? '처리 중...' : `₩${amount.toLocaleString()} 결제하기`}
        </Button>
      </form>
    </Card>
  );
}
```

### 재고 관리 시스템
```typescript
// packages/inventory/src/index.ts
export interface InventoryItem {
  id: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
}

export class InventoryManager {
  private items: Map<string, InventoryItem> = new Map();

  async updateStock(sku: string, quantity: number): Promise<void> {
    const item = this.items.get(sku);
    if (!item) {
      throw new Error(`SKU ${sku} not found`);
    }

    item.quantity = quantity;
    item.available = item.quantity - item.reserved;

    // 재고 부족 알림
    if (item.available <= item.lowStockThreshold) {
      await this.sendLowStockAlert(sku, item.available);
    }
  }

  async reserveStock(sku: string, quantity: number): Promise<boolean> {
    const item = this.items.get(sku);
    if (!item || item.available < quantity) {
      return false;
    }

    item.reserved += quantity;
    item.available = item.quantity - item.reserved;
    return true;
  }

  async releaseStock(sku: string, quantity: number): Promise<void> {
    const item = this.items.get(sku);
    if (!item) {
      throw new Error(`SKU ${sku} not found`);
    }

    item.reserved = Math.max(0, item.reserved - quantity);
    item.available = item.quantity - item.reserved;
  }

  private async sendLowStockAlert(sku: string, available: number): Promise<void> {
    // 관리자에게 재고 부족 알림 전송
    console.log(`Low stock alert: SKU ${sku} has ${available} items remaining`);
  }
}
```

### 주문 처리 시스템
```typescript
// apps/api/src/app/api/orders/route.ts
import { prisma } from '@repo/db';
import { stripe } from '@repo/payment';
import { sendOrderConfirmation } from '@repo/notification';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shippingAddress, billingAddress, userId } = body;

    // 주문 생성
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: 'PENDING',
        shippingAddress,
        billingAddress,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
        subtotal: calculateSubtotal(items),
        tax: calculateTax(items),
        shipping: calculateShipping(shippingAddress),
        total: calculateTotal(items, shippingAddress),
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        user: true,
      },
    });

    // Stripe Payment Intent 생성
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe는 센트 단위
      currency: 'krw',
      metadata: {
        orderId: order.id,
      },
    });

    // 주문 업데이트
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntent: paymentIntent.id },
    });

    // 주문 확인 이메일 전송
    await sendOrderConfirmation(order);

    return Response.json({
      success: true,
      data: {
        order,
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    return Response.json({ error: 'Order creation failed' }, { status: 500 });
  }
}

function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function calculateSubtotal(items: any[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateTax(items: any[]): number {
  const subtotal = calculateSubtotal(items);
  return subtotal * 0.1; // 10% 부가세
}

function calculateShipping(address: any): number {
  // 배송비 계산 로직
  return 3000; // 기본 배송비
}

function calculateTotal(items: any[], shippingAddress: any): number {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(items);
  const shipping = calculateShipping(shippingAddress);
  return subtotal + tax + shipping;
}
```

## 🎨 UI/UX 가이드

### 디자인 원칙
- **신뢰성**: 안전한 결제와 명확한 정보 제공
- **편의성**: 직관적인 쇼핑 경험
- **반응성**: 모든 디바이스에서 최적화된 경험

### 색상 팔레트
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Success**: Green (#059669)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

## 📊 성능 최적화

### 프론트엔드
- **React Query**: 상품 데이터 캐싱
- **Code Splitting**: 페이지별 코드 분할
- **Image Optimization**: 상품 이미지 최적화

### 백엔드
- **Prisma**: 데이터베이스 쿼리 최적화
- **Redis**: 세션 및 캐싱
- **CDN**: 정적 자산 전송 최적화

## 🧪 테스트 전략

### 단위 테스트
- **결제 시스템**: Stripe 통합 테스트
- **재고 관리**: 재고 업데이트 테스트
- **주문 처리**: 주문 생성 및 상태 변경 테스트

### 통합 테스트
- **구매 플로우**: 상품 선택부터 결제 완료까지
- **재고 관리**: 주문 시 재고 자동 감소
- **알림 시스템**: 주문 상태 변경 시 알림

## 🚀 배포

### 개발 환경
- **로컬**: `pnpm dev`
- **데이터베이스**: Docker PostgreSQL
- **Redis**: 로컬 Redis 서버
- **Stripe**: 테스트 모드

### 프로덕션 환경
- **Vercel**: Next.js 앱 배포
- **PlanetScale**: 데이터베이스 호스팅
- **Redis Cloud**: Redis 호스팅
- **Stripe**: 프로덕션 모드
- **Expo**: 모바일 앱 배포

## 📚 추가 학습 자료

- [Stripe 공식 문서](https://stripe.com/docs)
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)
- [Redis 공식 문서](https://redis.io/documentation)

## 🎯 최종 목표

Level 5 완료 후 다음을 확인하세요:
- ✅ 결제 시스템이 안전하게 작동하는가?
- ✅ 재고 관리가 실시간으로 업데이트되는가?
- ✅ 모바일 앱이 네이티브 앱처럼 작동하는가?
- ✅ 관리자 대시보드가 유용한 인사이트를 제공하는가?

**축하합니다! 이제 완전한 풀스택 개발자가 되었습니다! 🎉**

---

**Happy Coding! 🚀** 