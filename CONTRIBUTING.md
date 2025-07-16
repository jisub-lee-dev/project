# 기여 가이드

이 프로젝트에 기여해주셔서 감사합니다! 다음 가이드라인을 따라주세요.

## 🚀 개발 환경 설정

1. **저장소 포크 및 클론**

```bash
git clone https://github.com/your-username/project.git
cd project
```

2. **의존성 설치**

```bash
pnpm install
```

3. **환경 변수 설정**

```bash
pnpm setup
```

## 📝 코딩 규칙

### **일반 규칙**

- TypeScript를 사용하세요
- ESLint 규칙을 준수하세요
- Prettier로 코드를 포맷팅하세요
- 의미 있는 커밋 메시지를 작성하세요

### **커밋 메시지 규칙**

```
type(scope): description

예시:
feat(ui): add new button component
fix(db): resolve connection issue
docs(readme): update installation guide
```

**타입:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스 또는 도구 변경

### **브랜치 전략**

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 새로운 기능
- `fix/*`: 버그 수정
- `docs/*`: 문서 업데이트

## 🧪 테스트

```bash
# 코드 품질 검사
pnpm check-all

# 타입 체크
pnpm type-check

# 린팅
pnpm lint

# 포맷팅 체크
pnpm format:check
```

## 📦 패키지 추가

새로운 의존성을 추가할 때:

1. **루트 레벨 의존성** (개발 도구)

```bash
pnpm add -D <package-name>
```

2. **특정 패키지 의존성**

```bash
pnpm --filter <package-name> add <dependency>
```

3. **워크스페이스 의존성**

```bash
pnpm --filter <package-name> add @repo/<other-package>
```

## 🔄 Pull Request 프로세스

1. **브랜치 생성**

```bash
git checkout -b feature/your-feature-name
```

2. **변경사항 커밋**

```bash
git add .
git commit -m "feat: add your feature"
```

3. **푸시 및 PR 생성**

```bash
git push origin feature/your-feature-name
```

4. **PR 체크리스트**

- [ ] 코드가 린팅 규칙을 통과하는가?
- [ ] 타입 체크가 통과하는가?
- [ ] 빌드가 성공하는가?
- [ ] 관련 문서가 업데이트되었는가?
- [ ] 테스트가 추가되었는가? (해당하는 경우)

## 🐛 버그 리포트

버그를 발견하셨나요? 다음 정보를 포함해서 이슈를 생성해주세요:

- **환경 정보**: OS, Node.js 버전, 브라우저
- **재현 단계**: 버그를 재현하는 방법
- **예상 동작**: 어떻게 동작해야 하는지
- **실제 동작**: 실제로 어떻게 동작하는지
- **스크린샷**: 가능한 경우

## 💡 기능 제안

새로운 기능을 제안하고 싶으시다면:

1. **이슈 생성**: 기능 제안 템플릿 사용
2. **논의**: 커뮤니티와 논의
3. **승인 후 개발**: 승인된 후 개발 시작

## 📞 도움이 필요하신가요?

- **이슈**: GitHub Issues에서 질문
- **토론**: GitHub Discussions 활용
- **이메일**: your-email@example.com

감사합니다! 🙏
