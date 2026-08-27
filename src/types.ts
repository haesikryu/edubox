export type TextBlock = { type: 'text'; eyebrow?: string; title?: string; body: string }
export type CodeBlock = { type: 'code'; title?: string; code: string }
export type RevealBlock = { type: 'reveal'; label: string; body: string }
export type ListBlock = { type: 'list'; title?: string; items: string[] }
export type QuizBlock = {
  type: 'quiz'
  id: string
  quizType: 'single' | 'short'
  question: string
  choices?: string[]
  answer: string
  explanation: string
}
export type HtmlBlock = {
  type: 'html'
  id: string
  src: string
  title: string
  description?: string
  required?: boolean
}

export type ContentBlock = TextBlock | CodeBlock | RevealBlock | ListBlock | QuizBlock | HtmlBlock

export type LessonPage = {
  id: string
  number: string
  title: string
  duration: string
  blocks: ContentBlock[]
}

export type Course = {
  id: string
  title: string
  subtitle: string
  description: string
  level: string
  duration: string
  lessons: LessonPage[]
}
