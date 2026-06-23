import Link from "next/link"

import { WikiContent } from "@/components/wiki/WikiContent"

interface WikiPageLayoutProps {
  title: string
  html: string
  imageUrl?: string | null
}

export function WikiPageLayout({ title, html, imageUrl }: WikiPageLayoutProps) {
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
      <div className="wiki-article-body">
        <figure className="wiki-page-image">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title}
              className="h-auto w-full rounded-lg border object-cover"
            />
          ) : (
            <div
              className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground"
              aria-hidden
            >
              No image
            </div>
          )}
        </figure>
        <WikiContent html={html} />
      </div>
    </article>
  )
}
