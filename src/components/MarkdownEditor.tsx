import { useRef, useCallback } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

type ToolbarButton = { label: string; title: string; before: string; after: string; className?: string } | { divider: true }

const toolbarButtons: ToolbarButton[] = [
  { label: 'B', title: 'Bold', before: '**', after: '**', className: 'font-bold' },
  { label: 'I', title: 'Italic', before: '*', after: '*', className: 'italic' },
  { label: '</>', title: 'Code', before: '`', after: '`', className: 'font-mono' },
  { label: '```', title: 'Code Block', before: '\n```\n', after: '\n```\n', className: 'font-mono' },
  { label: '🔗', title: 'Link', before: '[', after: '](url)' },
  { divider: true },
  { label: 'H1', title: 'Heading 1', before: '\n# ', after: '', className: 'font-bold' },
  { label: 'H2', title: 'Heading 2', before: '\n## ', after: '', className: 'font-bold' },
  { label: 'H3', title: 'Heading 3', before: '\n### ', after: '', className: 'font-bold' },
  { divider: true },
  { label: '•', title: 'List', before: '\n- ', after: '' },
  { label: '"', title: 'Quote', before: '\n> ', after: '' },
]

export default function MarkdownEditor({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = useCallback((before: string, after: string) => {
    const ta = textareaRef.current
    if (!ta) return

    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.substring(start, end)
    
    onChange(value.substring(0, start) + before + selected + after + value.substring(end))
    
    setTimeout(() => {
      ta.focus()
      const pos = start + before.length + selected.length + after.length
      ta.setSelectionRange(selected ? pos : start + before.length, selected ? pos : start + before.length)
    }, 0)
  }, [value, onChange])

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-t-lg">
        {toolbarButtons.map((btn, i) => 
          'divider' in btn ? (
            <div key={i} className="w-px bg-gray-300 dark:bg-spethial-border mx-1" />
          ) : (
            <button
              key={btn.label}
              type="button"
              onClick={() => insertText(btn.before, btn.after)}
              className={`px-2 py-1 text-sm bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors ${btn.className || ''}`}
              title={btn.title}
            >
              {btn.label}
            </button>
          )
        )}
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-spethial-bg border border-t-0 border-gray-200 dark:border-spethial-border rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-spethial-accent text-gray-900 dark:text-spethial-text placeholder-gray-400"
        placeholder="Write your post content in Markdown..."
        spellCheck={false}
      />
    </div>
  )
}
