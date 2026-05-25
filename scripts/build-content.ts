import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import Papa from 'papaparse'

const ROOT = process.cwd()
const WORK_DIR = path.join(ROOT, 'content/work')
const CSV_CACHE = path.join(ROOT, 'content/work.csv')
const GALLERY_CACHE = path.join(ROOT, 'content/gallery.csv')

const SHEET_ID = process.env.PORTFOLIO_SHEET_ID ?? '1PvLThmTp5WBnu4NNntPSZ7ZRsZmPY8LDtzEeiBroTTI'
const GID_WORK = process.env.PORTFOLIO_SHEET_GID ?? '0'
const GID_GALLERY = process.env.PORTFOLIO_GALLERY_GID ?? '2069675784'

const csvUrl = (gid: string) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`

const OFFLINE = process.argv.includes('--offline')
const LINT = process.argv.includes('--lint')

type Row = Record<string, string>

const SECTION_COLUMNS: Array<{ key: string; heading: string; imagesKey: string }> = [
  { key: 'overview', heading: 'Overview', imagesKey: 'overview_images' },
  { key: 'challenge', heading: 'The Challenge', imagesKey: 'challenge_images' },
  { key: 'approach', heading: 'My Approach', imagesKey: 'approach_images' },
  { key: 'outcome', heading: 'Outcome', imagesKey: 'outcome_images' },
  { key: 'reflections', heading: 'Reflections', imagesKey: 'reflections_images' },
]

async function loadCsv(cachePath: string, gid: string, label: string, optional = false): Promise<string> {
  if (OFFLINE) {
    if (!fs.existsSync(cachePath)) {
      if (optional) return ''
      throw new Error(`--offline was passed but ${cachePath} does not exist. Run without --offline first.`)
    }
    return fs.readFileSync(cachePath, 'utf-8')
  }

  const url = csvUrl(gid)
  console.log(`Fetching ${label}: ${url}`)
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) {
    if (optional) {
      console.warn(`  (${label} tab not reachable — continuing without it. HTTP ${res.status})`)
      return ''
    }
    throw new Error(
      `Failed to fetch ${label} (HTTP ${res.status}). ` +
        `Make sure the sheet is shared as "Anyone with the link → Viewer", ` +
        `or run with --offline to use the cached CSV.`,
    )
  }
  const csv = await res.text()
  fs.mkdirSync(path.dirname(cachePath), { recursive: true })
  fs.writeFileSync(cachePath, csv)
  return csv
}

function isTruthy(v: string | undefined): boolean {
  if (!v) return false
  return /^(true|yes|1|y)$/i.test(v.trim())
}

function escapeYaml(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function normalizeImagePath(raw: string): string {
  let p = raw.trim()
  if (p.startsWith('public/')) p = p.slice('public'.length)
  if (p && !p.startsWith('/')) p = '/' + p
  return p
}

function renderFrontmatter(row: Row, order: number, gallery: GalleryRow[]): string {
  const rawTags = (row.tags ?? '').trim()
  const delimiter = rawTags.includes('|') ? '|' : ','
  const tags = rawTags
    .split(delimiter)
    .map((t) => t.trim())
    .filter(Boolean)

  const tagsYaml = tags.length
    ? `[${tags.map((t) => `"${escapeYaml(t)}"`).join(', ')}]`
    : '[]'

  const year = Number.parseInt(row.year ?? '', 10)

  const lines = [
    '---',
    `title: "${escapeYaml(row.title ?? '')}"`,
    `slug: "${escapeYaml(row.slug)}"`,
    `description: "${escapeYaml(row.description ?? '')}"`,
    `coverImage: "${escapeYaml(normalizeImagePath(row.coverImage ?? ''))}"`,
    `tags: ${tagsYaml}`,
    `year: ${Number.isFinite(year) ? year : new Date().getFullYear()}`,
    `role: "${escapeYaml(row.role ?? '')}"`,
    `client: "${escapeYaml(row.client ?? '')}"`,
    `draft: ${isTruthy(row.draft) ? 'true' : 'false'}`,
    `order: ${order}`,
  ]

  if (gallery.length > 0) {
    lines.push('gallery:')
    for (const g of gallery) {
      lines.push(`  - image: "${escapeYaml(normalizeImagePath(g.image))}"`)
      lines.push(`    title: "${escapeYaml(g.title)}"`)
      lines.push(`    description: "${escapeYaml(g.description)}"`)
    }
  }

  lines.push('---', '')
  return lines.join('\n')
}

interface GalleryRow {
  image: string
  title: string
  description: string
  order: number
}

interface GalleryWarning {
  row: number
  level: 'warn' | 'info'
  message: string
}

interface GalleryParseResult {
  bySlug: Map<string, GalleryRow[]>
  warnings: GalleryWarning[]
}

function parseGalleryCsv(csv: string): GalleryParseResult {
  const bySlug = new Map<string, GalleryRow[]>()
  const warnings: GalleryWarning[] = []
  if (!csv.trim()) return { bySlug, warnings }

  const parsed = Papa.parse<Row>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })

  const seenPairs = new Set<string>()

  parsed.data.forEach((row, i) => {
    const rowNum = i + 2 // +1 for header row, +1 for 1-indexed display

    const slug = (row.slug ?? '').trim()
    const image = (row.image ?? '').trim()

    if (!slug && !image) return
    if (!slug) {
      warnings.push({ row: rowNum, level: 'warn', message: 'row has image but no slug' })
      return
    }
    if (!image) {
      warnings.push({ row: rowNum, level: 'warn', message: `slug "${slug}" has no image` })
      return
    }

    const pairKey = `${slug}::${image}`
    if (seenPairs.has(pairKey)) {
      warnings.push({
        row: rowNum,
        level: 'warn',
        message: `duplicate image for "${slug}": ${image}`,
      })
    } else {
      seenPairs.add(pairKey)
    }

    const rawOrder = (row.order ?? '').trim()
    const orderParsed = Number.parseInt(rawOrder, 10)
    if (rawOrder && !Number.isFinite(orderParsed)) {
      warnings.push({
        row: rowNum,
        level: 'warn',
        message: `non-numeric order "${rawOrder}" on "${slug}" — falling back to row index`,
      })
    }

    const title = (row.title ?? '').trim()
    const description = (row.description ?? '').trim()
    if (!title && !description) {
      warnings.push({
        row: rowNum,
        level: 'info',
        message: `"${slug}" image missing title and description`,
      })
    }

    const entry: GalleryRow = {
      image,
      title,
      description,
      order: Number.isFinite(orderParsed) ? orderParsed : i,
    }

    if (!bySlug.has(slug)) bySlug.set(slug, [])
    bySlug.get(slug)!.push(entry)
  })

  for (const items of bySlug.values()) {
    items.sort((a, b) => a.order - b.order)
  }
  return { bySlug, warnings }
}

function printGallerySummary(
  bySlug: Map<string, GalleryRow[]>,
  warnings: GalleryWarning[],
  workSlugs: Set<string>,
) {
  const orphanWarnings: GalleryWarning[] = []
  for (const [slug] of bySlug) {
    if (!workSlugs.has(slug)) {
      orphanWarnings.push({
        row: 0,
        level: 'warn',
        message: `slug "${slug}" not found in work sheet (orphan typo?)`,
      })
    }
  }

  const allWarnings = [...warnings, ...orphanWarnings]

  console.log('\nGallery summary')
  console.log('───────────────')
  if (bySlug.size === 0) {
    console.log('  (no gallery rows)')
  } else {
    const entries = [...bySlug.entries()].sort(([a], [b]) => a.localeCompare(b))
    const maxSlug = Math.max(...entries.map(([s]) => s.length))
    for (const [slug, items] of entries) {
      const pad = ' '.repeat(maxSlug - slug.length + 2)
      const marker = workSlugs.has(slug) ? ' ' : '!'
      console.log(`  ${marker} ${slug}${pad}${items.length} image${items.length === 1 ? '' : 's'}`)
    }
  }

  if (allWarnings.length) {
    console.log('\nWarnings:')
    for (const w of allWarnings) {
      const prefix = w.level === 'warn' ? '⚠' : 'ℹ'
      const rowLabel = w.row ? `row ${w.row}: ` : ''
      console.log(`  ${prefix} ${rowLabel}${w.message}`)
    }
  } else {
    console.log('\nNo warnings.')
  }
}

function renderBody(row: Row): string {
  const parts: string[] = []
  for (const { key, heading, imagesKey } of SECTION_COLUMNS) {
    const value = (row[key] ?? '').trim()
    if (!value) continue
    parts.push(`## ${heading}`)
    parts.push('')
    if (key === 'outcome' && value.includes('|')) {
      const bullets = value.split('|').map((b) => b.trim()).filter(Boolean)
      for (const bullet of bullets) {
        parts.push(`- ${bullet}`)
      }
    } else {
      parts.push(value)
    }
    parts.push('')

    const rawImages = (row[imagesKey] ?? '').trim()
    if (rawImages) {
      const images = rawImages.split('|').map((p) => normalizeImagePath(p.trim())).filter(Boolean)
      for (const img of images) {
        parts.push(`![](${img})`)
        parts.push('')
      }
    }
  }
  return parts.join('\n')
}

function hash(s: string): string {
  return crypto.createHash('sha1').update(s).digest('hex')
}

async function main() {
  fs.mkdirSync(WORK_DIR, { recursive: true })

  const [csv, galleryCsv] = await Promise.all([
    loadCsv(CSV_CACHE, GID_WORK, 'work sheet'),
    loadCsv(GALLERY_CACHE, GID_GALLERY, 'gallery sheet', true),
  ])

  const parsed = Papa.parse<Row>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })

  if (parsed.errors.length) {
    for (const err of parsed.errors) {
      console.warn(`CSV parse warning: ${err.message} (row ${err.row})`)
    }
  }

  const { bySlug: galleryBySlug, warnings: galleryWarnings } = parseGalleryCsv(galleryCsv)

  const workSlugs = new Set<string>()
  for (const row of parsed.data) {
    const slug = (row.slug ?? '').trim()
    if (slug) workSlugs.add(slug)
  }

  if (LINT) {
    printGallerySummary(galleryBySlug, galleryWarnings, workSlugs)
    console.log('\nLint mode: no files written.')
    return
  }

  let written = 0
  let unchanged = 0
  let skipped = 0

  const managedSlugs = new Set<string>()
  const lockedSlugs = new Set<string>()

  let order = 0

  for (const row of parsed.data) {
    const slug = (row.slug ?? '').trim()
    if (!slug) {
      skipped++
      continue
    }

    if (isTruthy(row.locked)) {
      console.log(`  locked  ${slug}.mdx (skipped)`)
      lockedSlugs.add(slug)
      skipped++
      continue
    }

    managedSlugs.add(slug)
    const rowOrder = order++
    const gallery = galleryBySlug.get(slug) ?? []

    const content = renderFrontmatter(row, rowOrder, gallery) + renderBody(row)
    const filePath = path.join(WORK_DIR, `${slug}.mdx`)

    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf-8')
      if (hash(existing) === hash(content)) {
        unchanged++
        continue
      }
    }

    fs.writeFileSync(filePath, content)
    console.log(`  wrote   ${slug}.mdx`)
    written++
  }

  let pruned = 0
  for (const filename of fs.readdirSync(WORK_DIR)) {
    if (!filename.endsWith('.mdx')) continue
    if (filename.startsWith('_')) continue
    const slug = filename.replace(/\.mdx$/, '')
    if (managedSlugs.has(slug) || lockedSlugs.has(slug)) continue

    fs.unlinkSync(path.join(WORK_DIR, filename))
    console.log(`  pruned  ${filename}`)
    pruned++
  }

  console.log(
    `\nDone. ${written} written, ${unchanged} unchanged, ${skipped} skipped, ${pruned} pruned.`,
  )

  printGallerySummary(galleryBySlug, galleryWarnings, workSlugs)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
