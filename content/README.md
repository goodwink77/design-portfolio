# Content workflow

Case studies are authored in a Google Sheet and generated into `content/work/*.mdx` by a script.

## Source of truth

Google Sheet:
https://docs.google.com/spreadsheets/d/1PvLThmTp5WBnu4NNntPSZ7ZRsZmPY8LDtzEeiBroTTI/

The sheet must be shared as **Anyone with the link → Viewer** so the script can read it. No API key is needed.

## Columns

First row of the sheet is the header. Exact names:

### Metadata
| Column | Required | Notes |
|---|---|---|
| `slug` | yes | kebab-case; becomes the filename and URL |
| `title` | yes | |
| `description` | yes | one sentence |
| `coverImage` | | path like `/images/work/<slug>/cover.jpg` |
| `tags` | | pipe-separated, e.g. `Design Systems\|Product Design` |
| `year` | yes | integer |
| `role` | | |
| `client` | | |
| `draft` | | `TRUE` hides from the grid |
| `locked` | | `TRUE` tells the script to leave the `.mdx` alone so you can hand-edit |

### Body sections (free-form markdown, multi-line OK)
- `overview`
- `challenge`
- `approach`
- `outcome`
- `reflections`

Leave any section blank to skip its heading.

## Author workflow

1. Edit the sheet.
2. `npm run content:build` (fetches the sheet and writes `.mdx` files).
3. `npm run dev` to preview.
4. Commit the regenerated `content/work/*.mdx` plus `content/work.csv` (the cached fetch).

Offline? `npm run content:build:offline` uses the cached CSV instead of fetching.

## Images

Each project gets a folder under `public/images/work/<slug>/`. Drop cover and inline images there. Reference them in the sheet as `/images/work/<slug>/filename.ext`. In body sections, embed with markdown: `![alt text](/images/work/<slug>/diagram.jpg)`.

## Gallery tab

A second tab named `gallery` holds one row per image. The case study page renders these as a thumbnail grid above the Overview section, with a lightbox on click.

### Columns
| Column | Required | Notes |
|---|---|---|
| `slug` | yes | must match a slug on the work tab |
| `image` | yes | path like `/images/work/<slug>/file.jpg` or a full URL |
| `title` | | shown in the tooltip and lightbox |
| `description` | | shown in the tooltip and lightbox |
| `order` | | integer. Leave blank and the row position is used |

### Conventions for keeping it tidy
As the tab grows to 100+ rows, these habits keep it manageable:

- **Sort by `slug`.** Data → Sort sheet → `slug` ascending. Keeps a case study's rows contiguous.
- **Freeze the header row.** View → Freeze → 1 row.
- **Use filter views to edit one case study at a time.** Data → Create a filter view → filter `slug` to the one you want. Doesn't affect how other editors see the tab.
- **Apply data validation to the `slug` column.** Data → Data validation → criteria: dropdown from a range → `work!A:A`. This makes typos impossible. This is the single highest-leverage guardrail.
- **Leave `order` blank by default.** Because rows are sorted by slug, the natural row order within a group is already what you want. Only fill `order` when you need to reorder without re-sorting.

### Validating the sheet

Before committing, run:

```
npm run content:lint
```

This parses both tabs without writing any files and prints a summary of each case study's image count plus warnings for orphan slugs, duplicate images, and missing fields. Every `npm run content:build` also prints this summary at the end.

## Escape hatch

If one case study needs a hand-crafted layout, set `locked=TRUE` on its row. The generator will skip it and preserve your edits.
