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

export const designPatternsCourse: Course = {
  id: 'design-patterns',
  title: '디자인 패턴에 뛰어들기',
  subtitle: '22개 디자인 패턴을 읽고, 펼쳐보고, 문제로 확인하는 네이티브 강의',
  description: '객체지향의 토대부터 생성·구조·행동 패턴과 적용 기준까지 단계적으로 익힙니다.',
  level: '중급',
  duration: '약 95분',
  lessons: [
    {
      id: 'oop-foundations', number: '01', title: '객체지향의 토대', duration: '10분',
      blocks: [
        { type: 'text', eyebrow: 'PART 1 · 객체지향', title: '패턴보다 먼저 객체를 이해합니다', body: '객체는 상태와 행동을 함께 담고, 클래스는 객체를 만드는 설계도입니다. 디자인 패턴은 객체들이 책임을 나누고 협력하는 반복 가능한 방법입니다.' },
        { type: 'list', title: '객체지향의 네 기둥', items: ['추상화 — 중요한 특징만 남겨 문제를 단순화합니다', '캡슐화 — 내부 상태를 감추고 안전한 인터페이스를 제공합니다', '상속 — 기존 타입의 특성을 이어받아 계층을 만듭니다', '다형성 — 같은 요청에 객체마다 다른 방식으로 응답합니다'] },
        { type: 'reveal', label: '객체 사이에는 어떤 관계가 있을까요?', body: '의존, 연관, 집합, 합성, 상속, 구현 관계가 있습니다. 결합이 강할수록 변경이 함께 전파되므로 필요한 만큼만 연결해야 합니다.' },
        { type: 'quiz', id: 'oop-pillars', quizType: 'single', question: '내부 상태를 감추고 공개된 인터페이스로만 접근하게 하는 원칙은?', choices: ['캡슐화', '상속', '다형성'], answer: '캡슐화', explanation: '캡슐화는 구현 세부사항을 숨겨 객체의 상태를 안전하게 보호합니다.' },
      ],
    },
    {
      id: 'pattern-language', number: '02', title: '디자인 패턴이라는 언어', duration: '9분',
      blocks: [
        { type: 'text', eyebrow: 'PART 2 · 패턴', title: '패턴은 복사할 코드가 아닙니다', body: '디자인 패턴은 특정 상황에서 반복해서 나타나는 설계 문제와 검증된 해결 구조를 이름 붙인 것입니다. 구현 코드는 언어와 상황에 따라 달라집니다.' },
        { type: 'list', title: '패턴을 설명하는 네 가지 요소', items: ['의도 — 이 패턴이 해결하려는 문제', '문제 — 패턴을 적용할 상황과 제약', '해결 — 객체와 책임이 협력하는 구조', '결과 — 얻는 이점과 감수해야 할 비용'] },
        { type: 'reveal', label: '왜 패턴 이름이 중요한가요?', body: '“옵서버를 사용하자”라는 한 문장으로 객체의 관계와 의도를 팀 전체가 빠르게 공유할 수 있습니다. 패턴은 설계에 관한 공통 어휘입니다.' },
        { type: 'quiz', id: 'pattern-definition', quizType: 'single', question: '디자인 패턴에 대한 올바른 설명은?', choices: ['그대로 복사하는 완성 코드', '반복되는 설계 문제의 해결 구조', '특정 언어 전용 라이브러리'], answer: '반복되는 설계 문제의 해결 구조', explanation: '패턴은 구현이 아니라 문제, 해결 구조, 결과를 함께 설명합니다.' },
      ],
    },
    {
      id: 'design-principles', number: '03', title: '변화를 견디는 설계 원칙', duration: '10분',
      blocks: [
        { type: 'text', eyebrow: 'PART 3 · 설계 원칙', title: '좋은 설계는 변경의 파도를 흡수합니다', body: '요구사항은 계속 바뀝니다. 좋은 설계는 변하는 부분과 안정적인 부분을 분리해 변경이 시스템 전체로 번지지 않게 합니다.' },
        { type: 'list', title: '세 가지 핵심 원칙', items: ['변화하는 내용을 찾아 캡슐화하세요', '구현이 아니라 인터페이스에 프로그래밍하세요', '상속보다 객체 합성을 우선하세요'] },
        { type: 'code', title: '합성으로 교체 가능한 행동', code: 'class Checkout {\n  constructor(private payment: PaymentStrategy) {}\n\n  pay(amount: number) {\n    return this.payment.pay(amount)\n  }\n}' },
        { type: 'quiz', id: 'composition', quizType: 'single', question: '실행 중에도 행동을 교체하기 가장 쉬운 설계는?', choices: ['깊은 상속 계층', '객체 합성', '전역 상태'], answer: '객체 합성', explanation: '합성은 협력 객체를 교체해 행동을 유연하게 바꿀 수 있습니다.' },
      ],
    },
    {
      id: 'solid', number: '04', title: 'SOLID 원칙', duration: '12분',
      blocks: [
        { type: 'text', eyebrow: 'PART 3 · SOLID', title: '책임과 의존성을 다루는 다섯 기준', body: 'SOLID는 객체지향 설계를 평가하는 체크리스트입니다. 규칙처럼 맹목적으로 적용하기보다 변경 비용을 낮추는 방향으로 사용합니다.' },
        { type: 'list', title: 'SOLID 한눈에 보기', items: ['SRP — 클래스가 변경되는 이유는 하나여야 합니다', 'OCP — 확장에는 열려 있고 수정에는 닫혀 있어야 합니다', 'LSP — 하위 타입은 상위 타입을 안전하게 대체해야 합니다', 'ISP — 클라이언트가 쓰지 않는 기능에 의존하지 않게 인터페이스를 나눕니다', 'DIP — 구체 구현보다 추상화에 의존합니다'] },
        { type: 'reveal', label: '단일 책임은 “메서드가 하나”라는 뜻일까요?', body: '아닙니다. 책임은 변경의 이유를 뜻합니다. 같은 이해관계자와 같은 이유로 변경되는 기능들은 하나의 책임에 속할 수 있습니다.' },
        { type: 'quiz', id: 'dip', quizType: 'single', question: '고수준 정책이 구체적인 저수준 구현에 직접 의존하지 않게 하는 원칙은?', choices: ['SRP', 'LSP', 'DIP'], answer: 'DIP', explanation: '의존관계 역전 원칙은 양쪽 모두 추상화에 의존하게 합니다.' },
      ],
    },
    {
      id: 'creational-patterns', number: '05', title: '생성 패턴 5가지', duration: '11분',
      blocks: [
        { type: 'text', eyebrow: 'PART 4 · 생성 패턴', title: '객체를 어떻게 만들 것인가', body: '생성 패턴은 객체 생성의 구체적인 과정을 감춰 클라이언트가 특정 클래스와 강하게 결합하지 않도록 합니다.' },
        { type: 'list', title: '다섯 가지 생성 패턴', items: ['팩토리 메서드 — 생성할 객체의 종류를 하위 클래스가 결정합니다', '추상 팩토리 — 서로 어울리는 객체 제품군을 한 벌로 생성합니다', '빌더 — 복잡한 객체를 동일한 순서로 단계별 조립합니다', '프로토타입 — 기존 객체를 복제해 새 객체를 만듭니다', '싱글턴 — 인스턴스를 하나로 제한하고 전역 접근점을 제공합니다'] },
        { type: 'reveal', label: '빌더는 언제 유용할까요?', body: '생성자 매개변수가 많거나, 같은 생성 과정으로 서로 다른 표현을 만들어야 할 때 유용합니다.' },
        { type: 'quiz', id: 'builder-pattern', quizType: 'single', question: '복잡한 객체를 단계별로 조립하는 패턴은?', choices: ['빌더', '프로토타입', '싱글턴'], answer: '빌더', explanation: '빌더는 생성 절차와 최종 표현을 분리합니다.' },
      ],
    },
    {
      id: 'structural-patterns', number: '06', title: '구조 패턴 7가지', duration: '12분',
      blocks: [
        { type: 'text', eyebrow: 'PART 4 · 구조 패턴', title: '객체를 어떻게 조립할 것인가', body: '구조 패턴은 클래스와 객체를 더 큰 구조로 조립하면서도 구조를 유연하고 효율적으로 유지하는 방법을 다룹니다.' },
        { type: 'list', title: '일곱 가지 구조 패턴', items: ['어댑터 — 맞지 않는 인터페이스 사이를 변환합니다', '브리지 — 추상과 구현을 분리해 독립적으로 확장합니다', '복합체 — 부분과 전체를 같은 인터페이스로 다룹니다', '데코레이터 — 객체를 감싸며 실행 중에 기능을 더합니다', '퍼사드 — 복잡한 서브시스템에 단순한 진입점을 제공합니다', '플라이웨이트 — 공유 가능한 상태를 나눠 메모리를 절약합니다', '프록시 — 실제 객체의 대리인이 접근을 제어합니다'] },
        { type: 'reveal', label: '데코레이터와 상속은 무엇이 다를까요?', body: '상속은 컴파일 시점에 관계가 고정되지만 데코레이터는 실행 중 원하는 기능을 조합할 수 있습니다.' },
        { type: 'quiz', id: 'adapter-pattern', quizType: 'single', question: '외부 라이브러리의 인터페이스가 우리 코드와 맞지 않을 때 적합한 패턴은?', choices: ['어댑터', '복합체', '플라이웨이트'], answer: '어댑터', explanation: '어댑터는 기존 객체를 감싸 기대하는 인터페이스로 변환합니다.' },
      ],
    },
    {
      id: 'behavioral-patterns-a', number: '07', title: '행동 패턴: 요청과 상태', duration: '12분',
      blocks: [
        { type: 'text', eyebrow: 'PART 5 · 행동 패턴', title: '객체는 어떻게 책임을 주고받을까요?', body: '행동 패턴은 객체 사이의 효과적인 의사소통과 책임 분배를 다룹니다. 먼저 요청 전달과 상태 보존에 관한 다섯 패턴을 살펴봅니다.' },
        { type: 'list', title: '행동 패턴 1–5', items: ['책임 연쇄 — 요청을 처리기 사슬을 따라 전달합니다', '커맨드 — 요청을 독립적인 객체로 캡슐화합니다', '반복자 — 컬렉션 구조를 노출하지 않고 순회합니다', '중재자 — 객체 사이의 복잡한 통신을 중앙 객체로 모읍니다', '메멘토 — 캡슐화를 깨지 않고 이전 상태를 저장하고 복원합니다'] },
        { type: 'reveal', label: '실행 취소 기능에는 어떤 패턴이 어울릴까요?', body: '작업 자체는 커맨드 객체로 만들고, 복원할 상태는 메멘토로 보관하는 조합이 자주 사용됩니다.' },
        { type: 'quiz', id: 'command-pattern', quizType: 'single', question: '요청을 객체로 만들어 대기열·기록·실행 취소를 지원하는 패턴은?', choices: ['중재자', '커맨드', '반복자'], answer: '커맨드', explanation: '커맨드는 요청과 실행에 필요한 정보를 하나의 객체로 캡슐화합니다.' },
      ],
    },
    {
      id: 'behavioral-patterns-b', number: '08', title: '행동 패턴: 변화와 알고리즘', duration: '12분',
      blocks: [
        { type: 'text', eyebrow: 'PART 5 · 행동 패턴', title: '변화에 반응하고 알고리즘을 교체합니다', body: '나머지 행동 패턴은 상태 변화의 전파, 알고리즘 교체, 처리 절차의 재사용을 다룹니다.' },
        { type: 'list', title: '행동 패턴 6–10', items: ['옵서버 — 상태 변화가 생기면 구독자에게 알립니다', '상태 — 내부 상태에 따라 행동이 달라지게 합니다', '전략 — 알고리즘을 독립 객체로 만들어 교체합니다', '템플릿 메서드 — 처리 절차의 뼈대를 고정하고 일부 단계만 확장합니다', '비지터 — 객체 구조를 바꾸지 않고 새로운 연산을 추가합니다'] },
        { type: 'code', title: '전략 교체 예시', code: 'navigator.setRouteStrategy(new DrivingRoute())\nnavigator.buildRoute(start, destination)\n\nnavigator.setRouteStrategy(new WalkingRoute())\nnavigator.buildRoute(start, destination)' },
        { type: 'quiz', id: 'observer-pattern', quizType: 'single', question: '한 객체의 변화를 여러 객체에 자동으로 알리는 패턴은?', choices: ['옵서버', '상태', '비지터'], answer: '옵서버', explanation: '옵서버는 발행자와 구독자의 일대다 의존 관계를 만듭니다.' },
      ],
    },
    {
      id: 'applying-patterns', number: '09', title: '증상에서 패턴 찾기', duration: '7분',
      blocks: [
        { type: 'text', eyebrow: '정리와 적용', title: '패턴 이름보다 문제의 증상부터', body: '패턴을 먼저 정하고 코드를 끼워 맞추지 마세요. 반복되는 변경 이유와 결합 지점을 관찰하면 후보 패턴이 자연스럽게 좁혀집니다.' },
        { type: 'list', title: '증상별 출발점', items: ['new 구상 클래스가 곳곳에 흩어짐 → 팩토리 메서드·추상 팩토리', '생성자 매개변수가 너무 많음 → 빌더', '같은 조건 분기가 여러 곳에 반복됨 → 전략·상태', '외부 형식이 우리 코드와 맞지 않음 → 어댑터', '기능 조합만큼 자식 클래스가 늘어남 → 데코레이터·브리지', '객체들이 서로 직접 참조해 얽힘 → 중재자·퍼사드'] },
        { type: 'reveal', label: '패턴을 사용하지 않아야 할 때', body: '문제가 아직 나타나지 않았거나 단순한 코드로 충분하다면 패턴을 넣지 마세요. 추상화는 이익이 비용보다 클 때만 추가합니다.' },
        { type: 'quiz', id: 'pattern-judgement', quizType: 'single', question: '디자인 패턴을 적용하는 가장 좋은 출발점은?', choices: ['패턴 이름', '실제 코드의 반복되는 문제', '클래스 개수'], answer: '실제 코드의 반복되는 문제', explanation: '패턴은 목적이 아니라 이미 관찰된 설계 문제를 해결하는 도구입니다.' },
      ],
    },
  ],
}

export const courses: Course[] = [htmlCourse, designPatternsCourse]
