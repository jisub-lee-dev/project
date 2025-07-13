# Level 4: Learning Platform 🎓

## 🎯 프로젝트 개요

**Learning Platform**은 실시간 협업, 비디오 스트리밍, 퀴즈 시스템 등을 학습하기 위한 네 번째 프로젝트입니다. 학생과 강사가 실시간으로 상호작용하며, 비디오 강의를 시청하고 퀴즈를 풀 수 있는 온라인 학습 플랫폼을 구축합니다.

## 📋 학습 목표

- ✅ **실시간 협업** 시스템 구현 (WebSocket)
- ✅ **비디오 스트리밍** 및 관리
- ✅ **퀴즈 시스템** 개발
- ✅ **진행도 추적** 시스템
- ✅ **실시간 화상 회의** 기능
- ✅ **학습 분석** 대시보드

## 🏗️ 프로젝트 구조

```
apps/
├── student/                 # 학생용 앱
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 홈페이지
│   │   │   ├── courses/    # 강의 목록
│   │   │   ├── courses/[id] # 강의 상세
│   │   │   ├── lessons/    # 수업 시청
│   │   │   ├── quizzes/    # 퀴즈 풀기
│   │   │   └── progress/   # 학습 진행도
│   │   └── components/     # 학생용 컴포넌트
│   └── package.json
├── teacher/                 # 강사용 앱
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # 대시보드
│   │   │   ├── courses/    # 강의 관리
│   │   │   ├── lessons/    # 수업 관리
│   │   │   ├── students/   # 학생 관리
│   │   │   └── analytics/  # 분석 대시보드
│   │   └── components/     # 강사용 컴포넌트
│   └── package.json
├── admin/                   # 관리자 대시보드
│   ├── src/
│   │   └── app/
│   └── package.json
└── api/                     # REST API 서버
    ├── src/
    └── package.json

packages/
├── db/                      # 데이터베이스 스키마
├── ui/                      # 공유 UI 컴포넌트
├── validation/              # 유효성 검사 스키마
├── utils/                   # 유틸리티 함수
├── realtime/                # 실시간 기능 (새로 추가)
├── video/                   # 비디오 처리 (새로 추가)
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
  role        Role        @default(STUDENT)
  bio         String?
  enrolledCourses Enrollment[]
  createdCourses Course[]
  submissions  QuizSubmission[]
  messages     Message[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

enum Role {
  STUDENT
  TEACHER
  ADMIN
}
```

### Course 모델
```prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  thumbnail   String?
  price       Decimal?
  isPublished Boolean  @default(false)
  isFeatured  Boolean  @default(false)
  level       Level    @default(BEGINNER)
  category    String
  teacherId   String
  teacher     User     @relation(fields: [teacherId], references: [id])
  lessons     Lesson[]
  enrollments Enrollment[]
  quizzes     Quiz[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### Lesson 모델
```prisma
model Lesson {
  id          String   @id @default(cuid())
  title       String
  description String?
  videoUrl    String?
  duration    Int?     // 초 단위
  order       Int
  isPublished Boolean  @default(false)
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])
  progress    Progress[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Enrollment 모델
```prisma
model Enrollment {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  courseId  String
  course    Course   @relation(fields: [courseId], references: [id])
  progress  Progress[]
  completed Boolean  @default(false)
  enrolledAt DateTime @default(now())
  completedAt DateTime?
}
```

### Progress 모델
```prisma
model Progress {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
  enrollmentId String
  enrollment Enrollment @relation(fields: [enrollmentId], references: [id])
  watched   Boolean  @default(false)
  watchTime Int      @default(0) // 초 단위
  completed Boolean  @default(false)
  updatedAt DateTime @updatedAt
}
```

### Quiz 모델
```prisma
model Quiz {
  id          String   @id @default(cuid())
  title       String
  description String?
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])
  questions   Question[]
  submissions QuizSubmission[]
  timeLimit   Int?     // 분 단위
  passingScore Int     @default(70)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Question 모델
```prisma
model Question {
  id      String   @id @default(cuid())
  text    String
  type    QuestionType
  options Json?    // 객관식 옵션들
  answer  String   // 정답
  points  Int      @default(1)
  quizId  String
  quiz    Quiz     @relation(fields: [quizId], references: [id])
  order   Int
}

enum QuestionType {
  MULTIPLE_CHOICE
  TRUE_FALSE
  SHORT_ANSWER
  ESSAY
}
```

### QuizSubmission 모델
```prisma
model QuizSubmission {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  quizId    String
  quiz      Quiz     @relation(fields: [quizId], references: [id])
  answers   Json     // 답변 데이터
  score     Int?
  passed    Boolean?
  submittedAt DateTime @default(now())
}
```

### Message 모델 (실시간 채팅)
```prisma
model Message {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  courseId  String
  course    Course   @relation(fields: [courseId], references: [id])
  type      MessageType @default(TEXT)
  createdAt DateTime @default(now())
}

enum MessageType {
  TEXT
  IMAGE
  FILE
  SYSTEM
}
```

## 🚀 구현 단계

### 1주차: 기본 구조 및 실시간 기능

#### Day 1-2: 프로젝트 설정
- [ ] 데이터베이스 스키마 생성
- [ ] WebSocket 서버 설정 (Socket.io)
- [ ] 기본 UI 컴포넌트 생성

#### Day 3-4: 실시간 채팅
- [ ] WebSocket 연결 관리
- [ ] 실시간 메시지 전송/수신
- [ ] 채팅 UI 구현

#### Day 5-7: 기본 CRUD API
- [ ] Course 생성/수정/삭제 API
- [ ] Lesson 관리 API
- [ ] Enrollment 관리 API

### 2주차: 비디오 스트리밍

#### Day 8-10: 비디오 업로드 및 처리
- [ ] 비디오 업로드 시스템 (AWS S3/Cloudinary)
- [ ] 비디오 변환 및 최적화
- [ ] 스트리밍 URL 생성

#### Day 11-12: 비디오 플레이어
- [ ] 커스텀 비디오 플레이어 구현
- [ ] 진행도 추적 기능
- [ ] 자동 저장 기능

#### Day 13-14: 실시간 화상 회의
- [ ] WebRTC 연결 설정
- [ ] 화상 회의 UI 구현
- [ ] 화면 공유 기능

### 3주차: 퀴즈 시스템

#### Day 15-17: 퀴즈 관리
- [ ] 퀴즈 생성/편집 시스템
- [ ] 다양한 문제 유형 지원
- [ ] 퀴즈 결과 분석

#### Day 18-19: 퀴즈 풀기
- [ ] 퀴즈 플레이어 구현
- [ ] 실시간 채점 시스템
- [ ] 결과 피드백

#### Day 20-21: 학습 분석
- [ ] 진행도 대시보드
- [ ] 학습 패턴 분석
- [ ] 성과 리포트

## 🛠️ 기술 스택

### 백엔드
- **Prisma**: 데이터베이스 ORM
- **Next.js API Routes**: REST API
- **Socket.io**: WebSocket 통신
- **WebRTC**: 실시간 화상 통신

### 프론트엔드
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **shadcn/ui**: UI 컴포넌트
- **Tailwind CSS**: 스타일링

### 비디오 처리
- **AWS S3/Cloudinary**: 비디오 저장
- **FFmpeg**: 비디오 변환
- **HLS/DASH**: 스트리밍 프로토콜

### 실시간 기능
- **Socket.io**: 실시간 통신
- **WebRTC**: P2P 화상 통신
- **MediaRecorder API**: 화면 녹화

### 공유 패키지
- **@repo/db**: 데이터베이스 클라이언트
- **@repo/validation**: Zod 스키마
- **@repo/ui**: 공유 컴포넌트
- **@repo/utils**: 유틸리티 함수
- **@repo/realtime**: 실시간 기능 (새로 추가)
- **@repo/video**: 비디오 처리 (새로 추가)
- **@repo/analytics**: 분석 도구 (새로 추가)

## 📝 구현 예시

### 실시간 채팅 컴포넌트
```typescript
// apps/student/src/components/ChatRoom.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@repo/realtime';
import { Button, Input } from '@repo/ui';

interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export function ChatRoom({ courseId }: { courseId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('join-room', courseId);

    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.emit('leave-room', courseId);
      socket.off('message');
    };
  }, [socket, courseId]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    socket.emit('send-message', {
      courseId,
      content: input,
    });

    setInput('');
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              {message.userName[0]}
            </div>
            <div>
              <div className="font-semibold text-sm">{message.userName}</div>
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={!isConnected}>
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 비디오 플레이어 컴포넌트
```typescript
// apps/student/src/components/VideoPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

interface VideoPlayerProps {
  lessonId: string;
  videoUrl: string;
  onProgress: (progress: number) => void;
}

export function VideoPlayer({ lessonId, videoUrl, onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressMutation = useMutation({
    mutationFn: async (data: { lessonId: string; watchTime: number }) => {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setCurrentTime(video.currentTime);
      onProgress(progress);

      // 10초마다 진행도 저장
      if (Math.floor(video.currentTime) % 10 === 0) {
        progressMutation.mutate({
          lessonId,
          watchTime: Math.floor(video.currentTime),
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [lessonId, onProgress, progressMutation]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full rounded-lg"
      />
      <div className="mt-2 text-sm text-gray-600">
        진행도: {Math.round((currentTime / duration) * 100)}%
      </div>
    </div>
  );
}
```

### 퀴즈 플레이어 컴포넌트
```typescript
// apps/student/src/components/QuizPlayer.tsx
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Card } from '@repo/ui';

interface Question {
  id: string;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  options?: string[];
  points: number;
}

interface QuizPlayerProps {
  quizId: string;
  questions: Question[];
  timeLimit?: number;
}

export function QuizPlayer({ quizId, questions, timeLimit }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : null);

  const submitMutation = useMutation({
    mutationFn: async (data: { quizId: string; answers: Record<string, any> }) => {
      const response = await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      quizId,
      answers,
    });
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          문제 {currentQuestion + 1} / {questions.length}
        </div>
        {timeLeft && (
          <div className="text-sm text-red-600">
            남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
        
        {question.type === 'MULTIPLE_CHOICE' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  checked={answers[question.id] === option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'TRUE_FALSE' && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={question.id}
                value="true"
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                checked={answers[question.id] === 'true'}
              />
              <span>참</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={question.id}
                value="false"
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                checked={answers[question.id] === 'false'}
              />
              <span>거짓</span>
            </label>
          </div>
        )}

        {question.type === 'SHORT_ANSWER' && (
          <textarea
            className="w-full p-2 border rounded"
            placeholder="답을 입력하세요..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        )}
      </Card>

      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          이전
        </Button>
        
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleSubmit} disabled={submitMutation.isPending}>
            제출
          </Button>
        ) : (
          <Button onClick={() => setCurrentQuestion(prev => prev + 1)}>
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
```

## 🎨 UI/UX 가이드

### 디자인 원칙
- **접근성**: 모든 학습자가 편리하게 사용할 수 있는 인터페이스
- **반응성**: 실시간 피드백과 즉각적인 상호작용
- **집중도**: 학습에 방해되지 않는 깔끔한 디자인

### 색상 팔레트
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Success**: Green (#059669)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

## 📊 성능 최적화

### 프론트엔드
- **React Query**: 강의 데이터 캐싱
- **Code Splitting**: 강의별 코드 분할
- **Lazy Loading**: 비디오 지연 로딩

### 백엔드
- **Prisma**: 데이터베이스 쿼리 최적화
- **Redis**: 실시간 데이터 캐싱
- **CDN**: 비디오 스트리밍 최적화

## 🧪 테스트 전략

### 단위 테스트
- **퀴즈 시스템**: 문제 생성 및 채점 테스트
- **비디오 플레이어**: 진행도 추적 테스트
- **실시간 채팅**: 메시지 전송/수신 테스트

### 통합 테스트
- **학습 플로우**: 강의 시청부터 퀴즈 제출까지
- **실시간 협업**: 다중 사용자 채팅
- **화상 회의**: WebRTC 연결 및 통신

## 🚀 배포

### 개발 환경
- **로컬**: `pnpm dev`
- **데이터베이스**: Docker PostgreSQL
- **WebSocket**: Socket.io 개발 서버
- **비디오**: 로컬 파일 또는 개발용 CDN

### 프로덕션 환경
- **Vercel**: Next.js 앱 배포
- **PlanetScale**: 데이터베이스 호스팅
- **Socket.io**: 실시간 서버
- **AWS S3/Cloudinary**: 비디오 호스팅
- **Redis**: 캐싱 및 세션 관리

## 📚 추가 학습 자료

- [Socket.io 공식 문서](https://socket.io/docs/)
- [WebRTC 공식 문서](https://webrtc.org/getting-started/overview)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [HLS 스트리밍](https://developer.apple.com/documentation/http_live_streaming)

## 🎯 다음 단계

Level 4 완료 후 다음을 확인하세요:
- ✅ 실시간 채팅이 안정적으로 작동하는가?
- ✅ 비디오 스트리밍이 부드럽게 재생되는가?
- ✅ 퀴즈 시스템이 정확히 채점하는가?
- ✅ 학습 분석이 유용한 인사이트를 제공하는가?

**모든 항목이 완료되면 [Level 5: E-commerce Suite](./level-5-ecommerce-suite.md)으로 진행하세요!**

---

**Happy Coding! 🚀** 