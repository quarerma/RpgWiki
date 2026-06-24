import { visit } from "unist-util-visit"
import type { Root } from "hast"
import type { Plugin } from "unified"

import { getRegistry } from "@/lib/wiki/registry"
import { wikiLinkClass, wikiLinkMissingClass } from "@/lib/wiki/tailwind-classes"

function rewriteImageSrc(src: string, folder: string): string {
  const normalized = src.replace(/^\.\//, "")
  if (normalized.startsWith("images/")) {
    const filename = normalized.slice("images/".length)
    return `/wiki-assets/${folder}/images/${filename}`
  }
  return src
}

export const rehypeWikiImages: Plugin<[string], Root> = (folder) => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img" || !node.properties) {
        return
      }

      const src = node.properties.src
      if (typeof src === "string") {
        node.properties.src = rewriteImageSrc(src, folder)
      }
    })
  }
}

export const rehypeWikiLinkClasses: Plugin<[], Root> = () => {
  return (tree) => {
    const registry = getRegistry()

    visit(tree, "element", (node) => {
      if (node.tagName !== "a" || !node.properties) {
        return
      }

      const href = node.properties.href
      if (typeof href !== "string" || !href.startsWith("/")) {
        return
      }

      const slug = href.slice(1)
      const exists = registry.bySlug.has(slug)
      node.properties.className = exists ? wikiLinkClass : wikiLinkMissingClass
    })
  }
}
