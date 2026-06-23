import { Metadata } from "next"
import { notFound } from "next/navigation"

import { WikiPageLayout } from "@/components/wiki/WikiPageLayout"
import { loadPageContent } from "@/lib/wiki/load-page"
import { getPageImageUrl } from "@/lib/wiki/page-image"
import { parseMarkdown } from "@/lib/wiki/parse-markdown"
import { getAllPages, getPageBySlug } from "@/lib/wiki/registry"

interface WikiPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPages().map((page) => ({ slug: page.url }))
}

export function generateMetadata({ params }: WikiPageProps): Metadata {
  const page = getPageBySlug(params.slug)
  if (!page) {
    return { title: "Not Found" }
  }
  return { title: page.title }
}

export default async function WikiPage({ params }: WikiPageProps) {
  const page = getPageBySlug(params.slug)
  if (!page) {
    notFound()
  }

  const { markdown } = await loadPageContent(page)
  const html = await parseMarkdown(markdown, page.folder)
  const imageUrl = getPageImageUrl(page.folder)

  return (
    <WikiPageLayout title={page.title} html={html} imageUrl={imageUrl} />
  )
}
