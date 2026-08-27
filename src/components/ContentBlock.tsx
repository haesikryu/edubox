import { useEffect, useState } from 'react'
import { ChevronDown, Copy, Check, ExternalLink, Maximize2 } from 'lucide-react'
import type { ContentBlock as Block } from '../types'
import { Quiz } from './Quiz'

export function ContentBlock({ block, passed, onQuizPass }: { block: Block; passed: boolean; onQuizPass: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (block.type !== 'html') return
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'EDUBOX_COMPLETE' && event.data?.blockId === block.id) onQuizPass(block.id)
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [block, onQuizPass])

  if (block.type === 'text') return <section className="text-block">{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}{block.title && <h2>{block.title}</h2>}<p>{block.body}</p></section>
  if (block.type === 'list') return <section className="list-block">{block.title && <h3>{block.title}</h3>}<ul>{block.items.map((item) => <li key={item}><span>{String(block.items.indexOf(item) + 1).padStart(2, '0')}</span>{item}</li>)}</ul></section>
  if (block.type === 'reveal') return <section className={`reveal-block ${open ? 'open' : ''}`}><button onClick={() => setOpen(!open)} aria-expanded={open}><span>{block.label}</span><ChevronDown size={20} /></button>{open && <p>{block.body}</p>}</section>
  if (block.type === 'code') return <section className="code-block"><header><span><i /><i /><i /></span><strong>{block.title || 'example.html'}</strong><button onClick={() => { navigator.clipboard.writeText(block.code); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? '복사됨' : '복사'}</button></header><pre><code>{block.code}</code></pre></section>
  if (block.type === 'html') {
    const src = `${import.meta.env.BASE_URL}${block.src}`
    return <section className="html-block"><header><div><span className="html-badge">HTML 교안</span><h3>{block.title}</h3>{block.description && <p>{block.description}</p>}</div><a href={src} target="_blank" rel="noreferrer"><ExternalLink size={15} /> 새 창</a></header><div className="html-frame"><iframe src={src} title={block.title} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-presentation" /></div><footer className={passed ? 'complete' : ''}>{passed ? <><Check size={17} /> 학습을 완료했습니다</> : <><Maximize2 size={17} /> 넓은 화면이나 전체화면으로 학습하는 것을 권장합니다</>}</footer></section>
  }
  return <Quiz block={block} passed={passed} onPass={() => onQuizPass(block.id)} />
}
