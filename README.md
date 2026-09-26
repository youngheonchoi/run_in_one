# run_in_one

React 프로젝트를 두 가지 대표적인 방식으로 시작할 수 있는 npm workspace입니다.

- `apps/vite-react`: Vite + React 클라이언트 앱 (`http://localhost:5173`)
- `apps/nextjs`: Next.js 앱 (`http://localhost:3000`)

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
