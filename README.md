# Kyle Goodwin Portfolio

A modern, animated portfolio site built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Clean, modern design with smooth Framer Motion animations
- 📱 Fully responsive layout
- ⚡ Built with Next.js 14 for optimal performance
- 🎭 Tailwind CSS for styling
- 🚀 Static export ready for GitHub Pages
- ✨ Smooth scroll animations and transitions
- 🌐 SEO-optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate a static export in the `out` directory, ready for deployment.

## Deploying to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v3
```

4. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Push the `out` directory to a `gh-pages` branch:
```bash
npm install -g gh-pages
gh-pages -d out
```

3. Enable GitHub Pages in repository settings pointing to the `gh-pages` branch

## Customization

### Update Content

Edit the component files in `app/components/` to customize:
- `Hero.tsx` - Main hero section content
- `Work.tsx` - Project showcase
- `About.tsx` - About section and expertise
- `Experience.tsx` - Work experience timeline
- `Footer.tsx` - Social links and footer

### Update Colors

Modify `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: '#1aa97f', // Change to your brand color
  dark: '#0a0a0a',
}
```

### Update Navigation

Edit the `navLinks` array in `app/components/Navigation.tsx`

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: GitHub Pages

## License

© 2024 Kyle Goodwin. All rights reserved.
