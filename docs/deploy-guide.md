# Vercel 배포 가이드 (모노레포 템플릿)

## 📋 문서 정보

- **프로젝트 타입**: Turborepo + Next.js 모노레포
- **배포 플랫폼**: Vercel
- **데이터베이스**: Vercel Postgres
- **문서 타입**: 배포 가이드
- **난이도**: 초보자 친화적

## 🎯 개요

이 가이드는 Turborepo + Next.js 모노레포 프로젝트를 Vercel에 배포하는 가장 쉬운 방법을 설명합니다. 복잡한 설정 없이 핵심만 간단하게 안내합니다.

## 🚀 1단계: Vercel에 프로젝트 연결

### GitHub에서 Vercel로 배포

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel.com 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

3. **New Project 클릭**
   - **Import Git Repository** 선택
   - 모노레포 저장소 선택

4. **프로젝트 설정**
   ```
   Framework: Next.js
   Root Directory: apps/web (또는 메인 앱 디렉토리)
   Build Command: pnpm build
   Install Command: pnpm install
   ```

5. **Deploy 클릭**

## 🗄️ 2단계: Vercel Postgres 데이터베이스 생성

### 데이터베이스 만들기

1. **Vercel 대시보드에서 Storage 탭 클릭**

2. **Create Database 클릭**

3. **Postgres 선택**

4. **설정 입력**
   ```
   Database Name: your-project-db
   Region: 가장 가까운 리전 (예: Seoul)
   Plan: Hobby (무료) 또는 Pro
   ```

5. **Create 클릭**

6. **완료!** (자동으로 환경 변수 설정됨)

### 자동 생성되는 환경 변수들

Vercel Postgres 생성 시 자동으로 추가되는 변수들:
```bash
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

## ⚙️ 3단계: 환경 변수 설정

### Vercel 대시보드에서 설정

1. **Settings 탭 클릭**

2. **Environment Variables 섹션으로 이동**

3. **Add New 클릭**

4. **다음 변수들을 하나씩 추가**:

#### 필수 설정
```bash
# NextAuth.js 설정 (인증 사용 시)
Name: NEXTAUTH_URL
Value: https://your-project.vercel.app
Environment: Production, Preview, Development

Name: NEXTAUTH_SECRET
Value: your-nextauth-secret-key-here
Environment: Production, Preview, Development
```

#### OAuth 설정 (인증 사용 시)
```bash
# Google OAuth
Name: GOOGLE_CLIENT_ID
Value: your-google-client-id
Environment: Production, Preview, Development

Name: GOOGLE_CLIENT_SECRET
Value: your-google-client-secret
Environment: Production, Preview, Development

# GitHub OAuth
Name: GITHUB_ID
Value: your-github-client-id
Environment: Production, Preview, Development

Name: GITHUB_SECRET
Value: your-github-client-secret
Environment: Production, Preview, Development
```

#### 애플리케이션 설정
```bash
# 앱 설정
Name: APP_NAME
Value: Your App Name
Environment: Production, Preview, Development

Name: APP_VERSION
Value: 1.0.0
Environment: Production, Preview, Development

Name: APP_ENVIRONMENT
Value: production
Environment: Production, Preview, Development

# API 설정
Name: API_BASE_URL
Value: https://your-project.vercel.app/api
Environment: Production, Preview, Development

# 로깅 설정
Name: LOG_LEVEL
Value: info
Environment: Production, Preview, Development

Name: ENABLE_DEBUG_LOGS
Value: false
Environment: Production, Preview, Development
```

## 🔐 4단계: OAuth 설정 (인증 기능 사용 시)

### Google 로그인 설정

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com 접속
   - Google 계정으로 로그인

2. **OAuth 2.0 클라이언트 ID 생성**
   - **APIs & Services** → **Credentials**
   - **Create Credentials** → **OAuth 2.0 Client IDs**

3. **승인된 리디렉션 URI 추가**
   ```
   https://your-project.vercel.app/api/auth/callback/google
   https://your-project-name.vercel.app/api/auth/callback/google
   ```

4. **클라이언트 ID와 Secret 복사**
   - Vercel 환경 변수에 설정

### GitHub 로그인 설정

1. **GitHub Settings 접속**
   - https://github.com/settings/developers 접속
   - GitHub 계정으로 로그인

2. **OAuth Apps 생성**
   - **OAuth Apps** → **New OAuth App**

3. **Authorization callback URL 추가**
   ```
   https://your-project.vercel.app/api/auth/callback/github
   https://your-project-name.vercel.app/api/auth/callback/github
   ```

4. **클라이언트 ID와 Secret 복사**
   - Vercel 환경 변수에 설정

## 🗄️ 5단계: 데이터베이스 스키마 적용

### 로컬에서 마이그레이션

1. **Vercel CLI 설치** (선택사항)
   ```bash
   npm i -g vercel
   ```

2. **Vercel 환경 변수를 로컬로 가져오기**
   ```bash
   vercel env pull .env.local
   ```

3. **Prisma 클라이언트 생성**
   ```bash
   pnpm --filter=@repo/db db:generate
   ```

4. **데이터베이스 스키마 적용**
   ```bash
   pnpm --filter=@repo/db db:push
   ```

5. **변경사항 커밋 및 푸시**
   ```bash
   git add .
   git commit -m "Add database schema"
   git push origin main
   ```

### 또는 Vercel에서 직접 마이그레이션

1. **Vercel Functions에서 마이그레이션 실행**
   - `apps/web/src/app/api/migrate/route.ts` 생성
   - 배포 후 `/api/migrate` 엔드포인트 호출

## 🔧 6단계: 필요한 파일 수정

### packages/db/prisma/schema.prisma 수정

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

// ... 나머지 스키마는 그대로 유지
```

### NextAuth.js 설정 (인증 사용 시)

```typescript
// apps/web/src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@repo/db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // ... 나머지 설정
};
```

## ✅ 7단계: 배포 확인

### 확인할 것들

1. **웹사이트 접속**
   - `https://your-project.vercel.app` 접속
   - 페이지가 정상적으로 로드되는지 확인

2. **기능 테스트**
   - 주요 기능들이 정상 작동하는지 확인
   - API 엔드포인트 테스트
   - 데이터베이스 연결 확인

3. **인증 테스트** (인증 사용 시)
   - 로그인/로그아웃 기능
   - OAuth 제공자 연결
   - 세션 관리

4. **데이터베이스 확인**
   - Vercel Storage → Databases
   - 데이터가 정상적으로 저장되는지 확인

## 🐛 문제 해결

### 자주 발생하는 문제들

#### 1. 환경 변수 오류
```bash
# Vercel에서 환경 변수 다시 설정
# NEXTAUTH_URL이 정확한지 확인
# 모든 환경(Production, Preview, Development)에 설정했는지 확인
```

#### 2. 데이터베이스 연결 오류
```bash
# Vercel Postgres 상태 확인
# Storage 탭에서 데이터베이스 상태 체크
# Connection String 형식 확인
```

#### 3. OAuth 로그인 오류
```bash
# 리디렉션 URI 확인
# 클라이언트 ID/Secret 확인
# Vercel 도메인 설정 확인
```

#### 4. 빌드 오류
```bash
# 로컬에서 빌드 테스트
pnpm build

# 빌드 로그 확인
# 의존성 문제 확인
```

#### 5. 모노레포 관련 오류
```bash
# Turborepo 캐시 정리
pnpm clean

# 의존성 재설치
pnpm install

# 패키지별 빌드 테스트
pnpm --filter=@repo/db build
pnpm --filter=@repo/ui build
pnpm --filter=web build
```

### 유용한 명령어들

```bash
# Vercel CLI로 환경 변수 확인
vercel env ls

# 로컬로 환경 변수 가져오기
vercel env pull .env.local

# 배포 상태 확인
vercel ls

# 로그 확인
vercel logs --follow

# 모노레포 관련
pnpm clean                    # 캐시 정리
pnpm build                    # 전체 빌드
pnpm --filter=web dev         # 특정 앱 개발 서버
pnpm --filter=@repo/db db:push # DB 스키마 동기화
```

## 📋 체크리스트

### 배포 전 확인사항
- [ ] GitHub에 코드 푸시 완료
- [ ] Vercel 프로젝트 생성 완료
- [ ] Vercel Postgres 데이터베이스 생성 완료
- [ ] 환경 변수 설정 완료
- [ ] OAuth 제공자 설정 완료 (인증 사용 시)
- [ ] Prisma 스키마 수정 완료
- [ ] 모노레포 빌드 테스트 완료

### 배포 후 확인사항
- [ ] 웹사이트 접속 가능
- [ ] 주요 기능 작동 확인
- [ ] API 엔드포인트 정상 작동
- [ ] 데이터베이스 연결 확인
- [ ] 인증 기능 작동 (인증 사용 시)
- [ ] 모바일에서 접속 가능

## 💰 비용 정보

### Vercel 요금제
- **Hobby (무료)**: 개인 프로젝트용
  - 월 100GB 대역폭
  - 월 100GB 저장공간
  - 무제한 개인 프로젝트

- **Pro ($20/월)**: 팀 프로젝트용
  - 월 1TB 대역폭
  - 월 1TB 저장공간
  - 팀 협업 기능

### Vercel Postgres 요금제
- **Hobby ($20/월)**: 개인 프로젝트용
  - 256MB RAM
  - 1GB 저장공간
  - 일일 백업

- **Pro ($50/월)**: 팀 프로젝트용
  - 1GB RAM
  - 10GB 저장공간
  - 시간별 백업

### 무료로 시작하기
1. **Vercel Hobby 플랜** 사용 (무료)
2. **Vercel Postgres Hobby** 사용 ($20/월)
3. **총 월 $20**으로 완전한 웹 앱 운영

## 🎯 핵심 포인트

### Vercel의 장점
- ✅ **간단한 배포**: Git 푸시만으로 자동 배포
- ✅ **자동 HTTPS**: SSL 인증서 자동 설정
- ✅ **글로벌 CDN**: 빠른 로딩 속도
- ✅ **자동 스케일링**: 트래픽에 따라 자동 확장
- ✅ **통합 데이터베이스**: Postgres 바로 연결
- ✅ **환경 변수 관리**: 대시보드에서 쉽게 관리
- ✅ **모노레포 지원**: Turborepo 완벽 지원

### 모노레포 배포의 장점
- ✅ **단일 저장소**: 모든 앱과 패키지 통합 관리
- ✅ **공유 코드**: 패키지 간 코드 재사용
- ✅ **일관된 배포**: 모든 앱 동시 배포
- ✅ **캐싱 최적화**: Turborepo 빌드 캐싱
- ✅ **타입 안전성**: 패키지 간 타입 공유

### 완료 후 할 수 있는 것들
- 📱 **모바일에서 접속** 가능
- 👥 **친구들과 공유** 가능
- 🔄 **실시간 업데이트** (Git 푸시 시)
- 📊 **사용자 통계** 확인 가능
- 🌍 **글로벌 접속** 가능
- 🚀 **새로운 앱 추가** 용이

## 🚀 다음 단계

### 추가 개선사항
1. **커스텀 도메인** 설정
2. **성능 모니터링** 추가 (Sentry 등)
3. **자동 백업** 설정
4. **팀 협업** 기능 추가
5. **CI/CD 파이프라인** 구축

### 확장 가능한 기능들
- 📧 **이메일 알림** 기능
- 📱 **PWA** 설정
- 🔔 **푸시 알림** 기능
- 📊 **애널리틱스** 추가
- 🔐 **고급 인증** (2FA, 소셜 로그인)
- 🌐 **다국어 지원**

### 모노레포 확장
- 📱 **모바일 앱** 추가 (React Native)
- 🖥️ **관리자 패널** 추가
- 🔌 **API 서버** 분리
- 📊 **대시보드** 앱 추가

---

**이제 Vercel에서 완전히 운영되는 모노레포 웹 앱이 완성됩니다! 🎉**

복잡한 서버 설정 없이도 전문적인 웹 앱을 만들 수 있습니다.

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025년 1월  
**작성자**: 개발팀  
**적용 프로젝트**: Turborepo + Next.js 모노레포 