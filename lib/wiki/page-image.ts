import { existsSync, readdirSync } from "fs"
import path from "path"

import { getPageImagesDir } from "@/lib/wiki/paths"

const PREFERRED_IMAGE_NAMES = ["portrait.png", "portrait.jpg", "portrait.jpeg"]

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg)$/i

export function getPageImageUrl(folder: string): string | null {
  const imagesDir = getPageImagesDir(folder)

  if (!existsSync(imagesDir)) {
    return null
  }

  for (const name of PREFERRED_IMAGE_NAMES) {
    if (existsSync(path.join(imagesDir, name))) {
      return `/wiki-assets/${folder}/images/${name}`
    }
  }

  const files = readdirSync(imagesDir)
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .sort()

  if (files.length === 0) {
    return null
  }

  return `/wiki-assets/${folder}/images/${files[0]}`
}
