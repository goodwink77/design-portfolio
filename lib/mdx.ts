import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WORK_DIR = path.join(process.cwd(), 'content/work')

export interface GalleryItem {
  image: string
  title: string
  description: string
}

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  category?: string
  year: number
  role: string
  client: string
  draft?: boolean
  order?: number
  gallery?: GalleryItem[]
}

export interface CaseStudy extends CaseStudyFrontmatter {
  content: string
}

function getWorkFilePaths(): string[] {
  if (!fs.existsSync(WORK_DIR)) return []
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
}

export function getSortedWork(): CaseStudyFrontmatter[] {
  const files = getWorkFilePaths()

  const work = files
    .map((filename) => {
      const filePath = path.join(WORK_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      return data as CaseStudyFrontmatter
    })
    .filter((item) => !item.draft)
    .sort((a, b) => {
      const ao = a.order ?? Number.POSITIVE_INFINITY
      const bo = b.order ?? Number.POSITIVE_INFINITY
      if (ao !== bo) return ao - bo
      return b.year - a.year
    })

  return work
}

export function getWorkBySlug(slug: string): CaseStudy | null {
  const files = getWorkFilePaths()
  const filename = files.find((f) => f.replace(/\.mdx$/, '') === slug)

  if (!filename) return null

  const filePath = path.join(WORK_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    ...(data as CaseStudyFrontmatter),
    content,
  }
}

export function getAllWorkSlugs(): string[] {
  return getWorkFilePaths().map((f) => f.replace(/\.mdx$/, ''))
}
