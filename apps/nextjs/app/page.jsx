'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const runs = [
  { date: '오늘, 06:42', type: '이지런', distance: '6.2 km', pace: '5:42 /km', time: '35:22', tone: 'okerry-badge-primary' },
  { date: '화요일, 19:18', type: '템포런', distance: '8.0 km', pace: '5:08 /km', time: '41:04', tone: 'okerry-badge-warning' },
  { date: '일요일, 07:10', type: '롱런', distance: '14.5 km', pace: '5:56 /km', time: '1:26:02', tone: 'okerry-badge-success' },
]

const weeklyDistance = [
  { day: '월', value: 5.4 }, { day: '화', value: 8 }, { day: '수', value: 0 },
  { day: '목', value: 6.2 }, { day: '금', value: 4.8 }, { day: '토', value: 0 }, { day: '일', value: 14.5 },
]

const calculators = [
  { id: 'pace', label: '페이스 계산기', shortLabel: '페이스' },
  { id: 'treadmill', label: '트레드밀 계산기', shortLabel: '트레드밀' },
  { id: 'buildup', label: '빌드업 계산기', shortLabel: '빌드업' },
]

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    calculator: <><rect x="5" y="2.5" width="14" height="19" rx="2" /><path d="M8 6.5h8M8 11h1M12 11h1M16 11h.01M8 15h1M12 15h1M16 15h.01M8 19h1M12 19h1M16 19h.01" /></>,
    activity: <path d="M3 12h4l2.5-7 5 14 2.5-7H21" />,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    trend: <><path d="m4 16 5-5 3 3 7-8" /><path d="M14 6h5v5" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  const [screen, setScreen] = useState('dashboard')
  const [showNavHint, setShowNavHint] = useState(false)
  const [now, setNow] = useState(null)
  const navRef = useRef(null)
  const activeCalculator = calculators.find((calculator) => calculator.id === screen)
  const isCalculatorScreen = Boolean(activeCalculator)

  useEffect(() => {
    const updateNow = () => setNow(new Date())
    updateNow()
    const timer = window.setInterval(updateNow, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return undefined
    const updateNavHint = () => setShowNavHint(nav.scrollWidth > nav.clientWidth + 1 && nav.scrollLeft < 8)
    updateNavHint()
    window.addEventListener('resize', updateNavHint)
    return () => window.removeEventListener('resize', updateNavHint)
  }, [])

  return <div className="okerry_ui run-app"><div className="okerry-shell">
    <aside className="okerry-sidebar" aria-label="주 메뉴">
      <div className="okerry-sidebar-brand run-brand"><img className="run-brand-image" src="/run-in-one-logo.png" alt="run in one" /></div>
      <div className="run-nav-wrap"><nav ref={navRef} className="okerry-nav" onScroll={(event) => { if (event.currentTarget.scrollLeft > 8) setShowNavHint(false) }}>
        <button className={`okerry-nav-item ${screen === 'dashboard' ? 'is-active' : ''}`} type="button" aria-current={screen === 'dashboard' ? 'page' : undefined} onClick={() => setScreen('dashboard')}><Icon name="grid" /> 대시보드</button>
        <button className={`okerry-nav-item run-calculator-parent ${isCalculatorScreen ? 'is-active' : ''}`} type="button" aria-current={isCalculatorScreen ? 'page' : undefined} onClick={() => setScreen('pace')}><Icon name="calculator" /> 계산기</button>
      </nav>{showNavHint && <span className="run-nav-hint" aria-hidden="true">옆으로 밀기 <Icon name="arrow" size={12} /></span>}</div>
    </aside>
    <main className="okerry-main"><header className="okerry-topbar"><span className="run-mobile-title">{screen === 'dashboard' ? '대시보드' : activeCalculator.label}</span><span className="run-topbar-meta" aria-live="polite">{now ? <><span>{new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(now)}</span><span className="run-topbar-clock">{new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now)}</span></> : '시간 불러오는 중'}</span><div className="run-topbar-right"><div className="run-profile"><span className="run-avatar">오</span><span><strong>오케리</strong></span></div></div></header>{screen === 'dashboard' ? <Dashboard onOpenCalculator={() => setScreen('pace')} /> : screen === 'pace' ? <PaceCalculatorV2 onSelectCalculator={setScreen} /> : <CalculatorPlaceholder calculator={activeCalculator} onSelectCalculator={setScreen} />}</main>
  </div></div>
}

function Dashboard({ onOpenCalculator }) {
  return <div className="okerry-content">
    <header className="okerry-page-header run-page-header"><div className="okerry-page-header-text"><p className="run-kicker">MONDAY, OCTOBER 21</p><h1 className="run-page-title">좋은 아침이에요, 오케리.</h1><p className="okerry-page-description">이번 주도 꾸준히 달리고 있어요. 오늘의 러닝을 준비해볼까요?</p></div><div className="okerry-page-actions"><button className="okerry-btn okerry-btn-primary okerry-btn-lg" type="button" onClick={onOpenCalculator}><Icon name="calculator" size={16} /> 페이스 계산하기</button></div></header>
    <section className="okerry-section-sm run-dashboard-section" aria-labelledby="summary-title"><div className="okerry-section-header"><div><h2 id="summary-title" className="run-section-title">이번 주 요약</h2><p className="run-section-caption">10월 15일 – 10월 21일</p></div><span className="okerry-badge okerry-badge-success okerry-badge-dot">목표 진행 중</span></div><div className="okerry-stat-row">
      <div className="okerry-stat"><span className="okerry-stat-label">총 거리</span><strong className="okerry-stat-value">38.9 km</strong><span className="okerry-stat-delta is-up"><Icon name="trend" size={12} /> 지난주보다 12%</span></div>
      <div className="okerry-stat"><span className="okerry-stat-label">러닝 횟수</span><strong className="okerry-stat-value">5회</strong><span className="okerry-stat-delta">목표 4회 대비 +1</span></div>
      <div className="okerry-stat"><span className="okerry-stat-label">평균 페이스</span><strong className="okerry-stat-value">5:36</strong><span className="okerry-stat-delta">분 / km</span></div>
      <div className="okerry-stat"><span className="okerry-stat-label">러닝 시간</span><strong className="okerry-stat-value">3:38</strong><span className="okerry-stat-delta">시간 · 42분</span></div>
    </div></section>
    <div className="okerry-grid okerry-grid-aside run-dashboard-grid"><section className="okerry-card okerry-card-flat" aria-labelledby="weekly-title"><div className="okerry-card-header okerry-between"><div><h2 id="weekly-title" className="run-section-title">주간 거리</h2><p className="okerry-card-description">이번 주 러닝 기록을 한눈에 확인하세요.</p></div><strong className="run-card-total">38.9 <span>km</span></strong></div><div className="okerry-card-body"><WeeklyChart /></div></section><section className="okerry-card okerry-card-flat" aria-labelledby="goal-title"><div className="okerry-card-header"><h2 id="goal-title" className="run-section-title">주간 목표</h2><p className="okerry-card-description">이번 주 목표를 82% 달성했어요.</p></div><div className="okerry-card-body run-goal-body"><div className="run-progress-ring"><strong>82<span>%</span></strong></div><div><strong className="run-goal-value">38.9 / 47.5 km</strong><p className="okerry-card-description">남은 거리 <b>8.6 km</b></p></div></div><div className="okerry-card-footer"><button className="okerry-btn okerry-btn-link" type="button" onClick={onOpenCalculator}>목표 페이스 계산 <Icon name="arrow" size={14} /></button></div></section></div>
    <section className="run-recent-section" aria-labelledby="recent-title"><div className="okerry-section-header"><div><h2 id="recent-title" className="run-section-title">최근 러닝</h2><p className="run-section-caption">가장 최근에 기록한 러닝이에요.</p></div><button className="okerry-btn okerry-btn-secondary okerry-btn-sm" type="button">전체 보기 <Icon name="arrow" size={14} /></button></div><div className="okerry-list">{runs.map((run) => <div className="okerry-list-item" key={run.date}><span className="run-run-icon"><Icon name="activity" size={18} /></span><span className="okerry-list-body"><strong className="okerry-list-title">{run.type}</strong><span className="okerry-list-meta">{run.date}</span></span><span className={`okerry-badge ${run.tone}`}>{run.distance}</span><span className="run-list-detail"><strong>{run.pace}</strong><small>{run.time}</small></span><button className="okerry-btn okerry-btn-ghost okerry-btn-icon okerry-btn-sm" type="button" aria-label={`${run.type} 상세 보기`}><Icon name="arrow" size={15} /></button></div>)}</div></section>
    <aside className="run-insight okerry-panel"><span className="run-insight-label"><Icon name="activity" size={14} /> RUNNING INSIGHT</span><p>이번 주 평균 페이스가 지난주보다 <strong>18초 빨라졌어요.</strong> 무리하지 않고 지금의 리듬을 이어가 보세요.</p></aside>
  </div>
}

function WeeklyChart() { return <div className="run-chart"><div className="run-chart-y"><span>16</span><span>12</span><span>8</span><span>4</span><span>0</span></div><div className="run-chart-main"><div className="run-chart-gridlines"><i /><i /><i /><i /><i /></div><div className="run-bars">{weeklyDistance.map((item) => <div className="run-bar-col" key={item.day}><div className={`run-bar run-bar-${String(item.value).replace('.', '-')} ${item.value === 0 ? 'is-empty' : ''}`}><span>{item.value || ''}</span></div><small>{item.day}</small></div>)}</div></div></div> }

function CalculatorTabs({ activeCalculator, onSelectCalculator }) {
  return <nav className="run-calculator-tabs" aria-label="계산기 종류">{calculators.map((calculator) => <button className={`run-calculator-tab ${calculator.id === activeCalculator ? 'is-active' : ''}`} type="button" key={calculator.id} aria-current={calculator.id === activeCalculator ? 'page' : undefined} onClick={() => onSelectCalculator(calculator.id)}>{calculator.shortLabel}</button>)}</nav>
}

function CalculatorPlaceholder({ calculator, onSelectCalculator }) {
  return <div className="okerry-content run-calculator-page"><header className="okerry-page-header run-page-header"><div className="okerry-page-header-text"><p className="run-kicker">TOOLS / COMING SOON</p><h1 className="run-page-title">{calculator.label}</h1><p className="okerry-page-description">훈련에 바로 활용할 수 있는 계산기를 준비하고 있어요.</p></div></header><CalculatorTabs activeCalculator={calculator.id} onSelectCalculator={onSelectCalculator} /><section className="run-coming-soon okerry-card okerry-card-flat"><div className="okerry-card-body"><span className="run-result-label"><Icon name="calculator" size={16} /> COMING SOON</span><h2 className="run-section-title">{calculator.label}는 준비 중입니다.</h2><p className="okerry-card-description">완성 전까지는 페이스 계산기로 거리와 기록을 먼저 확인해 보세요.</p><button className="okerry-btn okerry-btn-primary" type="button" onClick={() => onSelectCalculator('pace')}>페이스 계산기 열기 <Icon name="arrow" size={14} /></button></div></section></div>
}

function PaceCalculator({ onSelectCalculator }) {
  const [distance, setDistance] = useState('10'); const [hours, setHours] = useState('0'); const [minutes, setMinutes] = useState('52'); const [seconds, setSeconds] = useState('30'); const [unit, setUnit] = useState('km')
  const result = useMemo(() => { const km = Number(distance || 0) * (unit === 'mi' ? 1.60934 : 1); const totalSeconds = Number(hours || 0) * 3600 + Number(minutes || 0) * 60 + Number(seconds || 0); if (!km || !totalSeconds) return { pace: '--:--', finish: '--:--:--' }; const paceSeconds = totalSeconds / km; return { pace: `${Math.floor(paceSeconds / 60)}:${Math.round(paceSeconds % 60).toString().padStart(2, '0')}`, finish: formatDuration(paceSeconds * 42.195) } }, [distance, hours, minutes, seconds, unit])
  return <div className="okerry-content run-calculator-page"><header className="okerry-page-header run-page-header"><div className="okerry-page-header-text"><p className="run-kicker">TOOLS / PACE</p><h1 className="run-page-title">페이스 계산기</h1><p className="okerry-page-description">거리와 시간을 입력하면 평균 페이스와 마라톤 예상 기록을 계산해 드려요.</p></div></header><CalculatorTabs activeCalculator="pace" onSelectCalculator={onSelectCalculator} /><div className="okerry-grid okerry-grid-aside run-calculator-grid"><section className="okerry-card okerry-card-flat"><div className="okerry-card-header"><h2 className="run-section-title">러닝 정보 입력</h2><p className="okerry-card-description">기록을 알고 있는 러닝의 정보를 입력하세요.</p></div><form className="okerry-card-body okerry-form" onSubmit={(event) => event.preventDefault()}><div className="okerry-field"><label className="okerry-label" htmlFor="distance">거리</label><div className="okerry-input-group"><input className="okerry-input" id="distance" inputMode="decimal" value={distance} onChange={(event) => setDistance(event.target.value)} /><select className="okerry-select" aria-label="거리 단위" value={unit} onChange={(event) => setUnit(event.target.value)}><option value="km">km</option><option value="mi">mile</option></select></div></div><div className="okerry-field"><label className="okerry-label">기록 시간</label><div className="run-time-inputs"><input className="okerry-input" aria-label="시간" inputMode="numeric" value={hours} onChange={(event) => setHours(event.target.value)} /><span>시간</span><input className="okerry-input" aria-label="분" inputMode="numeric" value={minutes} onChange={(event) => setMinutes(event.target.value)} /><span>분</span><input className="okerry-input" aria-label="초" inputMode="numeric" value={seconds} onChange={(event) => setSeconds(event.target.value)} /><span>초</span></div></div><button className="okerry-btn okerry-btn-primary okerry-btn-lg okerry-btn-full" type="submit">페이스 계산하기</button></form></section><section className="okerry-card okerry-card-sunken run-result-card"><div className="run-result-label"><Icon name="activity" size={16} /> CALCULATED RESULT</div><div className="run-result-main"><span>평균 페이스</span><strong>{result.pace}</strong><small>분 / {unit}</small></div><hr className="okerry-divider" /><div className="run-result-secondary"><span>풀코스 예상 기록</span><strong>{result.finish}</strong><span>입력 기록 기준 예상치</span></div></section></div><section className="run-pace-guide"><div><h2 className="run-section-title">페이스를 이렇게 활용해 보세요.</h2><p className="run-section-caption">목표에 맞는 페이스를 정하면 훈련이 더 쉬워져요.</p></div><div className="run-guide-items"><div><span className="okerry-badge okerry-badge-primary">이지런</span><strong>대화가 가능한 편안한 속도</strong><small>회복과 지구력 향상에 좋아요.</small></div><div><span className="okerry-badge okerry-badge-warning">템포런</span><strong>조금 힘들지만 유지 가능한 속도</strong><small>스피드와 페이스 감각을 키워요.</small></div></div></section></div>
}

function PaceCalculatorV2({ onSelectCalculator }) {
  const [mode, setMode] = useState('pace')
  const [distance, setDistance] = useState('10')
  const [unit, setUnit] = useState('km')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('52')
  const [seconds, setSeconds] = useState('30')
  const [paceMinutes, setPaceMinutes] = useState('5')
  const [paceSeconds, setPaceSeconds] = useState('15')

  const result = useMemo(() => {
    const unitRatio = unit === 'mi' ? 1.60934 : 1
    const distanceInKm = Number(distance || 0) * unitRatio
    const timeInSeconds = Number(hours || 0) * 3600 + Number(minutes || 0) * 60 + Number(seconds || 0)
    const paceInSeconds = Number(paceMinutes || 0) * 60 + Number(paceSeconds || 0)

    if (mode === 'pace') {
      if (!distanceInKm || !timeInSeconds) return { label: '평균 페이스', value: '--:--', unit: `분 / ${unit}`, detailLabel: '풀코스 예상 기록', detailValue: '--:--:--', detail: '입력 기록 기준 예상치' }
      const calculatedPace = timeInSeconds / distanceInKm
      return { label: '평균 페이스', value: formatPace(calculatedPace), unit: `분 / ${unit}`, detailLabel: '풀코스 예상 기록', detailValue: formatDuration(calculatedPace * 42.195), detail: '입력 기록 기준 예상치' }
    }

    if (mode === 'time') {
      if (!distanceInKm || !paceInSeconds) return { label: '예상 기록', value: '--:--:--', unit: `${distance || 0} ${unit}`, detailLabel: '입력 페이스', detailValue: '--:--', detail: `분 / ${unit}` }
      return { label: '예상 기록', value: formatDuration(distanceInKm * paceInSeconds), unit: `${distance} ${unit}`, detailLabel: '입력 페이스', detailValue: formatPace(paceInSeconds), detail: `분 / ${unit}` }
    }

    if (!timeInSeconds || !paceInSeconds) return { label: '예상 거리', value: '--', unit, detailLabel: '입력 페이스', detailValue: '--:--', detail: `분 / ${unit}` }
    const calculatedDistance = (timeInSeconds / paceInSeconds) / unitRatio
    return { label: '예상 거리', value: calculatedDistance.toFixed(2), unit, detailLabel: '입력 페이스', detailValue: formatPace(paceInSeconds), detail: `분 / ${unit}` }
  }, [distance, hours, minutes, mode, paceMinutes, paceSeconds, seconds, unit])

  const modeLabels = { pace: '페이스 계산', time: '시간 계산', distance: '거리 계산' }

  return <div className="okerry-content run-calculator-page"><header className="okerry-page-header run-page-header"><div className="okerry-page-header-text"><p className="run-kicker">TOOLS / PACE</p><h1 className="run-page-title">페이스 계산기</h1><p className="okerry-page-description">거리, 시간, 페이스 중 알고 있는 두 가지를 입력해 나머지 값을 계산하세요.</p></div></header><CalculatorTabs activeCalculator="pace" onSelectCalculator={onSelectCalculator} /><div className="okerry-grid okerry-grid-aside run-calculator-grid"><section className="okerry-card okerry-card-flat"><div className="okerry-card-header"><h2 className="run-section-title">계산 유형</h2><p className="okerry-card-description">계산할 값을 선택해 주세요.</p></div><form className="okerry-card-body okerry-form" onSubmit={(event) => event.preventDefault()}><div className="run-mode-tabs" role="tablist" aria-label="페이스 계산 방식">{Object.entries(modeLabels).map(([id, label]) => <button className={`run-mode-tab ${mode === id ? 'is-active' : ''}`} type="button" role="tab" aria-selected={mode === id} key={id} onClick={() => setMode(id)}>{label}</button>)}</div>{mode !== 'distance' && <div className="okerry-field"><label className="okerry-label" htmlFor="distance">거리</label><div className="okerry-input-group"><input className="okerry-input" id="distance" inputMode="decimal" value={distance} onChange={(event) => setDistance(event.target.value)} /><select className="okerry-select" aria-label="거리 단위" value={unit} onChange={(event) => setUnit(event.target.value)}><option value="km">km</option><option value="mi">mile</option></select></div></div>}{mode !== 'time' && <div className="okerry-field"><label className="okerry-label">기록 시간</label><div className="run-time-inputs"><input className="okerry-input" aria-label="시간" inputMode="numeric" value={hours} onChange={(event) => setHours(event.target.value)} /><span>시간</span><input className="okerry-input" aria-label="분" inputMode="numeric" value={minutes} onChange={(event) => setMinutes(event.target.value)} /><span>분</span><input className="okerry-input" aria-label="초" inputMode="numeric" value={seconds} onChange={(event) => setSeconds(event.target.value)} /><span>초</span></div></div>}{mode !== 'pace' && <div className="okerry-field"><label className="okerry-label">목표 페이스</label><div className="run-time-inputs run-pace-inputs"><input className="okerry-input" aria-label="페이스 분" inputMode="numeric" value={paceMinutes} onChange={(event) => setPaceMinutes(event.target.value)} /><span>분</span><input className="okerry-input" aria-label="페이스 초" inputMode="numeric" value={paceSeconds} onChange={(event) => setPaceSeconds(event.target.value)} /><span>초 / {unit}</span></div></div>}<button className="okerry-btn okerry-btn-primary okerry-btn-lg okerry-btn-full" type="submit">{modeLabels[mode]} 하기</button></form></section><section className="okerry-card okerry-card-sunken run-result-card"><div className="run-result-label"><Icon name="activity" size={16} /> CALCULATED RESULT</div><div className="run-result-main"><span>{result.label}</span><strong>{result.value}</strong><small>{result.unit}</small></div><hr className="okerry-divider" /><div className="run-result-secondary"><span>{result.detailLabel}</span><strong>{result.detailValue}</strong><span>{result.detail}</span></div></section></div><section className="run-pace-guide"><div><h2 className="run-section-title">페이스를 이렇게 활용해 보세요.</h2><p className="run-section-caption">목표에 맞는 페이스를 정하면 훈련이 더 쉬워져요.</p></div><div className="run-guide-items"><div><span className="okerry-badge okerry-badge-primary">이지런</span><strong>대화가 가능한 편안한 속도</strong><small>회복과 지구력 향상에 좋아요.</small></div><div><span className="okerry-badge okerry-badge-warning">템포런</span><strong>조금 힘들지만 유지 가능한 속도</strong><small>스피드와 페이스 감각을 키워요.</small></div></div></section></div>
}

function formatDuration(totalSeconds) { const rounded = Math.round(totalSeconds); const hours = Math.floor(rounded / 3600); const minutes = Math.floor((rounded % 3600) / 60).toString().padStart(2, '0'); const seconds = (rounded % 60).toString().padStart(2, '0'); return `${hours}:${minutes}:${seconds}` }

function formatPace(totalSeconds) { return `${Math.floor(totalSeconds / 60)}:${Math.round(totalSeconds % 60).toString().padStart(2, '0')}` }

export default App
