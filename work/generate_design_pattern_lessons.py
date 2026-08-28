from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/courses/design-patterns/lecture-design-patterns.html"
TARGET = ROOT / "src/data/designPatternLessons.ts"

QUIZZES = {
    9: {"type": "quiz", "id": "oop-check", "quizType": "single", "question": "내부 상태를 감추고 공개된 인터페이스로만 접근하게 하는 원칙은?", "choices": ["캡슐화", "상속", "다형성"], "answer": "캡슐화", "explanation": "캡슐화는 구현 세부사항을 숨겨 변경의 파급 범위를 줄입니다."},
    14: {"type": "quiz", "id": "pattern-check", "quizType": "single", "question": "디자인 패턴에 대한 올바른 설명은?", "choices": ["복사하는 완성 코드", "반복되는 설계 문제의 해결 구조", "언어 전용 라이브러리"], "answer": "반복되는 설계 문제의 해결 구조", "explanation": "패턴은 문제, 해결 구조, 결과를 함께 설명하는 공통 언어입니다."},
    25: {"type": "quiz", "id": "solid-check", "quizType": "single", "question": "고수준 정책이 구체 구현에 직접 의존하지 않게 하는 원칙은?", "choices": ["SRP", "LSP", "DIP"], "answer": "DIP", "explanation": "의존관계 역전 원칙은 양쪽 모두 추상화에 의존하게 합니다."},
    31: {"type": "quiz", "id": "creation-check", "quizType": "single", "question": "복잡한 객체를 단계별로 조립하는 생성 패턴은?", "choices": ["빌더", "프로토타입", "싱글턴"], "answer": "빌더", "explanation": "빌더는 생성 절차와 최종 표현을 분리합니다."},
    39: {"type": "quiz", "id": "structure-check", "quizType": "single", "question": "맞지 않는 인터페이스 사이를 변환하는 패턴은?", "choices": ["어댑터", "복합체", "플라이웨이트"], "answer": "어댑터", "explanation": "어댑터는 기존 객체를 감싸 기대하는 인터페이스로 바꿉니다."},
    50: {"type": "quiz", "id": "behavior-check", "quizType": "single", "question": "한 객체의 변화를 여러 객체에 자동으로 알리는 패턴은?", "choices": ["옵서버", "상태", "비지터"], "answer": "옵서버", "explanation": "옵서버는 발행자와 구독자의 일대다 의존 관계를 만듭니다."},
    54: {"type": "quiz", "id": "application-check", "quizType": "single", "question": "패턴을 적용하는 가장 좋은 출발점은?", "choices": ["패턴 이름", "실제 코드의 반복되는 문제", "클래스 개수"], "answer": "실제 코드의 반복되는 문제", "explanation": "패턴은 목적이 아니라 관찰된 설계 문제를 해결하는 도구입니다."},
}

TEXT_CLASSES = {
    "lead", "note", "cap2", "cover-sub", "src", "dvsub", "pbig", "pnote",
    "warnbox", "cbtitle", "syq", "sya", "men", "glab", "gval", "axl",
    "lnlab", "cap", "nl", "ns", "uml-h", "uml-b", "inst", "ptag", "code",
    "cover-meta",
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


class SlideParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.slides = []
        self.slide = None
        self.skip = 0
        self.stack = []
        self.capture = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = set(attrs.get("class", "").split())
        if tag == "section" and "slide" in classes:
            self.slide = {"part": attrs.get("data-part", ""), "title": attrs.get("data-title", ""), "items": [], "codes": []}
            return
        if not self.slide:
            return
        if tag in {"br", "img", "meta", "link", "input", "hr", "source", "area", "base", "col", "embed", "param", "track", "wbr"}:
            if self.stack and tag == "br":
                self.stack[-1][3].append(" ")
            return
        if tag in {"script", "style"}:
            self.skip += 1
        target = tag in {"p", "li", "pre", "h1", "h2", "h3", "text"} or bool(classes & TEXT_CLASSES)
        code_target = tag == "pre" or "code" in classes
        self.stack.append((tag, target, code_target, []))

    def handle_endtag(self, tag):
        if not self.slide:
            return
        if tag == "section":
            self.slides.append(self.slide)
            self.slide = None
            self.stack = []
            return
        if tag in {"script", "style"} and self.skip:
            self.skip -= 1
        if self.stack:
            open_tag, target, code_target, parts = self.stack.pop()
            value = clean(" ".join(parts))
            if target and value:
                bucket = "codes" if code_target else "items"
                if value not in self.slide[bucket]:
                    self.slide[bucket].append(value)
            if self.stack and value:
                self.stack[-1][3].append(value)

    def handle_data(self, data):
        if self.slide and not self.skip and self.stack:
            value = clean(data)
            if value:
                self.stack[-1][3].append(value)


parser = SlideParser()
parser.feed(SOURCE.read_text(encoding="utf-8"))

lines = [
    "import type { LessonPage } from '../types'",
    "",
    "// Generated from the original 54-slide HTML teaching material.",
    "export const designPatternLessons: LessonPage[] = [",
]

for index, slide in enumerate(parser.slides, 1):
    number = str(index).zfill(2)
    items = [item for item in slide["items"] if item not in {slide["title"], slide["part"]}]
    body = items.pop(0) if items else f"{slide['title']}의 핵심 개념을 살펴봅니다."
    blocks = [{"type": "text", "eyebrow": slide["part"] or "디자인 패턴에 뛰어들기", "title": slide["title"], "body": body}]
    if items:
        blocks.append({"type": "list", "title": "교안 핵심 내용", "items": items})
    for code_index, code in enumerate(slide["codes"], 1):
        blocks.append({"type": "code", "title": f"예제 {code_index}", "code": code})
    if index in QUIZZES:
        blocks.append(QUIZZES[index])
    lesson = {"id": f"design-pattern-slide-{number}", "number": number, "title": slide["title"], "duration": "3분", "blocks": blocks}
    payload = json.dumps(lesson, ensure_ascii=False, indent=2)
    lines.extend("  " + line for line in payload.splitlines())
    lines[-1] += ","

lines.append("]")
TARGET.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"generated {len(parser.slides)} lessons -> {TARGET}")
