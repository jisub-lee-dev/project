import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Modern Full-Stack
            <span className="text-primary"> Monorepo</span>
          </h1>

          <p className="text-muted-foreground text-xl">
            Next.js 15, React 19, TypeScript, Tailwind CSS v4로 구축된
            <br />
            현대적인 웹 개발 보일러플레이트
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              시작하기
            </Button>
            <Button variant="outline" size="lg" className="px-8 text-lg">
              문서 보기
            </Button>
          </div>
        </div>

        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 고성능
              </CardTitle>
              <CardDescription>
                Turborepo와 PNPM으로 최적화된 빌드 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                캐싱과 병렬 처리로 빠른 개발 경험을 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛠️ 현대적 스택
              </CardTitle>
              <CardDescription>
                최신 기술 스택으로 구성된 개발 환경
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Next.js 15, React 19, TypeScript, Tailwind CSS v4를 사용합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 모노레포
              </CardTitle>
              <CardDescription>
                체계적인 패키지 관리와 코드 공유
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                UI, DB, Utils, Validation 패키지로 구조화되어 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
