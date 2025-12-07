import { useRef, useCallback } from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(
        selectedText ? newCursorPos : start + before.length,
        selectedText ? newCursorPos : start + before.length
      )
    }, 0)
  }, [value, onChange])

  const handleBold = () => insertText('**', '**')
  const handleItalic = () => insertText('*', '*')
  const handleCode = () => insertText('`', '`')
  const handleCodeBlock = () => insertText('\n```\n', '\n```\n')
  const handleLink = () => insertText('[', '](url)')
  const handleHeading = (level: number) => insertText('\n' + '#'.repeat(level) + ' ', '')
  const handleList = () => insertText('\n- ', '')
  const handleQuote = () => insertText('\n> ', '')

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-t-lg">
        <button
          type="button"
          onClick={handleBold}
          className="px-2 py-1 text-sm font-bold bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={handleItalic}
          className="px-2 py-1 text-sm italic bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={handleCode}
          className="px-2 py-1 text-sm font-mono bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Inline Code"
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={handleCodeBlock}
          className="px-2 py-1 text-sm font-mono bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Code Block"
        >
          {'```'}
        </button>
        <button
          type="button"
          onClick={handleLink}
          className="px-2 py-1 text-sm bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Link"
        >
          🔗
        </button>
        <div className="w-px bg-gray-300 dark:bg-spethial-border mx-1" />
        <button
          type="button"
          onClick={() => handleHeading(1)}
          className="px-2 py-1 text-sm font-bold bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => handleHeading(2)}
          className="px-2 py-1 text-sm font-bold bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => handleHeading(3)}
          className="px-2 py-1 text-sm font-bold bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 dark:bg-spethial-border mx-1" />
        <button
          type="button"
          onClick={handleList}
          className="px-2 py-1 text-sm bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="List Item"
        >
          •
        </button>
        <button
          type="button"
          onClick={handleQuote}
          className="px-2 py-1 text-sm bg-white dark:bg-spethial-bg border border-gray-300 dark:border-spethial-border rounded hover:bg-gray-50 dark:hover:bg-spethial-border transition-colors"
          title="Quote"
        >
          "
        </button>
      </div>
      
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-spethial-bg border border-t-0 border-gray-200 dark:border-spethial-border rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-spethial-accent focus:border-transparent text-gray-900 dark:text-spethial-text placeholder-gray-400 dark:placeholder-spethial-muted"
        placeholder="Write your post content in Markdown..."
        spellCheck={false}
      />
    </div>
  )
}

