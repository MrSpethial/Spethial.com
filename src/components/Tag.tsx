interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="px-2.5 py-0.5 rounded-full font-mono text-[var(--fs-micro)] tracking-[var(--tr-base)]" style={{ background: 'var(--hairline)', color: 'var(--ink-soft)' }}>
      {children}
    </span>
  )
}

export function TagList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </div>
  )
}
