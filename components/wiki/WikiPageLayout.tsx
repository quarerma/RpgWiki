import Link from "next/link"

import { WikiContent } from "@/components/wiki/WikiContent"

interface WikiPageLayoutProps {
  title: string
  html: string
}

export function WikiPageLayout({ title, html }: WikiPageLayoutProps) {
  return (
    <article className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      </header>
      <WikiContent html={html} />
    </article>
  )
}
