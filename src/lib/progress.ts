const KEY = 'edubox-progress-v2'

export type Progress = { unlockedIndex: number; completed: string[]; passedQuizzes: string[] }

const initial: Progress = { unlockedIndex: 0, completed: [], passedQuizzes: [] }

export function loadProgress(courseId = 'html-foundations'): Progress {
  try {
    const stored = localStorage.getItem(`${KEY}:${courseId}`)
    return stored ? { ...initial, ...JSON.parse(stored) } : initial
  } catch {
    return initial
  }
}

export function saveProgress(progress: Progress, courseId = 'html-foundations') {
  localStorage.setItem(`${KEY}:${courseId}`, JSON.stringify(progress))
}

export function resetProgress(courseId = 'html-foundations') {
  localStorage.removeItem(`${KEY}:${courseId}`)
}
