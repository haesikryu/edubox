const KEY = 'edubox-progress-v1'

export type Progress = { unlockedIndex: number; completed: string[]; passedQuizzes: string[] }

const initial: Progress = { unlockedIndex: 0, completed: [], passedQuizzes: [] }

export function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? { ...initial, ...JSON.parse(stored) } : initial
  } catch {
    return initial
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}

export function resetProgress() {
  localStorage.removeItem(KEY)
}
