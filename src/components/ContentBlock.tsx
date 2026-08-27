import { useState } from 'react'
import { ChevronDown, Copy, Check } from 'lucide-react'
import type { ContentBlock as Block } from '../types'
import { Quiz } from './Quiz'

export function ContentBlock({ block, passed, onQuizPass }: { block: Block; passed: boolean; onQuizPass: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (block.type === 'text') return <section className="text-block">{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}{block.title && <h2>{block.title}</h2>}<p>{block.body}</p></section>
  if (block.type === 'list') return <section className="list-block">{block.title && <h3>{block.title}</h3>}<ul>{block.items.map((item) => <li key={item}><span>{String(block.items.indexOf(item) + 1).padStart(2, '0')}</span>{item}</li>)}</ul></section>
  if (block.type === 'reveal') return <section className={`reveal-block ${open ? 'open' : ''}`}><button onClick={() => setOpen(!open)} aria-expanded={open}><span>{block.label}</span><ChevronDown size={20} /></button>{open && <p>{block.body}</p>}</section>
  if (block.type === 'code') return <section className="code-block"><header><span><i /><i /><i /></span><strong>{block.title || 'example.html'}</strong><button onClick={() => { navigator.clipboard.writeText(block.code); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? '복사됨' : '복사'}</button></header><pre><code>{block.code}</code></pre></section>
  return <Quiz block={block} passed={passed} onPass={() => onQuizPass(block.id)} />
}
