import Link from "next/link"

import { PageInfo } from "@/lib/wiki/load-page-info"
import { WikiContent } from "@/components/wiki/WikiContent"
import { WikiPageInfo } from "@/components/wiki/WikiPageInfo"

interface WikiPageLayoutProps {
  title: string
  html: string
  imageUrl?: string | null
  info?: PageInfo | null
}

export function WikiPageLayout({
  title,
  html,
  imageUrl,
  info,
}: WikiPageLayoutProps) {
  const displayTitle = info?.title ?? title

  return (
    <article className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>
      <header className="mb-4 border-b pb-4">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      </header>
      <div className="w-full">
        <aside className="float-right mb-4 ml-6 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] border border-border p-2">
          <figure className="">
            <div className="rounded-none">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground"
                  aria-hidden
                >
                  No image
                </div>
              )}
            </div>
            <figcaption className=" text-center text-sm italic text-muted-foreground">
              {displayTitle}
            </figcaption>
          </figure>
          {info ? <WikiPageInfo info={info} /> : null}
        </aside>
        <WikiContent html={html} />
      </div>
    </article>
  )
}
