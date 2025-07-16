#!/bin/bash

# 프로젝트 초기 설정 스크립트
echo "🚀 프로젝트 초기 설정을 시작합니다..."

# Node.js 버전 확인
echo "📋 Node.js 버전 확인 중..."
node_version=$(node -v)
echo "현재 Node.js 버전: $node_version"

# PNPM 설치 확인
if ! command -v pnpm &> /dev/null; then
    echo "❌ PNPM이 설치되어 있지 않습니다. PNPM을 설치해주세요."
    echo "설치 명령어: npm install -g pnpm"
    exit 1
fi

echo "✅ PNPM 설치 확인됨"

# 의존성 설치
echo "📦 의존성 설치 중..."
pnpm install

# 환경 변수 파일 복사
echo "🔧 환경 변수 파일 설정 중..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env 파일이 생성되었습니다."
fi

if [ ! -f apps/web/.env.local ]; then
    cp apps/web/.env.local.example apps/web/.env.local
    echo "✅ apps/web/.env.local 파일이 생성되었습니다."
fi

if [ ! -f packages/db/.env ]; then
    cp packages/db/.env.example packages/db/.env
    echo "✅ packages/db/.env 파일이 생성되었습니다."
fi

# 데이터베이스 설정
echo "🗄️ 데이터베이스 설정 중..."
pnpm db:generate

echo "🎉 프로젝트 초기 설정이 완료되었습니다!"
echo ""
echo "다음 명령어로 개발 서버를 시작할 수 있습니다:"
echo "pnpm dev"