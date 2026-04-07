# 📱 apoorpoor-refactor

> 모바일 웹앱 기반 소비 관리 서비스 (개발 진행 중)

🔗 Live Demo: https://apoorpoor-refactor.vercel.app/

---

## 🗓️ 작업 기간
- 2026.03.27 ~

---

## 📌 프로젝트 소개

`apoorpoor-refactor`는 기존 React 기반 프로젝트를  
**Next.js App Router 구조로 리팩토링**하며,  
모바일 환경에 최적화된 소비 관리 웹앱으로 재구성하는 프로젝트입니다.

단순 UI 구현이 아닌,  
**실제 서비스로 확장 가능한 구조와 데이터 흐름 설계**에 초점을 두고 있습니다.

---

## 🧑‍💻 개발 방향

- 📱 모바일 웹앱 UX 중심 설계 (최대 430px 레이아웃)
- 🧩 재사용 가능한 컴포넌트 기반 구조 설계
- 🧠 타입 안정성을 고려한 데이터 모델링
- ⚙️ 확장 가능한 아키텍처 (프론트 → 풀스택 확장 고려)

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript

### UI / Styling
- MUI (Material UI)
- styled API
- Design Token 기반 스타일링

---

## 📂 프로젝트 구조

```ts
src/
├── app/                // App Router 기반 페이지
├── shared/
│   └── ui/            // 공용 UI 컴포넌트
├── styles/
│   └── theme/         // 디자인 토큰 및 테마
```

---

## 🚀 실행 방법

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 환경변수 설정
각 패키지의 `.env.example`을 참고하여 `.env` / `.env.local` 파일을 생성합니다.
```bash
cp packages/db/.env.example packages/db/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.local
```

### 3. DB 셋업
Docker로 PostgreSQL을 실행하고, 마이그레이션 및 시드 데이터를 적용합니다.
```bash
pnpm db:setup
```
> 이 명령은 `docker compose up -d` → `prisma migrate deploy` → `prisma db seed`를 순서대로 실행합니다.
> 처음 세팅하거나 DB를 초기화(`docker compose down -v`)한 경우에만 실행하면 됩니다.

### 4. 개발 서버 실행
```bash
pnpm dev
```

---

## 🚧 진행 상태

- [x] 공용 UI 컴포넌트 구축
- [x] 모바일 레이아웃 설계
- [x] 페이지 구조 구성
- [ ] 소비 데이터 CRUD 기능
- [ ] 주요 기능 개발
- [x] 백엔드 연동 및 데이터 처리

---

## 🔜 앞으로의 계획

- 사용자 인증 시스템 구현
- 소비 데이터 관리 기능 고도화
- 백엔드 API 설계 및 연동
- 차트 및 데이터 시각화 고도화
- 실제 서비스 배포 및 운영 고려

---

## 💡 목표

단순한 UI 구현을 넘어,  
**실제 서비스로 확장 가능한 구조와 설계를 갖춘 풀스택 프로젝트**를 만드는 것을 목표로 합니다.