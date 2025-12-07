interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-spethial-border text-gray-600 dark:text-spethial-muted rounded">
      {children}
    </span>
  )
}

export function TagList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </div>
  )
}

