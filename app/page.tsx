import Link from "next/link"

import { SearchBar } from "@/components/wiki/SearchBar"
import { siteConfig } from "@/config/site"
import { getAllPages } from "@/lib/wiki/registry"

export default function HomePage() {
  const pages = getAllPages().sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{siteConfig.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>
      <SearchBar pages={pages} />
      <p className="mt-8 text-sm text-muted-foreground">
        {pages.length} page{pages.length === 1 ? "" : "s"} in the wiki.
        {pages[0] && (
          <>
            {" "}
            <Link href={`/${pages[0].url}`} className="wiki-link">
              Browse an article
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
