# AuthGuard 테스트 가이드

## 개요

AuthGuard는 페이지 접근 권한을 검증하는 컴포넌트입니다.

## 테스트 환경 구분

### 1. E2E 테스트 환경 (자동화)

**환경변수**: `NEXT_PUBLIC_TEST_ENV=test`

**동작**:
- 모든 페이지 접근 허용 (로그인 여부와 무관)
- E2E 테스트가 원활하게 진행되도록 Guard 우회

**실행 방법**:
```bash
npm run test:e2e -- src/commons/providers/auth/tests/auth.guard.spec.ts
```

**검증 내용**:
- ✅ 비로그인 유저도 anyone 페이지 접근 가능
- ✅ 비로그인 유저도 memberOnly 페이지 접근 가능 (테스트 환경)
- ✅ 로그인 유저의 페이지 접근 가능
- ✅ 로그인 모달이 표시되지 않음 (테스트 환경)

---

### 2. 프로덕션 환경 (수동 테스트)

**환경변수**: `NEXT_PUBLIC_TEST_ENV` 미설정 또는 다른 값

**동작**:
- `url.ts`의 `accessType`에 따라 실제 권한 검증
- `memberOnly` 페이지는 로그인 사용자만 접근 가능
- `anyone` 페이지는 모든 사용자 접근 가능

#### 수동 테스트 시나리오

##### 시나리오 1: 비로그인 유저의 memberOnly 페이지 접근

1. **환경 설정**
   ```bash
   # .env.local 파일 생성 (또는 환경변수 제거)
   # NEXT_PUBLIC_TEST_ENV를 설정하지 않음
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **테스트 단계**
   - 브라우저에서 `http://localhost:3000` 접속
   - 개발자 도구(F12) > Application > Local Storage 초기화
   - `http://localhost:3000/diaries/1` 접속

4. **예상 결과**
   - ✅ 로그인 요청 모달 표시
   - ✅ 모달 제목: "로그인이 필요합니다"
   - ✅ 모달 설명: "이 페이지는 로그인 후 이용하실 수 있습니다."
   - ✅ 확인 버튼 클릭 시 `/auth/login` 페이지로 이동

##### 시나리오 2: 로그인 유저의 memberOnly 페이지 접근

1. **로그인 진행**
   - `http://localhost:3000/auth/login` 접속
   - 이메일: `a@c.com`, 비밀번호: `1234qwer` 입력
   - 로그인 완료

2. **테스트 단계**
   - `http://localhost:3000/diaries/1` 접속

3. **예상 결과**
   - ✅ 일기 상세 페이지 정상 표시
   - ✅ 로그인 모달 표시되지 않음

##### 시나리오 3: anyone 페이지 접근

1. **비로그인 상태에서**
   - `http://localhost:3000/diaries` 접속

2. **예상 결과**
   - ✅ 일기 목록 페이지 정상 표시
   - ✅ 로그인 모달 표시되지 않음

---

## 페이지 권한 설정

`src/commons/constants/url.ts`에 정의됨:

| 페이지 | 경로 | accessType |
|--------|------|-----------|
| 로그인 | `/auth/login` | `anyone` |
| 회원가입 | `/auth/signup` | `anyone` |
| 일기목록 | `/diaries` | `anyone` |
| 일기상세 | `/diaries/[id]` | `memberOnly` |
| 사진목록 | `/pictures` | `anyone` |

---

## 테스트 체크리스트

### E2E 자동 테스트 (테스트 환경)
- [x] 비로그인 유저 anyone 페이지 접근
- [x] 비로그인 유저 memberOnly 페이지 접근 (테스트 환경 우회)
- [x] 로그인 유저 memberOnly 페이지 접근
- [x] 로그인 유저 anyone 페이지 접근

### 수동 테스트 (프로덕션 환경)
- [ ] 비로그인 유저 memberOnly 페이지 접근 시 모달 표시
- [ ] 모달 확인 버튼 클릭 시 로그인 페이지 이동
- [ ] 로그인 유저 memberOnly 페이지 정상 접근
- [ ] anyone 페이지 로그인 여부와 무관하게 접근

---

## 문제 해결

### 테스트 환경에서 모달이 표시되지 않음
- **원인**: `NEXT_PUBLIC_TEST_ENV=test` 설정으로 Guard가 우회됨
- **해결**: 프로덕션 환경 테스트를 위해 환경변수 제거

### 프로덕션 환경에서 모달이 표시되지 않음
- **원인**: `NEXT_PUBLIC_TEST_ENV=test`가 설정되어 있음
- **해결**: `.env.local` 파일 확인 및 환경변수 제거

### 모달이 중복 표시됨
- **원인**: `modalShownRef`가 제대로 작동하지 않음
- **해결**: AuthGuard 컴포넌트 재확인 필요
