import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, Clock, Menu, RotateCcw, Sparkles, X } from 'lucide-react'
import { courses } from './data/course'
import { ContentBlock } from './components/ContentBlock'
import { Logo } from './components/Logo'
import { loadProgress, resetProgress, saveProgress, type Progress } from './lib/progress'
import { isSupabaseConfigured } from './lib/supabase'

function App() {
  const [started, setStarted] = useState(false)
  const [courseId, setCourseId] = useState(courses[0].id)
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState<Progress>(() => loadProgress(courses[0].id))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const course = courses.find((item) => item.id === courseId) ?? courses[0]
  const lesson = course.lessons[current]
  const requiredBlock = lesson.blocks.find((block) => block.type === 'quiz' || (block.type === 'html' && block.required))
  const requiredBlockId = requiredBlock && 'id' in requiredBlock ? requiredBlock.id : null
  const canComplete = !requiredBlockId || progress.passedQuizzes.includes(requiredBlockId)
  const percent = Math.round((progress.completed.length / course.lessons.length) * 100)
  const finished = progress.completed.length === course.lessons.length

  const updateProgress = (next: Progress) => { setProgress(next); saveProgress(next, course.id) }

  const startCourse = (id: string) => {
    setCourseId(id)
    setProgress(loadProgress(id))
    setCurrent(0)
    setStarted(true)
    window.scrollTo(0, 0)
  }

  const passQuiz = (id: string) => {
    if (!progress.passedQuizzes.includes(id)) updateProgress({ ...progress, passedQuizzes: [...progress.passedQuizzes, id] })
  }

  const goNext = () => {
    if (!canComplete) return
    const completed = progress.completed.includes(lesson.id) ? progress.completed : [...progress.completed, lesson.id]
    const unlockedIndex = Math.min(Math.max(progress.unlockedIndex, current + 1), course.lessons.length - 1)
    updateProgress({ ...progress, completed, unlockedIndex })
    if (current < course.lessons.length - 1) { setCurrent(current + 1); window.scrollTo(0, 0) }
  }

  const selectLesson = (index: number) => {
    if (index <= progress.unlockedIndex) { setCurrent(index); setStarted(true); setSidebarOpen(false); window.scrollTo(0, 0) }
  }

  const completedCurrent = progress.completed.includes(lesson.id)
  const displayPercent = useMemo(() => finished ? 100 : percent, [finished, percent])

  if (!started) return (
    <div className="landing">
      <header className="landing-nav"><Logo /><nav><a href="#curriculum">커리큘럼</a><a href="#about">학습 방식</a></nav><button className="nav-cta" onClick={() => startCourse(courses[0].id)}>무료로 시작하기</button></header>
      <main>
        <section className="hero">
          <div className="hero-copy"><p className="hero-kicker"><Sparkles size={16} /> 읽는 순간, 배움이 시작됩니다</p><h1>영상 없이도<br /><em>깊이 배우는</em> 방법.</h1><p className="hero-description">짧게 읽고, 직접 펼쳐보고, 퀴즈로 확인하세요.<br />당신의 속도로 완성하는 인터랙티브 HTML 수업.</p><div className="hero-actions"><button onClick={() => startCourse(courses[0].id)}>첫 수업 시작하기 <ArrowRight size={18} /></button><span>가입 없이 데모 체험</span></div></div>
          <div className="hero-visual" aria-hidden="true"><div className="paper paper-back" /><div className="paper"><div className="paper-top"><span>LESSON 01</span><i /></div><h2>HTML은<br />무엇일까요?</h2><div className="paper-line long" /><div className="paper-line" /><div className="paper-note"><span>&lt;html&gt;</span><div><i /><i /></div></div><div className="paper-progress"><span /><span /><span /></div></div><div className="floating-tag tag-one">읽기</div><div className="floating-tag tag-two">직접 해보기</div><div className="floating-check"><Check /></div></div>
        </section>
        <section className="manifesto" id="about"><p>WATCH LESS, <em>LEARN MORE.</em></p><div><span>01</span><h2>한 화면에<br />하나의 개념</h2><span>02</span><h2>궁금한 것은<br />직접 펼치기</h2><span>03</span><h2>정답으로<br />다음 단계 열기</h2></div></section>
        <section className="course-preview" id="curriculum"><p className="eyebrow">지금 시작할 수 있는 수업</p><div className="course-grid">{courses.map((item) => <article key={item.id}><span>{item.level} · {item.duration}</span><h2>{item.title}</h2><p>{item.subtitle}</p><button onClick={() => startCourse(item.id)}>강의 시작하기 <ArrowRight size={18} /></button></article>)}</div></section>
      </main>
      <footer className="landing-footer"><Logo /><span>배움의 밀도를 높입니다.</span></footer>
    </div>
  )

  if (finished && current === course.lessons.length - 1 && completedCurrent) return (
    <div className="completion-page"><Logo /><main><span className="completion-mark"><Check /></span><p className="eyebrow">COURSE COMPLETE</p><h1>{course.title}<br />완료했습니다.</h1><p>{course.description}</p><div className="completion-stats"><div><strong>{course.lessons.length}</strong><span>완료한 레슨</span></div><div><strong>{progress.passedQuizzes.length}</strong><span>통과한 활동</span></div><div><strong>100%</strong><span>진행률</span></div></div><button onClick={() => { resetProgress(course.id); setProgress(loadProgress(course.id)); setCurrent(0); setStarted(false) }}><RotateCcw size={17} /> 처음부터 다시 보기</button></main></div>
  )

  return (
    <div className="learn-layout">
      <aside className={sidebarOpen ? 'open' : ''}>
        <div className="aside-head"><Logo /><button className="mobile-close" onClick={() => setSidebarOpen(false)}><X /></button></div>
        <button className="back-home" onClick={() => setStarted(false)}><ChevronLeft size={18} /> 강의 홈</button>
        <div className="course-meta"><p>{course.id.replaceAll('-', ' ').toUpperCase()}</p><h2>{course.title}</h2><div><span>{displayPercent}% 완료</span><span>{progress.completed.length}/{course.lessons.length}</span></div><i><b style={{ width: `${displayPercent}%` }} /></i></div>
        <nav className="lesson-nav">{course.lessons.map((item, index) => { const done = progress.completed.includes(item.id); const locked = index > progress.unlockedIndex; return <button key={item.id} disabled={locked} className={`${current === index ? 'active' : ''} ${done ? 'done' : ''}`} onClick={() => selectLesson(index)}><span>{done ? <Check size={14} /> : item.number}</span><div><strong>{item.title}</strong><small><Clock size={12} /> {item.duration}</small></div>{locked && <i>잠김</i>}</button> })}</nav>
        <div className="mode-note"><span className={isSupabaseConfigured ? 'online' : ''} />{isSupabaseConfigured ? 'Supabase 연결됨' : '데모 모드 · 이 기기에 저장'}</div>
      </aside>
      <main className="lesson-main">
        <header className="lesson-top"><button className="menu-button" onClick={() => setSidebarOpen(true)}><Menu /></button><div><BookOpen size={16} /><span>레슨 {lesson.number}</span><i />{lesson.duration}</div><Logo compact /></header>
        <article className="lesson-content"><div className="lesson-title"><span>{lesson.number}</span><h1>{lesson.title}</h1><p>{course.subtitle}</p></div>{lesson.blocks.map((block, index) => <ContentBlock key={`${block.type}-${'id' in block ? block.id : index}`} block={block} passed={(block.type === 'quiz' || block.type === 'html') && progress.passedQuizzes.includes(block.id)} onQuizPass={passQuiz} />)}</article>
        <footer className="lesson-footer"><button className="prev" disabled={current === 0} onClick={() => { setCurrent(current - 1); window.scrollTo(0, 0) }}><ArrowLeft size={18} /> 이전 레슨</button><div>{!canComplete && <p>필수 학습을 완료하면 다음 단계가 열립니다.</p>}<button className="next" disabled={!canComplete} onClick={goNext}>{current === course.lessons.length - 1 ? '강의 완료하기' : '다음 레슨'} <ArrowRight size={18} /></button></div></footer>
      </main>
      {sidebarOpen && <button className="sidebar-overlay" aria-label="메뉴 닫기" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

export default App
