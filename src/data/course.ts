import type { Course } from '../types'

export const htmlCourse: Course = {
  id: 'html-foundations',
  title: 'HTML, 문서의 뼈대부터',
  subtitle: '코드를 외우지 않고 구조를 이해하는 첫 번째 웹 수업',
  description: '브라우저가 읽는 문서를 직접 만들며 시맨틱 HTML의 기초를 익힙니다.',
  level: '입문',
  duration: '약 25분',
  lessons: [
    {
      id: 'what-is-html', number: '01', title: 'HTML은 무엇일까요?', duration: '4분',
      blocks: [
        { type: 'text', eyebrow: '첫 번째 발견', title: '웹페이지에도 뼈대가 있습니다', body: 'HTML은 웹페이지의 내용과 구조를 설명하는 언어입니다. 제목, 문단, 링크가 무엇인지 브라우저에게 알려주죠.' },
        { type: 'reveal', label: 'HTML의 이름을 펼쳐보세요', body: 'HyperText Markup Language. 서로 연결되는 문서를 표시하는 언어라는 뜻입니다.' },
        { type: 'list', title: 'HTML이 담당하는 것', items: ['콘텐츠의 의미와 순서', '제목·문단·목록 같은 문서 구조', '다른 페이지로 이어지는 링크'] },
      ],
    },
    {
      id: 'first-document', number: '02', title: '첫 문서 만들기', duration: '5분',
      blocks: [
        { type: 'text', eyebrow: '직접 읽어보기', title: '작은 문서 하나가 완성되는 과정', body: 'HTML 문서는 선언, html, head, body의 순서로 구성됩니다. 각 요소는 여는 태그와 닫는 태그로 범위를 표시합니다.' },
        { type: 'code', title: 'index.html', code: '<!doctype html>\n<html lang="ko">\n  <head>\n    <meta charset="UTF-8">\n    <title>나의 첫 페이지</title>\n  </head>\n  <body>\n    <h1>반가워요!</h1>\n  </body>\n</html>' },
        { type: 'quiz', id: 'root-element', quizType: 'single', question: 'HTML 문서의 최상위 요소는 무엇일까요?', choices: ['<head>', '<html>', '<body>'], answer: '<html>', explanation: '<html> 요소가 head와 body를 모두 감싸는 문서의 최상위 요소입니다.' },
      ],
    },
    {
      id: 'meaningful-tags', number: '03', title: '의미를 담는 태그', duration: '5분',
      blocks: [
        { type: 'text', eyebrow: '구조에 이름 붙이기', title: '보이는 모습보다 의미가 먼저입니다', body: '시맨틱 태그는 콘텐츠가 맡은 역할을 이름으로 표현합니다. 사람뿐 아니라 검색 엔진과 보조 기술도 문서를 더 잘 이해합니다.' },
        { type: 'list', title: '대표적인 시맨틱 요소', items: ['<header> — 페이지나 영역의 머리말', '<main> — 문서의 핵심 콘텐츠', '<article> — 독립적으로 읽을 수 있는 글', '<footer> — 저작권·연락처 같은 맺음말'] },
        { type: 'reveal', label: '왜 div만 사용하면 안 될까요?', body: 'div는 의미 없는 묶음입니다. 모든 영역을 div로 만들면 구조의 의도를 코드만 보고 파악하기 어렵습니다.' },
      ],
    },
    {
      id: 'links', number: '04', title: '문서를 연결하는 링크', duration: '5분',
      blocks: [
        { type: 'text', eyebrow: '웹의 핵심', title: '한 문서에서 다음 문서로', body: 'a 요소의 href 속성은 이동할 목적지를 지정합니다. 링크의 문구만 읽어도 목적지를 예상할 수 있게 작성하세요.' },
        { type: 'code', title: '의미가 분명한 링크', code: '<a href="/courses/html">\n  HTML 강의 자세히 보기\n</a>' },
        { type: 'quiz', id: 'href-attribute', quizType: 'short', question: '링크의 목적지 주소를 지정하는 속성 이름을 입력하세요.', answer: 'href', explanation: 'href는 Hypertext Reference의 약자로 링크 목적지를 지정합니다.' },
      ],
    },
    {
      id: 'finish', number: '05', title: '첫 문서 완성하기', duration: '6분',
      blocks: [
        { type: 'text', eyebrow: '마지막 조립', title: '구조를 생각하며 작성해볼 시간', body: '이제 제목, 본문, 링크를 의미 있는 요소로 조립할 수 있습니다. 좋은 HTML은 화려하기 전에 읽기 쉽습니다.' },
        { type: 'code', title: '완성된 작은 소개 페이지', code: '<main>\n  <article>\n    <h1>안녕하세요, 해식입니다.</h1>\n    <p>배운 것을 기록하고 나눕니다.</p>\n    <a href="/notes">학습 노트 보기</a>\n  </article>\n</main>' },
        { type: 'quiz', id: 'main-content', quizType: 'single', question: '문서의 핵심 콘텐츠를 나타내는 요소는?', choices: ['<main>', '<meta>', '<style>'], answer: '<main>', explanation: '<main>은 현재 문서의 핵심 콘텐츠 영역을 나타냅니다.' },
      ],
    },
  ],
}

const designPatternSlides = [
  ['', '표지'], ['', '학습 지도'],
  ['PART 1 · 객체지향의 토대', 'Part 1 시작'], ['PART 1 · 객체지향의 토대', '객체와 클래스'], ['PART 1 · 객체지향의 토대', '클래스 계층구조'], ['PART 1 · 객체지향의 토대', 'OOP의 네 기둥'], ['PART 1 · 객체지향의 토대', '추상화와 캡슐화'], ['PART 1 · 객체지향의 토대', '상속과 다형성'], ['PART 1 · 객체지향의 토대', '객체 간의 관계'],
  ['PART 2 · 디자인 패턴이란', 'Part 2 시작'], ['PART 2 · 디자인 패턴이란', '디자인 패턴이란?'], ['PART 2 · 디자인 패턴이란', '패턴 설명의 구성'], ['PART 2 · 디자인 패턴이란', '역사와 분류'], ['PART 2 · 디자인 패턴이란', '왜 배워야 할까요?'],
  ['PART 3 · 설계 원칙', 'Part 3 시작'], ['PART 3 · 설계 원칙', '좋은 디자인의 특징'], ['PART 3 · 설계 원칙', '변화하는 내용을 캡슐화하세요'], ['PART 3 · 설계 원칙', '인터페이스에 프로그래밍하세요'], ['PART 3 · 설계 원칙', '상속보다 합성을 사용하세요'], ['PART 3 · 설계 원칙', 'SOLID 개요'], ['PART 3 · 설계 원칙', '단일 책임 원칙'], ['PART 3 · 설계 원칙', '개방/폐쇄 원칙'], ['PART 3 · 설계 원칙', '리스코프 치환 원칙'], ['PART 3 · 설계 원칙', '인터페이스 분리 원칙'], ['PART 3 · 설계 원칙', '의존관계 역전 원칙'],
  ['PART 4 · 생성 패턴', '생성 패턴 시작'], ['PART 4 · 생성 패턴', '팩토리 메서드'], ['PART 4 · 생성 패턴', '추상 팩토리'], ['PART 4 · 생성 패턴', '빌더'], ['PART 4 · 생성 패턴', '프로토타입'], ['PART 4 · 생성 패턴', '싱글턴'],
  ['PART 4 · 구조 패턴', '구조 패턴 시작'], ['PART 4 · 구조 패턴', '어댑터'], ['PART 4 · 구조 패턴', '브리지'], ['PART 4 · 구조 패턴', '복합체'], ['PART 4 · 구조 패턴', '데코레이터'], ['PART 4 · 구조 패턴', '퍼사드'], ['PART 4 · 구조 패턴', '플라이웨이트'], ['PART 4 · 구조 패턴', '프록시'],
  ['PART 5 · 행동 패턴', '행동 패턴 시작'], ['PART 5 · 행동 패턴', '책임 연쇄'], ['PART 5 · 행동 패턴', '커맨드'], ['PART 5 · 행동 패턴', '반복자'], ['PART 5 · 행동 패턴', '중재자'], ['PART 5 · 행동 패턴', '메멘토'], ['PART 5 · 행동 패턴', '옵서버'], ['PART 5 · 행동 패턴', '상태'], ['PART 5 · 행동 패턴', '전략'], ['PART 5 · 행동 패턴', '템플릿 메서드'], ['PART 5 · 행동 패턴', '비지터'],
  ['PART 5 · 정리와 적용', '22패턴 한눈에'], ['PART 5 · 정리와 적용', '증상 기반 적용 가이드'], ['PART 5 · 정리와 적용', '패턴 사용 시 주의'], ['', '마무리'],
] as const

export const designPatternsCourse: Course = {
  id: 'design-patterns',
  title: '디자인 패턴에 뛰어들기',
  subtitle: '원본 54개 슬라이드의 설명·도표·코드를 빠짐없이 학습하는 전체 강의',
  description: '객체지향의 토대부터 22개 디자인 패턴과 적용 가이드까지 원본 교안 전체를 학습합니다.',
  level: '중급',
  duration: '약 180분',
  lessons: designPatternSlides.map(([part, title], index) => {
    const number = String(index + 1).padStart(2, '0')
    const blockId = `design-pattern-slide-${number}`
    return {
      id: blockId,
      number,
      title,
      duration: '3분',
      blocks: [{
        type: 'html' as const,
        id: blockId,
        src: `courses/design-patterns/lecture-design-patterns.html?embed=1&slide=${index + 1}&blockId=${blockId}`,
        title: part || '디자인 패턴에 뛰어들기',
        description: '슬라이드 안의 다음 버튼 또는 방향키로 모든 단계별 내용을 확인하세요.',
        required: true,
      }],
    }
  }),
}

export const courses: Course[] = [htmlCourse, designPatternsCourse]
