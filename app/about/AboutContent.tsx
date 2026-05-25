'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const professionalSkills = [
  'Design Leadership',
  'Design Strategy',
  'Product Strategy',
  'Roadmapping',
  'Cross-Functional Collaboration',
  'Stakeholder Management',
  'Enablement and Governance',
  'Workshop Facilitation',
  'Design Critique',
  'Scrum and Agile Management',
  'Hiring and Interviewing',
  'Mentorship',
  'Documentation Development',
]

const technicalSkills = [
  'Design Systems',
  'Dimensional Taxonomy',
  'Component Architecture',
  'Design Tokens (JSON)',
  'Theming and Modes',
  'Typography Systems',
  'Color Systems',
  'UX/UI',
  'Interaction Design',
  'Information Architecture',
  'Prototyping',
  'Visual Design',
  'Accessibility Design',
  'Design Libraries and Figma Kits',
  'Figma (Variants, Auto Layout, Variables)',
  'Figma Code Connect',
  'Developer Handoff',
  'DesignOps',
  'AI Workflows',
  'Claude Code',
  'ChatGPT',
  'Google Docs',
  'Markdown / MDX',
  'HTML/CSS Literacy',
  'Git and GitHub (Learning)',
]

const professionalStatement = `My job, broadly speaking, is to make design systems that people would rather use than ignore. Leadership is mostly translation: turning strategy into something a team can actually do on a Tuesday without anyone crying. Craft is what earns a system the right to be adopted, rather than merely tolerated. Problem solving is staring at an ambiguous problem until it becomes a slightly less ambiguous one. The three pillars below are how this works in practice, assuming the universe cooperates, which it occasionally does.`

const pillars = [
  {
    index: '01',
    title: 'Value at scale',
    body: 'The solutions I build are consumable across an entire ecosystem, not locked to a single feature or product. Every token, component, and pattern I ship lands everywhere it is adopted, so the work keeps paying off long after it is done.',
  },
  {
    index: '02',
    title: 'Zero adoption tax',
    body: "If a system costs a team time to use, it isn't helping them. I build pieces that feel natural to pick up, so teams move faster the moment they start, not months later.",
  },
  {
    index: '03',
    title: 'Domain sovereignty',
    body: 'Product teams know their users best. My job is to hand them a strong foundation and then step aside. Shared where it matters, flexible where it counts.',
  },
]

const personalIntro = [
  `I didn't start in design systems. I started in branding and identity, back when it was just called "making things consistent," not "governance." Same concept, fewer buzzwords.`,
  `Then I moved into product design, where the same problems showed up faster, messier, and multiplied by teams and deadlines. That's when design systems revealed themselves as what they actually are: a way to help people stay in sync.`,
  `The goal is simple (which is not the same as easy): help teams move fast, make decisions with confidence, and build products that don't collapse under their own ambition.`,
]

const experiences = [
  {
    period: 'Mar 2023 – Present',
    title: 'Principal Product Designer, Design Systems',
    company: 'Salesforce',
    location: 'Seattle, Washington',
    logo: '/logos/salesforce.png',
    current: true,
    description: 'Craft and deliver design systems that enable teams to develop consistent and engaging user experiences. Develop scalable, flexible, and user-friendly systems that are easily consumed across various projects, aligning with business objectives and meeting user needs.',
  },
  {
    period: 'Aug 2021 – Mar 2023',
    title: 'Principal Product Designer, Tableau Design System',
    company: 'Tableau, From Salesforce',
    location: 'Seattle, Washington',
    logo: '/logos/tableau.png',
    current: false,
    description: 'Led the design system strategy for Tableau, defining governance frameworks, scaling component libraries, and aligning cross-functional teams on shared design language and tooling.',
  },
  {
    period: 'Dec 2020 – Aug 2021',
    title: 'Lead Product Designer, Tableau Design System',
    company: 'Tableau, From Salesforce',
    location: 'Seattle, Washington',
    logo: '/logos/tableau.png',
    current: false,
    description: 'Managed the day-to-day design system operations, mentored designers, and drove adoption across product teams while ensuring quality and consistency in component delivery.',
  },
  {
    period: 'Jul 2018 – Dec 2020',
    title: 'Senior Visual Designer, Tableau Design System',
    company: 'Tableau, From Salesforce',
    location: 'Seattle, Washington',
    logo: '/logos/tableau.png',
    current: false,
    description: 'Built alliances across design, engineering, content, and product management teams. Hosted weekly workshops on Tableau\'s design language system. Built and maintained Tableau\'s first UI Kit library. Performed internal research to identify areas of need, coached co-workers on communication and career guidance, and collaborated with engineering to align design with code.',
  },
  {
    period: 'Jun 2017 – Jun 2018',
    title: 'Senior Brand & Product Designer',
    company: 'GoGuardian',
    location: 'El Segundo, California',
    logo: '/logos/goguardian.png',
    current: false,
    description: 'Led the design of B2B marketing products that enabled school and district administrators to make informed purchasing decisions for student online safety tools. Worked with product managers, engineers, and sales enablement teams to define product and go-to-market strategies. Maintained brand consistency, managed design team workloads, and implemented project management processes to enhance efficiency.',
  },
  {
    period: 'Feb 2016 – Mar 2017',
    title: 'Senior Visual & Brand Designer, Prime Now',
    company: 'Amazon',
    location: 'Seattle, Washington',
    logo: '/logos/amazon.png',
    current: false,
    description: 'Designed seamless experiences across digital platforms and touchpoints for Amazon\'s 1-2 hour delivery service. Collaborated with cross-functional teams to develop cohesive design guidelines supporting in-house and third-party partners. Created and maintained design systems, style guides, and design patterns. Mentored junior designers on the team.',
  },
  {
    period: 'Oct 2014 – Jan 2016',
    title: 'Senior Visual Designer, Freelance',
    company: 'Freelance',
    location: 'Seattle, Washington',
    note: 'Clients: REI · Boeing · Touch Worldwide · DNA',
    logo: '/logos/freelance.png',
    current: false,
    description: 'Provided on-brand design solutions and services including internal communications, product launches, event experiences, and campaign designs across print and digital deliverables.',
  },
  {
    period: 'Aug 2010 – Oct 2014',
    title: 'Graphic Designer',
    company: 'The Pokémon Company, Int',
    location: 'Bellevue, Washington',
    logo: '/logos/pokemon.png',
    current: false,
    description: 'Streamlined the team\'s design process. Owned proofing and approvals for playing cards, packaging, and marketing materials. Led brainstorming sessions and design reviews, mentored junior staff, and presented solutions to senior leadership.',
  },
  {
    period: 'Feb 2009 – Nov 2009',
    title: 'Graphic Designer',
    company: 'Catalyst Marketing',
    location: 'Seattle, Washington',
    logo: '/logos/catalyst.png',
    current: false,
    description: 'Collaborated with marketing, account managers, and external vendors to design and deliver on-brand promotional items supporting product launches and programs for several clients.',
  },
  {
    period: 'Feb 2008 – Feb 2009',
    title: 'Graphic Designer',
    company: 'Meridian Group of Companies',
    location: 'Seattle, Washington',
    logo: '/logos/meridian.png',
    current: false,
    description: 'Provided design support for marketing and brands across companies in transportation, ticketing, home-building, loan servicing, and GPS-enabled entertainment. Deliverables ranged from static websites to vehicle wraps, logos, and brochures.',
  },
  {
    period: 'May 2007 – Dec 2007',
    title: 'Graphic Designer',
    company: 'Spitfire Studios',
    location: 'Claremont, California',
    logo: '/logos/spitfire.png',
    current: false,
    description: 'Developed on-brand marketing and web materials for clients in the medical and homebuilding industries in Southern California.',
  },
]

const education = [
  {
    degree: 'Bachelor of Fine Arts, Graphic Design',
    school: 'California State University',
    year: '2007',
    location: 'Fullerton, California',
    logo: '/logos/cal-state-fullerton.png',
  },
  {
    degree: 'Associate of Fine Arts',
    school: 'Victor Valley College',
    year: '2000',
    location: 'Victorville, California',
    logo: '/logos/vvc.png',
  },
  {
    degree: 'Associate of Liberal Arts',
    school: 'Victor Valley College',
    year: '2000',
    location: 'Victorville, California',
    logo: '/logos/vvc.png',
  },
]

const certificates = [
  {
    title: 'AI Design Systems',
    issuer: 'Memorisely',
    date: 'Feb 2026',
    logo: '/logos/memorisely.png',
    description:
      'Advanced program focused on building, scaling, and operationalizing modern design systems with AI integration. Token architecture, component modeling, documentation standards, governance frameworks, and AI-assisted workflows.',
  },
  {
    title: 'Accelerate',
    issuer: 'Salesforce',
    date: 'Aug 2022',
    logo: '/logos/salesforce-accelerate.png',
    description:
      "Structured early-career development program focused on business impact, product knowledge, and customer engagement. Validates foundational expertise in Salesforce's platform, go-to-market strategy, and core values.",
  },
  {
    title: 'UX Design',
    issuer: 'Springboard',
    date: 'May 2018',
    logo: '/logos/springboard.png',
    description:
      'Intensive, mentor-led program in user experience research, interaction design, prototyping, and usability testing.',
  },
  {
    title: 'Human-Centered Design: An Introduction',
    issuer: 'Coursera',
    date: 'Apr 2017',
    logo: '/logos/coursera.png',
    roundedLogo: true,
    description:
      'Foundational training in human-centered design principles and methods. Empathy-driven research, problem framing, ideation, prototyping, and iterative testing.',
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Section header with animated rule ───────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <motion.div
      className="flex items-center gap-5 mb-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.h2
        className="shrink-0 text-lg font-bold tracking-[0.08em] uppercase text-ink"
        variants={fadeUp}
        custom={0}
      >
        {label}
      </motion.h2>
      <motion.div
        className="flex-1 h-px bg-rule origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 pt-28 pb-16">

      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="mb-20">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-full">
              <Image
                src="/images/kyle-goodwin.png"
                alt="Kyle Goodwin"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h1
              className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight mb-3"
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate="show"
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-base font-light text-terracotta-dark leading-relaxed"
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate="show"
            >
              Driving scalable product outcomes by aligning teams, systems, and strategy
              into cohesive, execution-ready frameworks.
            </motion.p>
          </div>
        </div>

      </section>

      {/* ── Contact + Download Resume ─────────────────────────────────── */}
      <section className="mb-14 print-contact">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-b border-rule py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[13px] text-ink">
            <a
              href="mailto:kyle@kylegoodwin.com"
              className="hover:text-terracotta-dark transition-colors"
            >
              kyle@kylegoodwin.com
            </a>
            <a
              href="tel:+12067347977"
              className="hover:text-terracotta-dark transition-colors"
            >
              206.734.7977
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 text-[11px] font-sans font-700 uppercase tracking-[0.16em] bg-ink text-cream px-5 py-2.5 hover:bg-terracotta-dark transition-colors self-start sm:self-auto"
          >
            Download Resume
          </button>
        </div>
      </section>

      {/* ── Personal Intro (unlabeled) ─────────────────────────────────── */}
      <section className="mb-20 no-print">
        <motion.div
          className="space-y-4 text-[15px] font-light leading-relaxed text-ink/80"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {personalIntro.map((para, i) => (
            <motion.p key={i} variants={listItem}>{para}</motion.p>
          ))}
        </motion.div>
      </section>

      {/* ── Professional Statement ─────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Professional Statement" />
        <motion.p
          className="text-[15px] font-light leading-relaxed text-ink/80 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {professionalStatement}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.index} variants={listItem} className="bg-cream p-6">
              <p className="text-[10px] font-sans font-700 uppercase tracking-[0.2em] text-terracotta-dark mb-4">
                {pillar.index}
              </p>
              <h3 className="text-base font-bold text-ink mb-3">{pillar.title}</h3>
              <p className="text-[13px] font-light text-ink/60 leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Professional Skills ────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Professional Skills" />
        <motion.div
          className="flex flex-wrap gap-2"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {professionalSkills.map((skill) => (
            <motion.span
              key={skill}
              variants={listItem}
              className="text-[11px] font-sans font-500 uppercase tracking-[0.12em] text-mid-gray border border-rule px-3 py-1.5"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── Technical Skills ───────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Technical Skills" />
        <motion.div
          className="flex flex-wrap gap-2"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {technicalSkills.map((skill) => (
            <motion.span
              key={skill}
              variants={listItem}
              className="text-[11px] font-sans font-500 uppercase tracking-[0.12em] text-mid-gray border border-rule px-3 py-1.5"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Experience" />
        <motion.div
          className="space-y-7"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={`${exp.title}-${exp.period}`}
              variants={listItem}
              className={`flex gap-4 items-start ${exp.company.includes('Tableau') ? 'ml-12' : ''}`}
            >
              <div className="shrink-0 w-8 h-8 flex items-center justify-center mt-0.5">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 pt-0.5">
                <p className={`text-[10px] font-sans font-700 uppercase tracking-[0.16em] mb-1 ${exp.current ? 'text-terracotta-dark' : 'text-mid-gray'}`}>
                  {exp.period}
                </p>
                <h3 className="text-[15px] font-semibold text-ink leading-snug">{exp.title}</h3>
                <p className="text-[13px] font-light text-mid-gray mt-0.5">{exp.company}</p>
                <p className="text-[11px] text-mid-gray mt-0.5">{exp.location}</p>
                {exp.note && (
                  <p className="text-[11px] text-mid-gray mt-1 italic">{exp.note}</p>
                )}
                {exp.description && (
                  <p className="text-[13px] font-light text-ink/60 leading-relaxed mt-2">{exp.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Education ──────────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Education" />
        <motion.div
          className="space-y-7"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {education.map((edu, i) => (
            <motion.div key={`${edu.degree}-${i}`} variants={listItem} className="flex gap-4 items-start">
              <div className="shrink-0 w-8 h-8 flex items-center justify-center mt-0.5">
                <Image src={edu.logo} alt={edu.school} width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="text-[15px] font-semibold text-ink leading-snug">{edu.degree}</h3>
                <p className="text-[13px] font-light text-mid-gray mt-0.5">{edu.school}</p>
                <p className="text-[11px] text-mid-gray mt-0.5">{edu.year} · {edu.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Certificates ───────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader label="Certificates" />
        <motion.div
          className="space-y-8"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {certificates.map((cert) => (
            <motion.div key={cert.title} variants={listItem} className="flex gap-4 items-start">
              <div className={`shrink-0 w-8 h-8 flex items-center justify-center mt-0.5 ${cert.roundedLogo ? 'rounded-sm overflow-hidden' : ''}`}>
                <Image src={cert.logo} alt={cert.issuer} width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">{cert.date}</p>
                <h3 className="text-[15px] font-semibold text-ink leading-snug">{cert.title}</h3>
                <p className="text-[13px] font-light text-mid-gray mt-0.5">{cert.issuer}</p>
                <p className="text-[13px] font-light text-ink/60 leading-relaxed mt-2">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Volunteering ───────────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Volunteering" />
        <motion.div
          className="flex gap-4 items-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shrink-0 w-8 h-8 flex items-center justify-center mt-0.5 rounded-sm overflow-hidden">
            <Image src="/logos/aiga.png" alt="AIGA" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">Jun 2013 – Jun 2015</p>
            <h3 className="text-[15px] font-semibold text-ink leading-snug">Education Director, Programming</h3>
            <p className="text-[13px] font-light text-mid-gray mt-0.5">AIGA, Seattle Chapter</p>
            <p className="text-[11px] text-mid-gray mt-0.5">Seattle, Washington</p>
            <p className="text-[13px] font-light text-ink/60 leading-relaxed mt-2">
              Led a team of 10 volunteers over a two-year term to revitalize education
              programming within the Seattle design community. Assessed past event relevance,
              gathered member insights across local and regional audiences, and built a
              forward-looking program strategy. Delivered panels, portfolio reviews, lectures,
              workshops, studio tours, and a weeklong regional conference.
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
