"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { SERVICES } from "../services"
import { SiteShell, useContact, MagneticButton, MaskedWords, BrowserFrame, FaqItem, EASE, SERVICE_LINKS } from "./site"

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.95, ease: EASE },
}

export default function ServicePage({ slug }: { slug: string }) {
  return (
    <SiteShell>
      <ServiceContent slug={slug} />
    </SiteShell>
  )
}

function ServiceContent({ slug }: { slug: string }) {
  const s = SERVICES[slug]
  const openContact = useContact()

  return (
    <>
      {/* ── EN-TÊTE ─────────────────────────────────────────── */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[110vw] h-[70vh] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.07), transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <motion.nav
            aria-label="Fil d'Ariane"
            className="text-[11px] tracking-[0.2em] uppercase text-white/35 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link href="/" className="hover:text-white transition-colors duration-200">Accueil</Link>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/60">{s.label}</span>
          </motion.nav>

          <motion.p
            className="text-[10px] tracking-[0.38em] uppercase text-white/40 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {s.eyebrow}
          </motion.p>
          <h1 className="font-semibold tracking-[-0.04em] leading-[1] text-white max-w-[16ch]" style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.8rem)" }}>
            <MaskedWords text={s.h1} delay={0.25} wordClass="text-sheen" />
          </h1>

          <div className="mt-12 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            >
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-[52ch]">{s.intro[0]}</p>
              <p className="mt-5 text-white/40 leading-[1.85] max-w-[56ch]">{s.intro[1]}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticButton
                  onClick={(e) => { e.preventDefault(); openContact() }}
                  className="inline-flex items-center gap-2 bg-white text-zinc-950 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
                >
                  Demander un devis gratuit
                </MagneticButton>
                <MagneticButton
                  href="#inclus"
                  className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/45 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
                >
                  Ce qui est inclus
                </MagneticButton>
              </div>
            </motion.div>

            {/* Fiche récapitulative */}
            <dl className="grid gap-3">
              {[
                { k: "Tarif", v: s.price, n: s.priceNote, big: true },
                { k: "Délai", v: s.delay },
                { k: "Périmètre", v: s.scope },
              ].map((row, i) => (
                <motion.div
                  key={row.k}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.12, ease: EASE }}
                >
                  <dt className="text-[10px] tracking-[0.3em] uppercase text-white/30">{row.k}</dt>
                  <dd className={row.big ? "mt-1 text-4xl font-semibold tracking-tight text-white" : "mt-1.5 text-white/75"}>
                    {row.big ? <span className="text-sheen">{row.v}</span> : row.v}
                  </dd>
                  {row.n && <dd className="text-xs text-white/40 mt-1">{row.n}</dd>}
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── POUR QUI ────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36" style={{ backgroundColor: "#0f0f11" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...reveal}>
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-6">Pour qui</p>
            <h2 className="font-semibold tracking-tight leading-[1.05] text-white max-w-[20ch]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}>
              <span className="text-sheen">Vous vous reconnaissez ?</span>
            </h2>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {s.forWho.map((c, i) => (
              <motion.article
                key={c.title}
                className="rounded-[1.5rem] border border-white/[0.08] bg-[#18181b] p-8"
                initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -6 }}
              >
                <p className="text-[10px] font-mono text-white/30">0{i + 1}</p>
                <h3 className="mt-6 text-xl md:text-2xl font-semibold tracking-tight text-white">{c.title}</h3>
                <p className="mt-4 text-sm text-white/50 leading-[1.8]">{c.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Included items={s.included} />

      <Steps steps={s.steps} />

      {s.project && <ProjectReveal project={s.project} />}

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div className="mb-14" {...reveal}>
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-6">Questions fréquentes</p>
            <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}>
              <span className="text-sheen">{s.label} : vos questions.</span>
            </h2>
          </motion.div>
          <div className="border-t border-white/[0.08]">
            {s.faq.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── AUTRES SERVICES (maillage interne) ─────────────── */}
      <section className="relative py-24 border-t border-white/[0.06]" style={{ backgroundColor: "#0f0f11" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-8">Autres services</p>
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICE_LINKS.filter((l) => l.href !== `/${slug}`).map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-2xl border border-white/[0.08] px-6 py-6 text-white/70 hover:text-zinc-950 hover:bg-white transition-colors duration-300"
                >
                  <span className="text-lg font-medium tracking-tight">{l.label}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* Ce qui est inclus : titre épinglé, éléments qui se cochent au fil du scroll */
function Included({ items }: { items: string[] }) {
  return (
    <section id="inclus" className="relative py-28 md:py-36 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
        <div className="md:sticky md:top-32 self-start">
          <p className="text-[10px] tracking-[0.34em] uppercase text-zinc-400 mb-6">Inclus</p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-zinc-900" style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}>
            Ce que vous recevez.
          </h2>
          <p className="mt-6 text-zinc-500 leading-[1.8] max-w-[36ch]">Tout est détaillé dans le devis, avant le moindre engagement. Pas de frais cachés.</p>
        </div>
        <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
          {items.map((it, i) => (
            <motion.li
              key={it}
              className="flex items-start gap-5 py-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <motion.span
                className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </svg>
              </motion.span>
              <span className="text-lg md:text-xl text-zinc-800 leading-snug">
                <span className="text-[10px] font-mono text-zinc-400 mr-3">{String(i + 1).padStart(2, "0")}</span>
                {it}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* Déroulé : une ligne se trace au scroll et allume chaque étape */
function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] })
  const line = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <section className="relative py-28 md:py-36" style={{ backgroundColor: "#18181b" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div {...reveal}>
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-6">Déroulé</p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}>
            <span className="text-sheen">Comment ça se passe.</span>
          </h2>
        </motion.div>
        <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
          <div className="absolute left-[11px] md:left-[19px] top-2 bottom-2 w-px bg-white/[0.08]">
            <motion.div className="w-full h-full bg-white origin-top" style={{ scaleY: line }} />
          </div>
          <ol className="space-y-16">
            {steps.map((st, i) => (
              <Step key={st.title} step={st} i={i} total={steps.length} progress={line} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({ step, i, total, progress }: { step: { title: string; text: string }; i: number; total: number; progress: ReturnType<typeof useSpring> }) {
  const at = i / Math.max(1, total - 1)
  const lo = Math.max(0, at - 0.12)
  const hi = Math.min(1, at + 0.02)
  const dot = useTransform(progress, [lo, hi], [0.6, 1])
  const glow = useTransform(progress, [lo, hi], ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"])
  const textOpacity = useTransform(progress, [lo, hi], [0.3, 1])
  return (
    <li className="relative">
      <motion.span
        className="absolute -left-10 md:-left-16 top-1 w-[23px] h-[23px] md:w-[39px] md:h-[39px] rounded-full border-2 bg-[#18181b] flex items-center justify-center text-[10px] font-mono"
        style={{ scale: dot, borderColor: glow, color: glow }}
      >
        {i + 1}
      </motion.span>
      <motion.div style={{ opacity: textOpacity }}>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{step.title}</h3>
        <p className="mt-3 text-white/55 leading-[1.85] max-w-[56ch]">{step.text}</p>
      </motion.div>
    </li>
  )
}

/* Réalisation liée : révélation en masque + parallaxe */
function ProjectReveal({ project }: { project: NonNullable<(typeof SERVICES)[string]["project"]> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const clip = useTransform(enter, [0, 1], ["inset(18% 14% 18% 14% round 32px)", "inset(0% 0% 0% 0% round 16px)"])
  const imgY = useTransform(pass, [0, 1], ["-6%", "6%"])

  return (
    <section className="relative py-28 md:py-36" style={{ backgroundColor: "#0f0f11" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-[1.35fr_0.65fr] gap-10 md:gap-16 items-center">
        <motion.div style={{ clipPath: clip }}>
          <BrowserFrame url={project.url}>
            <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
              <motion.div className="relative w-full h-[112%]" style={{ y: imgY }}>
                <Image src={project.src} alt={`${project.title} : ${project.tag.toLowerCase()}, site réalisé par Thaylart`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover object-top" />
              </motion.div>
            </div>
          </BrowserFrame>
        </motion.div>
        <motion.div {...reveal}>
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">Exemple de réalisation · {project.tag}</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
            <span className="text-sheen">{project.title}.</span>
          </h2>
          <p className="mt-6 text-white/50 leading-[1.85] max-w-[42ch]">{project.text}</p>
          <Link href="/#realisations" className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-white/50 hover:text-white transition-colors duration-200">
            Toutes les réalisations <span>&#8594;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
