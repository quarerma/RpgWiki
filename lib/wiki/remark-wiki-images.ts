import type { Root } from "hast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

import { getRegistry } from "@/lib/wiki/registry"
import {
  wikiLinkClass,
  wikiLinkMissingClass,
} from "@/lib/wiki/tailwind-classes"

function rewriteImageSrc(src: string, folder: string): string {
  const normalized = src.replace(/^\.\//, "")

  return `/wiki-assets/${folder}/images/${src}`
}

export const rehypeWikiImages: Plugin<[string], Root> = (folder) => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img" || !node.properties) {
        return
      }

      const src = node.properties.src
      console.log(node.properties)
      if (typeof src === "string") {
        node.properties.src = rewriteImageSrc(src, folder)
      }

      const float_direction =
        node.properties.alt === "right"
          ? "float-right ml-4 mb-2 mt-2"
          : "float-left mr-4 mb-2 mt-2"

      // Add Tailwind class for styling
      node.properties.className += ` max-h-[250px] ${float_direction} block `
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
