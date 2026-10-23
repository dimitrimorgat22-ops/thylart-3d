"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FAQ, ZONES, REGIONS } from "./content"
import { SiteShell, useContact, MagneticButton, MaskedWords, BrowserFrame, FaqItem, EASE } from "./components/site"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
  MotionConfig,
  animate,
  useInView,
  type MotionValue,
} from "framer-motion"

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   CONTACT MODAL — formulaire de contact via Web3Forms
═══════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
   OUTILS MOTION
═══════════════════════════════════════════════════════════════ */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/* Compteur animé à l'entrée dans l'écran */
function AnimatedCounter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView || !ref.current) return
    const ctrl = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })
    return () => ctrl.stop()
  }, [inView, to, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

/* Titre révélé mot par mot derrière des masques */

/* Bandeau défilant dont la vitesse et le sens suivent le scroll */
function VelocityMarquee({ items, baseVelocity = -2, dark = true }: { items: string[]; baseVelocity?: number; dark?: boolean }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  return (
    <div className={`overflow-hidden border-y py-5 ${dark ? "border-white/[0.07] bg-[#18181b]" : "border-zinc-200 bg-zinc-100"}`}>
      <motion.div className="flex whitespace-nowrap w-max" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((item) => (
              <span key={item} className={`text-sm md:text-base tracking-[0.3em] uppercase shrink-0 ${dark ? "text-white/30" : "text-zinc-400"}`}>
                {item}
                <span className={`inline-block mx-6 ${dark ? "text-white/15" : "text-zinc-300"}`}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* Fenêtre de navigateur (cadre des maquettes) */

/* ═══════════════════════════════════════════════════════════════
   HERO — le navigateur se redresse au scroll
═══════════════════════════════════════════════════════════════ */
const SHOWCASE = [
  { src: "/realisations/maisons-bleues.jpg", url: "maisonsbleues.fr", alt: "Site internet des Maisons Bleues, constructeur de maisons dans le Gard, réalisé par Thaylart" },
  { src: "/realisations/yuna.jpg", url: "thaylart.com/yuna", alt: "Boutique en ligne Yuna Kids réalisée par Thaylart" },
]

function Hero({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const textY = useTransform(p, [0, 0.5], ["0%", "-30%"])
  const textOpacity = useTransform(p, [0, 0.22], [1, 0])
  const rotateX = useTransform(p, [0, 0.6], [32, 0])
  const scale = useTransform(p, [0, 0.6], [0.78, 1])
  const frameY = useTransform(p, [0, 0.6], ["38vh", "0vh"])
  const glow = useTransform(p, [0, 0.6], [0.15, 0.45])

  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SHOWCASE.length), 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col items-center">
        {/* halo */}
        <motion.div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] rounded-[50%] pointer-events-none"
          style={{ opacity: glow, background: "radial-gradient(closest-side, rgba(255,255,255,0.10), transparent)" }}
        />

        <motion.div className="relative z-10 pt-[18vh] md:pt-[16vh] px-6 text-center" style={{ y: textY, opacity: textOpacity }}>
          {/* Le h1 porte les mots-clés (métier + ville), le slogan reste le plus visible */}
          <motion.h1
            className="text-[10px] tracking-[0.38em] uppercase text-white/40 mb-7 max-w-[34ch] md:max-w-none mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Création de sites internet · Bagnols-sur-Cèze &amp; Gard
          </motion.h1>
          <p className="font-semibold tracking-[-0.045em] leading-[0.95] text-white" style={{ fontSize: "clamp(2.6rem, 8vw, 7.5rem)" }}>
            <MaskedWords text="Des sites web qui" delay={0.3} wordClass="text-sheen" />
            <br />
            <MaskedWords text="travaillent pour vous." delay={0.55} wordClass="text-sheen text-sheen--muted" sheenOffset={1} />
          </p>
          <motion.p
            className="mt-7 mx-auto text-base md:text-lg text-white/50 max-w-[48ch] leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            Sites vitrines et e-commerce sur mesure pour les entreprises. Un design soigné au pixel près,
            pensé pour transformer vos visiteurs en clients.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          >
            <MagneticButton
              onClick={(e) => { e.preventDefault(); onContact() }}
              className="inline-flex items-center gap-2 bg-white text-zinc-950 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
            >
              Demander un devis
            </MagneticButton>
            <MagneticButton
              href="#realisations"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/45 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
            >
              Voir les réalisations
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Navigateur en perspective */}
        <div className="absolute inset-x-0 bottom-0 top-0 z-20 flex items-center justify-center px-4 md:px-10 pointer-events-none" style={{ perspective: 1400 }}>
          <motion.div
            className="w-full max-w-6xl"
            style={{ rotateX, scale, y: frameY, transformOrigin: "50% 100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            <BrowserFrame url={SHOWCASE[slide].url}>
              <div className="relative aspect-[16/10] bg-zinc-900">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={SHOWCASE[slide].src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <Image
                      src={SHOWCASE[slide].src}
                      alt={SHOWCASE[slide].alt}
                      fill
                      priority={slide === 0}
                      sizes="(max-width: 768px) 100vw, 1152px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </BrowserFrame>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MANIFESTE — les mots s'allument au fil du scroll
═══════════════════════════════════════════════════════════════ */
function Word({ children, range, progress, i }: { children: string; range: [number, number]; progress: MotionValue<number>; i: number }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span className="inline-block mr-[0.25em] text-sheen" style={{ opacity, y, animationDelay: `${i * 0.09}s` }}>
      {children}
    </motion.span>
  )
}

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const text = "Un site web n'est pas une carte de visite. C'est votre meilleur commercial : il travaille la nuit, le week-end, et ne prend jamais de vacances."
  const words = text.split(" ")
  return (
    <section className="relative py-36 md:py-52" style={{ backgroundColor: "#0f0f11" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-10">Ma conviction</p>
        <p ref={ref} className="font-semibold tracking-tight leading-[1.12] text-white" style={{ fontSize: "clamp(2rem, 5.2vw, 4.6rem)" }}>
          {words.map((w, i) => (
            <Word key={i} i={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MÉTHODE — un site se construit sous vos yeux (scroll épinglé)
═══════════════════════════════════════════════════════════════ */
const STEPS = [
  { num: "01", title: "Structure", text: "On définit ensemble vos objectifs, vos pages et le parcours de vos clients. Rien n'est dessiné au hasard." },
  { num: "02", title: "Design", text: "Une identité visuelle propre à votre entreprise : couleurs, typographies, rythme. Zéro template." },
  { num: "03", title: "Contenu", text: "Textes rédigés pour Google et pour vos clients, photos mises en valeur, appels à l'action clairs." },
  { num: "04", title: "En ligne", text: "Site rapide, adapté au mobile, référencé localement. Vous recevez les clés, je reste disponible." },
]

function BuildMockup({ p }: { p: MotionValue<number> }) {
  const design = useTransform(p, [0.22, 0.32], [0, 1])
  const content = useTransform(p, [0.47, 0.57], [0, 1])
  const live = useTransform(p, [0.72, 0.82], [0, 1])
  const wire = useTransform(p, [0.22, 0.32], [1, 0])
  const imgScale = useTransform(p, [0.47, 0.7], [1.25, 1])
  const ring = useTransform(p, [0.75, 0.95], [0, 1])
  const liveY = useTransform(live, [0, 1], [20, 0])
  const [url, setUrl] = useState("brouillon.local")
  useMotionValueEvent(p, "change", (v) => setUrl(v > 0.77 ? "atelier-riviere.fr" : "brouillon.local"))

  return (
    <BrowserFrame url={url} light>
      <div className="relative aspect-[16/11] bg-white overflow-hidden">
        {/* 1 · Wireframe */}
        <motion.div className="absolute inset-0 p-[5%] flex flex-col gap-[4%]" style={{ opacity: wire }}>
          <div className="flex justify-between items-center h-[6%]">
            <div className="w-[18%] h-full rounded bg-zinc-200" />
            <div className="flex gap-2 w-[40%] h-[60%]">{[0, 1, 2, 3].map((i) => <div key={i} className="flex-1 rounded bg-zinc-200" />)}</div>
          </div>
          <div className="flex gap-[5%] flex-1">
            <div className="flex-1 flex flex-col gap-[6%] justify-center">
              <div className="h-[12%] w-[90%] rounded bg-zinc-200" />
              <div className="h-[12%] w-[70%] rounded bg-zinc-200" />
              <div className="h-[5%] w-[80%] rounded bg-zinc-100 mt-[4%]" />
              <div className="h-[5%] w-[60%] rounded bg-zinc-100" />
              <div className="h-[11%] w-[35%] rounded-full bg-zinc-300 mt-[5%]" />
            </div>
            <div className="flex-1 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 text-[10px] tracking-[0.2em] uppercase">Image</div>
          </div>
          <div className="flex gap-[3%] h-[18%]">{[0, 1, 2].map((i) => <div key={i} className="flex-1 rounded-lg bg-zinc-100" />)}</div>
        </motion.div>

        {/* 2 · Design */}
        <motion.div className="absolute inset-0 p-[5%] flex flex-col gap-[4%] bg-[#f6f3ee]" style={{ opacity: design }}>
          <div className="flex justify-between items-center h-[6%]">
            <span className="text-[1.6vw] md:text-[0.95vw] font-semibold tracking-[0.2em] text-zinc-900">ATELIER RIVIÈRE</span>
            <div className="flex gap-[1.2vw] text-[1.1vw] md:text-[0.6vw] uppercase tracking-[0.15em] text-zinc-500">
              <span>Savoir-faire</span><span>Réalisations</span><span>Avis</span><span>Contact</span>
            </div>
          </div>
          <div className="flex gap-[5%] flex-1">
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[1.1vw] md:text-[0.6vw] uppercase tracking-[0.25em] text-amber-700/70 mb-[4%]">Menuiserie · Uzès</p>
              <p className="text-[3.4vw] md:text-[2.1vw] font-semibold leading-[1.02] tracking-tight text-zinc-900">Le bois,<br />façonné pour durer.</p>
              <motion.div style={{ opacity: content }}>
                <p className="mt-[5%] text-[1.3vw] md:text-[0.72vw] leading-relaxed text-zinc-500 max-w-[90%]">Cuisines, escaliers et agencements sur mesure, fabriqués dans notre atelier depuis 1987.</p>
              </motion.div>
              <div className="mt-[7%] self-start rounded-full bg-zinc-900 text-white text-[1.2vw] md:text-[0.65vw] px-[1.4vw] py-[0.6vw]">Demander un devis</div>
            </div>
            <div className="flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-amber-200 to-amber-400 relative">
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: content,
                  scale: imgScale,
                  background: "repeating-linear-gradient(100deg, #8a5a2b 0px, #a8713a 14px, #93622f 28px, #b47c43 40px)",
                }}
              />
            </div>
          </div>
          <div className="flex gap-[3%] h-[18%]">
            {["4,9/5 · 86 avis", "Devis sous 48h", "Atelier local"].map((t) => (
              <div key={t} className="flex-1 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
                <motion.span className="text-[1.2vw] md:text-[0.7vw] font-medium text-zinc-700" style={{ opacity: content }}>{t}</motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 · En ligne */}
        <motion.div className="absolute right-[4%] bottom-[26%] flex items-center gap-[0.8vw] rounded-2xl bg-zinc-950 text-white px-[1.4vw] py-[1vw] shadow-2xl" style={{ opacity: live, y: liveY }}>
          <svg viewBox="0 0 40 40" className="w-[5vw] h-[5vw] md:w-[3vw] md:h-[3vw] -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
            <motion.circle cx="20" cy="20" r="16" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" style={{ pathLength: ring }} />
          </svg>
          <div>
            <p className="text-[1.6vw] md:text-[1vw] font-semibold leading-none">100</p>
            <p className="text-[1vw] md:text-[0.55vw] uppercase tracking-[0.15em] text-white/50 mt-1">Performance</p>
          </div>
        </motion.div>
        <motion.div className="absolute left-[4%] top-[3%] flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1" style={{ opacity: live }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[1.2vw] md:text-[0.6vw] uppercase tracking-[0.18em] text-emerald-700">En ligne</span>
        </motion.div>
      </div>
    </BrowserFrame>
  )
}

function StepItem({ step, i, p }: { step: (typeof STEPS)[number]; i: number; p: MotionValue<number> }) {
  const start = i / STEPS.length
  const end = (i + 1) / STEPS.length
  const c = (v: number) => Math.min(1, Math.max(0, v))
  const opacity = useTransform(p, [c(start - 0.08), start, c(end - 0.04), c(end + 0.04)], [0.25, 1, 1, i === STEPS.length - 1 ? 1 : 0.25])
  const bar = useTransform(p, [start, end], [0, 1])
  return (
    <motion.div className="relative pl-6 py-4" style={{ opacity }}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]">
        <motion.div className="w-full h-full bg-white origin-top" style={{ scaleY: bar }} />
      </div>
      <p className="text-[10px] font-mono text-white/35 mb-1">{step.num}</p>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{step.title}</h3>
      <p className="mt-2 text-sm text-white/45 leading-relaxed max-w-[38ch]">{step.text}</p>
    </motion.div>
  )
}

function Method() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // lissage par ressort : plus fluide, et évite les ratés de l'accélération matérielle
  const p = useSpring(scrollYProgress, { stiffness: 300, damping: 50, restDelta: 0.0005 })
  const [active, setActive] = useState(0)
  useMotionValueEvent(p, "change", (v) => setActive(Math.max(0, Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)))))

  return (
    <section id="methode" ref={ref} className="relative h-[420vh]" style={{ backgroundColor: "#18181b" }}>
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">Méthode</p>
            <h2 className="font-semibold tracking-tight leading-[1.05] text-white mb-6 md:mb-10" style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}>
              <span className="text-sheen">Votre site se construit<br className="hidden md:block" /> sous vos yeux.</span>
            </h2>
            <div className="hidden md:block">
              {STEPS.map((s, i) => <StepItem key={s.num} step={s} i={i} p={p} />)}
            </div>
            <div className="md:hidden h-24">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <p className="text-[10px] font-mono text-white/35">{STEPS[active].num} / 04</p>
                  <h3 className="text-xl font-semibold text-white">{STEPS[active].title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{STEPS[active].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <BuildMockup p={p} />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   OFFRES — défilement horizontal piloté par le scroll
═══════════════════════════════════════════════════════════════ */
const OFFERS = [
  {
    num: "01", href: "/diagnostic-site-internet", title: "Diagnostic de présence en ligne", price: "400 €", unit: "rapport complet",
    text: "Votre site, votre fiche Google, vos avis et vos concurrents passés au crible. Vous repartez avec un plan d'action clair, priorisé.",
    points: ["Audit technique et SEO", "Analyse de la concurrence locale", "Plan d'action chiffré"],
  },
  {
    num: "02", href: "/creation-site-vitrine", title: "Site vitrine sur mesure", price: "dès 1 100 €", unit: "ou 4 × 275 €",
    text: "Un site unique, conçu pour votre métier et vos clients. Rapide, adapté au mobile, et visible sur Google dès la mise en ligne.",
    points: ["Jusqu'à 5 pages, design 100 % sur mesure", "Référencement local", "En ligne en 2 à 3 semaines"],
  },
  {
    num: "03", href: "/refonte-site-internet", title: "Refonte complète", price: "dès 1 500 €", unit: "de A à Z",
    text: "Votre site actuel ne vous ramène pas de clients ? On garde ce qui fonctionne, on reconstruit tout le reste.",
    points: ["Diagnostic de l'existant inclus", "Nouveau design et nouveaux contenus", "Redirections sans perte de référencement"],
  },
  {
    num: "04", href: "/creation-boutique-en-ligne", title: "Boutique en ligne", price: "sur devis", unit: "selon catalogue",
    text: "Une boutique e-commerce codée sur mesure, du catalogue au paiement, pensée pour vendre et rassurer.",
    points: ["Catalogue, panier et paiement", "CGV et pages légales", "Connexion Shopify si besoin"],
  },
]

function Offers({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(p, (v) => -v * dist)
  const progress = useTransform(p, [0, 1], [0, 1])

  useEffect(() => {
    const measure = () => { if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth)) }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <section id="offres" ref={ref} className="relative h-[340vh] bg-zinc-100">
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col justify-center">
        <motion.div ref={track} className="flex gap-5 md:gap-8 px-6 md:px-10 w-max items-stretch" style={{ x }}>
          {/* Intro */}
          <div className="w-[82vw] md:w-[34vw] shrink-0 flex flex-col justify-center pr-4">
            <p className="text-[10px] tracking-[0.34em] uppercase text-zinc-400 mb-6">Offres · Création et refonte de sites internet</p>
            <h2 className="font-semibold tracking-tight leading-[1.04] text-zinc-900" style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}>
              Des tarifs clairs.<br />Pas de surprise.
            </h2>
            <p className="mt-6 text-zinc-500 leading-[1.8] max-w-[38ch]">
              Chaque projet est chiffré au forfait, après un échange gratuit. Vous savez exactement ce que vous payez, et ce que vous recevez.
            </p>
            <p className="mt-10 text-xs tracking-[0.2em] uppercase text-zinc-400 flex items-center gap-3">
              Faites défiler <span className="inline-block animate-pulse">&#8594;</span>
            </p>
          </div>

          {OFFERS.map((o, i) => (
            <motion.article
              key={o.num}
              className={`group w-[82vw] md:w-[30vw] min-h-[62vh] shrink-0 rounded-[1.5rem] p-7 md:p-9 flex flex-col ${i === 1 ? "bg-zinc-900 text-white" : "bg-white text-zinc-900 border border-zinc-200"}`}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono ${i === 1 ? "text-white/40" : "text-zinc-400"}`}>{o.num}</span>
                {i === 1 && <span className="text-[9px] tracking-[0.2em] uppercase rounded-full border border-white/20 px-3 py-1 text-white/60">Le plus demandé</span>}
              </div>
              <h3 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight leading-[1.1]">
                <Link href={o.href} className="underline-offset-4 decoration-1 hover:underline">{o.title}</Link>
              </h3>
              <p className={`mt-4 text-sm leading-[1.8] ${i === 1 ? "text-white/55" : "text-zinc-500"}`}>{o.text}</p>
              <ul className="mt-6 space-y-2.5">
                {o.points.map((pt) => (
                  <li key={pt} className={`text-sm flex gap-3 ${i === 1 ? "text-white/75" : "text-zinc-700"}`}>
                    <span className={i === 1 ? "text-white/35" : "text-zinc-300"}>—</span>{pt}
                  </li>
                ))}
              </ul>
              <div className={`mt-auto pt-8 border-t flex flex-wrap items-end justify-between gap-4 ${i === 1 ? "border-white/10" : "border-zinc-200"}`}>
                <div>
                  <p className="text-3xl font-semibold tracking-tight whitespace-nowrap">{o.price}</p>
                  <p className={`text-xs mt-1 ${i === 1 ? "text-white/40" : "text-zinc-400"}`}>{o.unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={o.href}
                    className={`whitespace-nowrap text-xs tracking-[0.16em] uppercase rounded-full border px-4 py-2.5 transition-colors duration-200 ${i === 1 ? "border-white/30 text-white hover:bg-white/10" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}
                  >
                    Voir l&apos;offre
                  </Link>
                  <button
                    type="button"
                    onClick={onContact}
                    className={`text-xs tracking-[0.16em] uppercase rounded-full px-4 py-2.5 transition-colors duration-200 cursor-pointer ${i === 1 ? "bg-white text-zinc-950 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-700"}`}
                  >
                    Devis
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="w-[4vw] shrink-0" />
        </motion.div>

        {/* barre de progression */}
        <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 h-px bg-zinc-300">
          <motion.div className="h-full bg-zinc-900 origin-left" style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   RÉALISATIONS — révélation en masque + parallaxe
═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    src: "/realisations/maisons-bleues.jpg", url: "maisonsbleues.fr", tag: "Refonte complète · Constructeur",
    title: "Les Maisons Bleues.", text: "Constructeur de maisons individuelles dans le Gard rhodanien depuis 2004. Un site repensé pour inspirer confiance, présenter les modèles et générer des demandes de devis qualifiées.",
    facts: ["Gard rhodanien", "SEO local", "Demandes de devis"],
  },
  {
    src: "/realisations/yuna.jpg", url: "thaylart.com/yuna", tag: "E-commerce · Puériculture",
    title: "Yuna Kids.", text: "Boutique en ligne de coussins de protection pour bébés. Une identité douce et joyeuse, un parcours d'achat fluide, du catalogue jusqu'au paiement.",
    facts: ["Boutique complète", "Panier et paiement", "CGV et pages légales"],
  },
]

function Project({ project, i }: { project: (typeof PROJECTS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const clip = useTransform(enter, [0, 1], ["inset(18% 14% 18% 14% round 32px)", "inset(0% 0% 0% 0% round 16px)"])
  const imgY = useTransform(pass, [0, 1], ["-6%", "6%"])
  const textY = useTransform(pass, [0, 1], [80, -80])
  const reverse = i % 2 === 1

  return (
    <div ref={ref} className={`grid md:grid-cols-[1.35fr_0.65fr] gap-10 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
      <motion.div className="[direction:ltr]" style={{ clipPath: clip }}>
        <BrowserFrame url={project.url}>
          <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
            <motion.div className="relative w-full h-[112%]" style={{ y: imgY }}>
              <Image
                src={project.src}
                alt={`${project.title.replace(/\.$/, "")} : ${project.tag.toLowerCase()}, site réalisé par Thaylart`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </BrowserFrame>
      </motion.div>
      <motion.div className="[direction:ltr]" style={{ y: textY }}>
        <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">0{i + 1} — {project.tag}</p>
        <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white"><span className="text-sheen">{project.title}</span></h3>
        <p className="mt-6 text-white/50 leading-[1.85] max-w-[42ch]">{project.text}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.facts.map((f) => (
            <span key={f} className="text-[10px] tracking-[0.16em] uppercase text-white/50 border border-white/10 rounded-full px-3 py-1.5">{f}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Work() {
  return (
    <section id="realisations" className="relative py-32 md:py-44" style={{ backgroundColor: "#0f0f11" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="mb-24 md:mb-36"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Réalisations</p>
          <h2 className="font-semibold tracking-tight leading-[1.02] text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
            <span className="text-sheen">Des entreprises réelles.</span><br /><span className="text-sheen text-sheen--muted">Des résultats visibles.</span>
          </h2>
        </motion.div>
        <div className="space-y-36 md:space-y-56">
          {PROJECTS.map((p, i) => <Project key={p.title} project={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ZONE D'INTERVENTION — signaux de référencement local
═══════════════════════════════════════════════════════════════ */
function Zones() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-12%"])

  return (
    <section id="zone" ref={ref} className="relative py-32 md:py-40 overflow-hidden" style={{ backgroundColor: "#0f0f11" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Zone d&apos;intervention</p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)" }}>
            <span className="text-sheen">Votre créateur de sites internet dans le Gard.</span>
          </h2>
          <p className="mt-7 text-white/45 leading-[1.85] max-w-[46ch]">
            Basé à Saint-Nazaire, à quelques minutes de Bagnols-sur-Cèze, je me déplace pour rencontrer les entreprises du Gard rhodanien,
            du Vaucluse et de l&apos;Ardèche. Un vrai interlocuteur local, joignable et disponible. Et pour les entreprises plus éloignées,
            tout se fait aussi très bien à distance.
          </p>
        </motion.div>

        <ul className="flex flex-wrap gap-3 md:pt-16" aria-label="Villes desservies">
          {ZONES.map((z, i) => (
            <motion.li
              key={z}
              className="text-sm md:text-base text-white/70 border border-white/[0.1] rounded-full px-5 py-2.5 hover:bg-white hover:text-zinc-950 transition-colors duration-300"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              {z}
            </motion.li>
          ))}
          {REGIONS.map((r, i) => (
            <motion.li
              key={r}
              className="text-sm md:text-base text-zinc-950 bg-white rounded-full px-5 py-2.5"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: (ZONES.length + i) * 0.05, ease: EASE }}
            >
              {r}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* nom de région géant en filigrane, qui glisse au scroll */}
      <motion.p
        aria-hidden
        className="mt-24 whitespace-nowrap font-semibold tracking-[-0.05em] leading-none text-white/[0.04] select-none"
        style={{ x, fontSize: "clamp(6rem, 18vw, 16rem)" }}
      >
        Gard rhodanien · Gard rhodanien
      </motion.p>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FAQ — accordéon animé + données structurées FAQPage
═══════════════════════════════════════════════════════════════ */

function Faq() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  }
  return (
    <section id="faq" className="relative py-32 md:py-40" style={{ backgroundColor: "#18181b" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Questions fréquentes</p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)" }}>
            <span className="text-sheen">Tout savoir avant de créer votre site.</span>
          </h2>
        </motion.div>
        <div className="border-t border-white/[0.08]">
          {FAQ.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT — l'écran s'inverse au scroll
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ThaylartLanding() {
  return (
    <SiteShell home>
      <HomeContent />
    </SiteShell>
  )
}

function HomeContent() {
  const openContact = useContact()
  return (
    <>
      <Hero onContact={openContact} />

      <VelocityMarquee items={["Sites vitrines", "E-commerce", "Refonte", "Référencement local", "Design sur mesure", "Gard rhodanien"]} />

      <Manifesto />

      <Method />

      <Offers onContact={openContact} />

      <Work />

    {/* ── CHIFFRES ───────────────────────────────────────── */}
    <section className="relative py-28 border-y border-white/[0.06]" style={{ backgroundColor: "#18181b" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-12">
        {[
          { value: 24, suffix: "h", label: "pour vous répondre" },
          { value: 100, suffix: "%", label: "sur mesure, zéro template" },
          { value: 1, suffix: "", label: "interlocuteur unique, du début à la fin" },
          { value: 4, prefix: "×", suffix: "", label: "paiement possible en plusieurs fois" },
        ].map(({ value, suffix, prefix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
          >
            <p className="text-5xl md:text-6xl font-semibold tracking-tight text-white">
              <span className="text-sheen"><AnimatedCounter to={value} suffix={suffix} prefix={prefix} /></span>
            </p>
            <p className="text-xs text-white/35 mt-3 tracking-wide max-w-[20ch]">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── À PROPOS ──────────────────────────────────────────── */}
    <section id="a-propos" className="relative py-36" style={{ backgroundColor: "#18181b" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[0.85fr_1fr] gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40, clipPath: "inset(30% 0% 0% 0% round 24px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden"
          >
            <Image src="/Portrait.jpg" alt="Dimitri Morgat, créateur de sites internet près de Bagnols-sur-Cèze" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_45%)] pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/55">Dimitri Morgat</span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-white/55">Fondateur</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, delay: 0.14, ease: EASE }}
          >
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">À propos</p>
            <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}>
              <span className="text-sheen">L&apos;artisan derrière<br />vos pages.</span>
            </h2>
            <p className="mt-8 text-white/55 leading-[1.85] max-w-[48ch]">
              Le Japon, Madagascar, l&apos;Angleterre : mes études m&apos;ont fait traverser trois continents avant de me ramener ici, près de Bagnols-sur-Cèze. Partout, la même passion m&apos;a suivi : l&apos;image, le détail, ce qui donne envie.
            </p>
            <p className="mt-5 text-white/45 leading-[1.85] max-w-[48ch]">
              Aujourd&apos;hui, je mets cette exigence au service des entreprises. Artisans, commerçants, PME : je conçois des sites qui leur ressemblent et qui leur ramènent des clients.
            </p>
            <p className="mt-5 text-white/45 leading-[1.85] max-w-[48ch]">
              Mon approche tient en un mot : l&apos;obsession. Le bouton placé exactement où l&apos;œil le cherche, le texte qui répond à la question avant qu&apos;on la pose. Rien n&apos;est laissé au hasard.
            </p>
            <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.18em] uppercase text-white/35">
              <span>Auto-entrepreneur</span>
              <span>Saint-Nazaire · Bagnols-sur-Cèze · Gard</span>
              <span>Studio Thaylart</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <Zones />

    <Faq />

    </>
  )
}
