export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20">
      <div className="h-px bg-rule w-full" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-sans font-500 uppercase tracking-[0.18em] text-mid-gray">
          © {year} Kyle Goodwin
        </p>
        <div className="flex items-center gap-8">
          <a
            href="https://www.linkedin.com/in/kylegoodwin77/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-sans font-500 uppercase tracking-[0.18em] text-mid-gray hover:text-terracotta transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kgoodwin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-sans font-500 uppercase tracking-[0.18em] text-mid-gray hover:text-terracotta transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
