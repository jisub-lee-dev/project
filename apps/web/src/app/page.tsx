"use client";

import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const techStack = [
  { name: "Next.js", version: "15", color: "bg-black text-white" },
  { name: "React", version: "19", color: "bg-blue-500 text-white" },
  { name: "TypeScript", version: "5.6", color: "bg-blue-600 text-white" },
  { name: "Tailwind CSS", version: "v4", color: "bg-cyan-500 text-white" },
  { name: "Turborepo", version: "2.5", color: "bg-red-500 text-white" },
  { name: "Framer Motion", version: "12", color: "bg-purple-500 text-white" },
];

const features = [
  {
    icon: "🚀",
    title: "고성능 빌드 시스템",
    description: "Turborepo와 PNPM으로 최적화된 모노레포",
    details: "캐싱, 병렬 처리, 증분 빌드로 개발 속도 향상",
    progress: 95,
  },
  {
    icon: "🛠️",
    title: "현대적 기술 스택",
    description: "최신 웹 기술로 구성된 개발 환경",
    details: "React 19, Next.js 15, TypeScript 5.6 지원",
    progress: 100,
  },
  {
    icon: "📦",
    title: "모듈화된 아키텍처",
    description: "체계적인 패키지 관리와 코드 공유",
    details: "UI, DB, Utils, Validation 패키지 분리",
    progress: 90,
  },
  {
    icon: "🎨",
    title: "디자인 시스템",
    description: "shadcn/ui 기반 컴포넌트 라이브러리",
    details: "일관된 UI/UX와 접근성 준수",
    progress: 85,
  },
  {
    icon: "⚡",
    title: "개발자 경험",
    description: "최적화된 DX와 개발 도구",
    details: "Hot Reload, TypeScript, ESLint, Prettier",
    progress: 92,
  },
  {
    icon: "🔒",
    title: "타입 안전성",
    description: "엔드투엔드 타입 안전성 보장",
    details: "API부터 UI까지 완전한 타입 체크",
    progress: 88,
  },
];

const packageStructure = [
  { name: "apps/web", description: "Next.js 웹 애플리케이션", files: "45개 파일" },
  { name: "packages/ui", description: "공유 UI 컴포넌트", files: "28개 파일" },
  { name: "packages/db", description: "데이터베이스 스키마", files: "12개 파일" },
  { name: "packages/utils", description: "유틸리티 함수", files: "15개 파일" },
  { name: "packages/validation", description: "스키마 검증", files: "8개 파일" },
];

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
        />

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Modern Full-Stack
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block text-primary"
              >
                Monorepo
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              프로덕션 준비 완료된 현대적인 웹 개발 플랫폼
              <br />
              <span className="text-lg">최신 기술 스택과 최적화된 개발 경험을 제공합니다</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge className={`${tech.color} px-4 py-2 text-sm font-medium`}>
                    {tech.name} {tech.version}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">핵심 기능</h2>
            <p className="text-xl text-muted-foreground">
              현대적인 웹 개발을 위한 모든 것이 준비되어 있습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFeature(index)}
                className="cursor-pointer"
              >
                <Card className={`h-full transition-all duration-300 ${selectedFeature === index ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {feature.details}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>완성도</span>
                        <span>{feature.progress}%</span>
                      </div>
                      <Progress value={feature.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">프로젝트 구조</h2>
            <p className="text-xl text-muted-foreground">
              체계적으로 구성된 모노레포 아키텍처
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 border"
            >
              <div className="space-y-4">
                {packageStructure.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div>
                        <h3 className="font-mono font-semibold text-primary">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                      {pkg.files}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">지금 시작해보세요</h2>
            <p className="text-xl text-muted-foreground mb-8">
              몇 분 안에 현대적인 웹 애플리케이션 개발을 시작할 수 있습니다
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 border mb-8"
            >
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-2">터미널에서 실행:</p>
                <code className="block bg-muted p-4 rounded font-mono text-sm">
                  git clone https://github.com/jisub-lee-dev/project<br />
                  cd project<br />
                  pnpm setup<br />
                  pnpm dev
                </code>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground">
              Made with ❤️ using Modern Full-Stack Monorepo
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © 2025 - Built with Next.js, React, TypeScript & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
