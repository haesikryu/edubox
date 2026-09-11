from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/courses/domain-storytelling/lecture-domain-storytelling.html"
TARGET = ROOT / "src/data/domainStorytellingLessons.ts"

QUIZZES = {
    8: {
        "type": "quiz",
        "id": "dst-definition-check",
        "quizType": "single",
        "question": "도메인 스토리텔링의 핵심에 가장 가까운 설명은?",
        "choices": [
            "개발자가 혼자 작성하는 요구사항 문서",
            "도메인 전문가와 개발자가 업무 흐름을 스토리로 시각화하는 협업 기법",
            "데이터베이스 스키마를 먼저 설계하는 방법",
        ],
        "answer": "도메인 전문가와 개발자가 업무 흐름을 스토리로 시각화하는 협업 기법",
        "explanation": "도메인 스토리텔링은 전문가와 개발자가 함께 업무 흐름을 그림으로 만들며 도메인을 이해하는 협업 기법입니다.",
    },
    12: {
        "type": "quiz",
        "id": "dst-building-blocks-check",
        "quizType": "single",
        "question": "도메인 스토리의 기본 문장을 구성하는 세 요소는?",
        "choices": ["액터 · 활동 · 작업객체", "클래스 · 메서드 · 필드", "이벤트 · 커맨드 · 애그리게이트"],
        "answer": "액터 · 활동 · 작업객체",
        "explanation": "픽토그래픽 언어의 핵심은 액터가 활동을 통해 작업객체를 다루는 문장입니다.",
    },
    31: {
        "type": "quiz",
        "id": "dst-scenario-check",
        "quizType": "single",
        "question": "시나리오 기반 모델링에서 먼저 그려야 할 것은?",
        "choices": ["예외와 오류 경로", "정상 경로(happy path)", "시스템 아키텍처"],
        "answer": "정상 경로(happy path)",
        "explanation": "정상 경로를 먼저 끝까지 그린 뒤에 예외와 대안을 더하는 것이 기본입니다.",
    },
    47: {
        "type": "quiz",
        "id": "dst-bounded-context-check",
        "quizType": "single",
        "question": "바운디드 컨텍스트를 나누는 가장 중요한 기준은?",
        "choices": ["서버 대수", "유비쿼터스 언어의 일관된 의미 범위", "화면 UI 개수"],
        "answer": "유비쿼터스 언어의 일관된 의미 범위",
        "explanation": "같은 용어라도 맥락마다 의미가 다르면 경계를 나누고, 그 안에서 언어를 일관되게 씁니다.",
    },
    58: {
        "type": "quiz",
        "id": "dst-test-check",
        "quizType": "single",
        "question": "도메인 스토리는 구현 단계에서 무엇으로 이어질 수 있나요?",
        "choices": ["스타일 가이드", "고객 인수 테스트 시나리오", "배포 파이프라인 설정"],
        "answer": "고객 인수 테스트 시나리오",
        "explanation": "정상 경로와 예외 스토리는 각각 핵심·경계 인수 테스트 시나리오가 됩니다.",
    },
    69: {
        "type": "quiz",
        "id": "dst-closing-check",
        "quizType": "single",
        "question": "도메인 스토리텔링이 남기는 가장 중요한 결과는?",
        "choices": [
            "예쁜 다이어그램 파일",
            "전문가와 개발자가 같은 문장을 읽을 수 있게 된 상태",
            "완성된 데이터베이스 스키마",
        ],
        "answer": "전문가와 개발자가 같은 문장을 읽을 수 있게 된 상태",
        "explanation": "목표는 그림 자체가 아니라, 공통 이해와 공통 언어를 만드는 일입니다.",
    },
}

TEXT_CLASSES = {
    "lead", "note", "cap2", "cover-sub", "src", "dvsub", "pbig", "pnote",
    "warnbox", "cbtitle", "syq", "sya", "men", "glab", "gval", "axl",
    "lnlab", "cap", "nl", "ns", "uml-h", "uml-b", "inst", "ptag", "code",
    "cover-meta", "bar-lb", "bar-val", "cnum", "rmn", "rmc",
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
        target = tag in {"p", "li", "pre", "h1", "h2", "h3", "text", "th", "td"} or bool(classes & TEXT_CLASSES)
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
    "// Generated from the original 69-slide HTML teaching material.",
    "export const domainStorytellingLessons: LessonPage[] = [",
]

for index, slide in enumerate(parser.slides, 1):
    number = str(index).zfill(2)
    items = [item for item in slide["items"] if item not in {slide["title"], slide["part"]}]
    body = items.pop(0) if items else f"{slide['title']}의 핵심 개념을 살펴봅니다."
    blocks = [{"type": "text", "eyebrow": slide["part"] or "도메인 스토리텔링", "title": slide["title"], "body": body}]
    if items:
        blocks.append({"type": "list", "title": "교안 핵심 내용", "items": items})
    for code_index, code in enumerate(slide["codes"], 1):
        blocks.append({"type": "code", "title": f"예제 {code_index}", "code": code})
    if index in QUIZZES:
        blocks.append(QUIZZES[index])
    lesson = {
        "id": f"domain-storytelling-slide-{number}",
        "number": number,
        "title": slide["title"],
        "duration": "3분",
        "blocks": blocks,
    }
    payload = json.dumps(lesson, ensure_ascii=False, indent=2)
    lines.extend("  " + line for line in payload.splitlines())
    lines[-1] += ","

lines.append("]")
TARGET.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"generated {len(parser.slides)} lessons -> {TARGET}")
