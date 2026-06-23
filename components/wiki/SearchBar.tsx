"use client"

import { useMemo, useState } from "react"

import { PageList } from "@/components/wiki/PageList"
import { WikiPage } from "@/lib/wiki/types"

interface SearchBarProps {
  pages: WikiPage[]
}

export function SearchBar({ pages }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const filteredPages = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return pages
    }

    return pages.filter((page) => {
      const haystack = [
        page.title,
        page.url,
        ...(page.search_words ?? []),
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(normalized)
    })
  }, [pages, query])

  return (
    <div className="space-y-6">
      <input
        type="search"
        placeholder="Search pages..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <PageList pages={filteredPages} />
    </div>
  )
}
