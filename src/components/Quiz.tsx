import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import type { QuizBlock } from '../types'

export function Quiz({ block, passed, onPass }: { block: QuizBlock; passed: boolean; onPass: () => void }) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<'idle' | 'wrong' | 'right'>(passed ? 'right' : 'idle')

  const submit = () => {
    const correct = value.trim().toLowerCase() === block.answer.trim().toLowerCase()
    setResult(correct ? 'right' : 'wrong')
    if (correct) onPass()
  }

  return (
    <section className={`quiz-card ${result}`} aria-labelledby={`${block.id}-title`}>
      <div className="quiz-kicker"><span>잠깐, 확인해 볼까요?</span><em>필수 퀴즈</em></div>
      <h3 id={`${block.id}-title`}>{block.question}</h3>
      {block.quizType === 'single' ? (
        <div className="choice-list">
          {block.choices?.map((choice, index) => (
            <label className={value === choice ? 'selected' : ''} key={choice}>
              <input type="radio" name={block.id} value={choice} checked={value === choice} onChange={() => { setValue(choice); setResult('idle') }} disabled={passed} />
              <span>{String.fromCharCode(65 + index)}</span>{choice}
            </label>
          ))}
        </div>
      ) : (
        <input className="short-answer" value={value} onChange={(e) => { setValue(e.target.value); setResult('idle') }} placeholder="정답을 입력하세요" disabled={passed} onKeyDown={(e) => e.key === 'Enter' && value && submit()} />
      )}
      {result === 'right' && <div className="feedback success"><Check size={18} /><span><strong>정답입니다!</strong>{block.explanation}</span></div>}
      {result === 'wrong' && <div className="feedback error"><RotateCcw size={18} /><span><strong>아직 아니에요.</strong>교안 내용을 다시 살펴보고 시도해 보세요.</span></div>}
      {!passed && <button className="quiz-submit" onClick={submit} disabled={!value}>정답 확인</button>}
    </section>
  )
}
