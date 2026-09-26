# run_in_one 작업 규칙

## 프로젝트 개요

`run_in_one`은 러너를 위한 올인원 서비스다. 현재 MVP 범위는 다음 두 화면으로 제한한다.

- 대시보드: 주간 러닝 요약, 최근 러닝, 주간 거리 시각화
- 페이스 계산기: 거리와 시간을 입력해 평균 페이스와 예상 완주 시간을 계산

기본 구현 대상은 `apps/vite-react`다. `apps/nextjs`는 별도의 Next.js 시작점으로 유지한다.

## UI 기준

- 작업 전 `.codex/okerry_ui/AGENTS.md`, `DESIGN.md`, 각 디렉터리 README를 읽는다.
- `.codex/`는 로컬 참고 문서이며 전체를 커밋하지 않는다.
- 시각 언어는 Okerry UI를 따른다: 흰색 surface, 짙은 녹색 단일 강조, 1px border, 그림자 최소화.
- 페이지·섹션 제목만 serif를 사용하고, 나머지는 Nanum Gothic 산세리프를 사용한다.
- 그라데이션, glassmorphism, 이모지 아이콘, 색 원형 아이콘 카드, 두꺼운 색상 왼쪽 border를 사용하지 않는다.
- UI 클래스는 `okerry-` 접두사를 사용한다. 제품 기능용 클래스는 `run-` 접두사를 사용한다.
- 색상, 간격, radius, shadow는 Okerry 토큰을 우선 사용한다.
- 폼에는 연결된 `label`과 `id`, 버튼에는 `type`, 아이콘 전용 버튼에는 `aria-label`을 제공한다.
- 900px 이하에서 사이드 내비게이션은 가로 스크롤 상단 내비게이션으로 바뀌고, 768px 이하에서 다단 레이아웃은 한 열이 된다.

## 실행과 검증

```bash
npm install
npm run dev:vite
npm run lint
npm run build
```

MVP에서 새로운 메뉴나 서버 연동을 추가하기 전에 화면 흐름과 범위를 먼저 갱신한다.

## Git 커밋

- 상세 규칙은 `.codex/doc/git-convention.md`를 따른다.
- 커밋 메시지는 유형과 설명 모두 한글로 작성한다. 예: `기능: 페이스 계산기 개선`
- 커밋 전 `git diff --check`를 실행하고, 변경에 맞는 lint와 build를 확인한다.
