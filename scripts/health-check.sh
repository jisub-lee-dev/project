#!/bin/bash

# 프로젝트 헬스체크 스크립트
echo "🔍 프로젝트 헬스체크를 시작합니다..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 체크 함수
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 설치됨${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 설치되지 않음${NC}"
        return 1
    fi
}

# Node.js 버전 체크
echo "📋 Node.js 버전 확인..."
if check_command node; then
    node_version=$(node -v)
    echo "   버전: $node_version"
    
    # Node.js 20+ 체크
    major_version=$(echo $node_version | cut -d'.' -f1 | sed 's/v//')
    if [ "$major_version" -ge 20 ]; then
        echo -e "${GREEN}   ✅ Node.js 버전 요구사항 충족 (20+)${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Node.js 20+ 권장 (현재: $node_version)${NC}"
    fi
fi

# PNPM 체크
echo "📦 PNPM 확인..."
if check_command pnpm; then
    pnpm_version=$(pnpm -v)
    echo "   버전: $pnpm_version"
fi

# 의존성 설치 상태 체크
echo "🔗 의존성 설치 상태 확인..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ 루트 의존성 설치됨${NC}"
else
    echo -e "${RED}❌ 루트 의존성 설치 필요${NC}"
    echo "   실행: pnpm install"
fi

# 환경 변수 파일 체크
echo "🔧 환경 변수 파일 확인..."
files=(".env" "apps/web/.env.local" "packages/db/.env")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file 존재${NC}"
    else
        echo -e "${YELLOW}⚠️  $file 없음${NC}"
        echo "   실행: cp ${file}.example $file"
    fi
done

# Prisma 클라이언트 체크
echo "🗄️ Prisma 클라이언트 확인..."
if [ -d "packages/db/node_modules/.prisma" ] || [ -d "node_modules/.prisma" ]; then
    echo -e "${GREEN}✅ Prisma 클라이언트 생성됨${NC}"
else
    echo -e "${YELLOW}⚠️  Prisma 클라이언트 생성 필요${NC}"
    echo "   실행: pnpm db:generate"
fi

# 빌드 상태 체크
echo "🏗️ 빌드 상태 확인..."
if [ -d "apps/web/.next" ]; then
    echo -e "${GREEN}✅ Next.js 앱 빌드됨${NC}"
else
    echo -e "${YELLOW}⚠️  Next.js 앱 빌드 필요${NC}"
    echo "   실행: pnpm build"
fi

# 포트 사용 체크
echo "🌐 포트 사용 상태 확인..."
if lsof -i :3000 &> /dev/null; then
    echo -e "${YELLOW}⚠️  포트 3000 사용 중${NC}"
    echo "   프로세스: $(lsof -ti :3000 | xargs ps -p | tail -n +2)"
else
    echo -e "${GREEN}✅ 포트 3000 사용 가능${NC}"
fi

if lsof -i :5432 &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL 실행 중 (포트 5432)${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL 실행되지 않음 (포트 5432)${NC}"
    echo "   실행: docker-compose up -d postgres"
fi

echo ""
echo "🎉 헬스체크 완료!"
echo ""
echo "다음 명령어로 개발을 시작할 수 있습니다:"
echo "  pnpm dev     # 개발 서버 시작"
echo "  pnpm build   # 프로덕션 빌드"
echo "  pnpm lint    # 코드 검사"