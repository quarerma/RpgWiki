import Link from "next/link"

import { WikiPage } from "@/lib/wiki/types"

interface PageListProps {
  pages: WikiPage[]
}

export function PageList({ pages }: PageListProps) {
  if (pages.length === 0) {
    return (
      <p className="text-muted-foreground">No pages match your search.</p>
    )
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <li key={page.url}>
          <Link
            href={`/${page.url}`}
            className="block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h2 className="font-semibold">{page.title}</h2>
            {page.search_words && page.search_words.length > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {page.search_words.slice(0, 3).join(", ")}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
