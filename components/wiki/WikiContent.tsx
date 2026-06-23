interface WikiContentProps {
  html: string
}

export function WikiContent({ html }: WikiContentProps) {
  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
