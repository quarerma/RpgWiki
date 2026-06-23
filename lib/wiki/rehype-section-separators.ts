import { visit } from "unist-util-visit"
import type { Element, Root } from "hast"
import type { Parent } from "unist"
import type { Plugin } from "unified"

export const rehypeSectionSeparators: Plugin<[], Root> = () => {
  return (tree) => {
    const headingPositions: { parent: Parent; index: number }[] = []

    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "h2" && parent && typeof index === "number") {
        headingPositions.push({ parent, index })
      }
    })

    for (let i = headingPositions.length - 1; i >= 1; i--) {
      const { parent, index } = headingPositions[i]
      const separator: Element = {
        type: "element",
        tagName: "hr",
        properties: { className: "wiki-section-separator" },
        children: [],
      }
      parent.children.splice(index, 0, separator)
    }
  }
}
