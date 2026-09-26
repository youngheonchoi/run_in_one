# run_in_one

러닝 정보를 한곳에서 관리하는 올인원 서비스의 MVP입니다. 모바일 우선으로 대시보드와 페이스 계산기를 제공합니다.

React 프로젝트를 두 가지 대표적인 방식으로 시작할 수 있는 npm workspace입니다.

- `apps/vite-react`: Vite + React 클라이언트 앱 (`http://localhost:5173`)
- `apps/nextjs`: Next.js 앱 (`http://localhost:3000`)

MVP 기능:

- 대시보드: 주간 요약, 거리 차트, 목표 진행률, 최근 러닝
- 페이스 계산기: 거리·시간 입력, 평균 페이스, 풀코스 예상 기록

## 시작하기

```bash
npm install
npm run dev:vite
# 또는
npm run dev:next
```

두 앱을 동시에 실행하려면 터미널을 각각 열어 위 명령을 실행하세요.

## 검증

```bash
npm run build
npm run lint
```
