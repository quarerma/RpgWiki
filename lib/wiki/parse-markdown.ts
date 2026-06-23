import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

import { preprocessWikiLinks } from "@/lib/wiki/remark-wiki-links"
import {
  rehypeWikiImages,
  rehypeWikiLinkClasses,
} from "@/lib/wiki/remark-wiki-images"
import { rehypeSectionSeparators } from "@/lib/wiki/rehype-section-separators"

export async function parseMarkdown(
  markdown: string,
  folder: string
): Promise<string> {
  const preprocessed = preprocessWikiLinks(markdown)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeWikiImages, folder)
    .use(rehypeWikiLinkClasses)
    .use(rehypeSectionSeparators)
    .use(rehypeStringify)
    .process(preprocessed)

  return String(result)
}
