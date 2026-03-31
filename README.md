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
```ts
pnpm install
pnpm run dev
```

---

## 🚧 진행 상태

- [x] 공용 UI 컴포넌트 구축
- [x] 모바일 레이아웃 설계
- [x] 페이지 구조 구성
- [ ] 소비 데이터 CRUD 기능
- [ ] 주요 기능 개발
- [ ] 백엔드 연동 및 데이터 처리

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