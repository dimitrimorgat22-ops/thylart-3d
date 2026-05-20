"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false })
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  animate,
  useInView,
} from "framer-motion"

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════ */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════ */
function MagneticButton({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT MODAL — formulaire de contact via Web3Forms
═══════════════════════════════════════════════════════════════ */
const WEB3FORMS_ACCESS_KEY = "700da8b5-f345-4c67-b8c7-22f285bd8a34"

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setStatus("idle")
      setErrorMsg("")
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)
    formData.append("from_name", "Site Thaylart")
    formData.append("subject", "Nouvelle demande via le site Thaylart")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
        setErrorMsg(data.message || "Une erreur est survenue. Réessayez ou contactez directement par email.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion.")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-zinc-950 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le formulaire"
              className="absolute top-5 right-5 z-10 text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="px-8 md:px-10 pt-10 pb-6 border-b border-white/[0.06]">
              <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-3">Formulaire de contact</p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Parlons de votre projet.
              </h3>
              <p className="mt-3 text-sm text-white/45 leading-relaxed">
                Décrivez votre besoin, je reviens sous 24h avec une proposition adaptée.
              </p>
            </div>

            {/* Body */}
            {status === "success" ? (
              <div className="px-8 md:px-10 py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-emerald-400">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Message envoyé.</h4>
                <p className="text-sm text-white/45 mb-8 max-w-sm mx-auto">
                  Je reviens vers vous très vite, sous 24h en général. À bientôt.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs tracking-[0.18em] uppercase text-white/45 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 md:px-10 py-8 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Nom */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                    Nom complet *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    disabled={status === "loading"}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors duration-200"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    disabled={status === "loading"}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors duration-200"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Entreprise */}
                <div>
                  <label htmlFor="contact-company" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                    Entreprise
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    disabled={status === "loading"}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors duration-200"
                    placeholder="Nom de votre marque ou société"
                  />
                </div>

                {/* Type de projet + Budget en grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-projectType" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                      Type de projet
                    </label>
                    <select
                      id="contact-projectType"
                      name="projectType"
                      disabled={status === "loading"}
                      defaultValue=""
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-zinc-950">Sélectionnez un service</option>
                      <option value="Visualisation Produit" className="bg-zinc-950">Visualisation Produit</option>
                      <option value="Product Animation" className="bg-zinc-950">Product Animation</option>
                      <option value="Cinématique" className="bg-zinc-950">Cinématique</option>
                      <option value="Autre" className="bg-zinc-950">Autre / Sur-mesure</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                      Budget indicatif
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      disabled={status === "loading"}
                      defaultValue=""
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-zinc-950">À préciser</option>
                      <option value="Moins de 1 000 €" className="bg-zinc-950">Moins de 1 000 €</option>
                      <option value="1 000 - 3 000 €" className="bg-zinc-950">1 000 - 3 000 €</option>
                      <option value="3 000 - 5 000 €" className="bg-zinc-950">3 000 - 5 000 €</option>
                      <option value="5 000 € et plus" className="bg-zinc-950">5 000 € et plus</option>
                      <option value="À discuter" className="bg-zinc-950">À discuter</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs tracking-[0.18em] uppercase text-white/45 mb-2">
                    Votre projet *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    disabled={status === "loading"}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors duration-200 resize-none"
                    placeholder="Décrivez votre besoin, votre produit, votre calendrier..."
                  />
                </div>

                {/* Honeypot anti-spam Web3Forms */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error message */}
                {status === "error" && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-white text-zinc-950 font-medium px-6 py-3.5 rounded-full text-sm hover:bg-zinc-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </div>

                <p className="text-[10px] text-white/30 text-center pt-2 leading-relaxed">
                  Vos données sont uniquement utilisées pour répondre à votre demande.
                  Elles ne sont ni stockées chez un tiers, ni partagées.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT CARD
═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useTransform(py, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(px, [-0.5, 0.5], [-10, 10])
  const glowX = useTransform(px, [-0.5, 0.5], ["0%", "100%"])
  const glowY = useTransform(py, [-0.5, 0.5], ["0%", "100%"])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { px.set(0); py.set(0) }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      {children}
      {/* Spotlight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.07) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP
═══════════════════════════════════════════════════════════════ */
function Marquee({ dark = false }: { dark?: boolean }) {
  const items = ["THAYLART", "Visualisation 3D", "Visualisation Produit", "Product Animation", "Cinématique"]
  const repeated = [...items, ...items, ...items]

  return (
    <div className={`overflow-hidden border-y py-4 ${dark ? "border-white/[0.07] bg-[#18181b]" : "border-zinc-200 bg-zinc-100"}`}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`text-xs tracking-[0.3em] uppercase shrink-0 ${dark ? "text-white/22" : "text-zinc-400"}`}
          >
            {item}
            <span className={`inline-block mx-5 ${dark ? "text-white/10" : "text-zinc-300"}`}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX IMAGE
═══════════════════════════════════════════════════════════════ */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <div ref={ref} className="overflow-hidden rounded-[1.5rem] w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover will-change-transform scale-110"
        loading="lazy"
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE STRIP — barre des 3 services sous le Hero
═══════════════════════════════════════════════════════════════ */
function ServiceStrip() {
  const [hovered, setHovered] = useState<string | null>(null)

  const services = [
    { id: "visualisation-produit", num: "01", label: "Visualisation Produit", href: "#visualisation-produit" },
    { id: "product", num: "02", label: "Product Animation", href: "#product-animation" },
    { id: "cinematique", num: "03", label: "Cinématique", href: "#cinematique" },
  ]

  return (
    <div className="relative z-10 border-t border-white/[0.09]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-3 divide-x divide-white/[0.09]">
          {services.map(({ id, num, label, href }, i) => (
            <motion.a
              key={id}
              href={href}
              className="group py-5 px-3 md:px-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65 + i * 0.09, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-[10px] text-white/22 font-mono shrink-0">{num}</span>
              <span className="text-xs md:text-sm tracking-wide text-white/50 group-hover:text-white transition-colors duration-300 truncate">
                {label}
              </span>
              <motion.span
                className="ml-auto text-white/20 shrink-0"
                animate={{ x: hovered === id ? 5 : 0, color: hovered === id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                &#8594;
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ThaylartLanding() {
  const [contactOpen, setContactOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroBgY     = useTransform(heroProg, [0, 1], ["0%", "28%"])
  const heroBgScale = useTransform(heroProg, [0, 1], [1, 1.1])
  const heroTextY   = useTransform(heroProg, [0, 1], ["0%", "40%"])
  const heroOpacity = useTransform(heroProg, [0, 0.25, 0.45, 1], [1, 0.5, 0, 0])

  return (
    <div className="overflow-x-clip" style={{ backgroundColor: "#18181b" }}>

      <ScrollProgressBar />

      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <motion.header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-zinc-950/80 backdrop-blur-md border-b border-white/[0.06]"
            : "top-2 bg-transparent"
        }`}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span className="text-sm font-medium tracking-[0.22em] text-white">THAYLART</span>
          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Visualisation Produit", href: "#visualisation-produit" },
                { label: "Product Animation", href: "#product-animation" },
                { label: "Cinématique", href: "#cinematique" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "À propos", href: "#a-propos" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-xs tracking-[0.16em] uppercase text-white/45 hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.07 }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="https://www.instagram.com/thaylartonline/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Thaylart"
              className="text-white/45 hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        {/* Vidéo de fond */}
        <motion.div
          className="absolute inset-0 will-change-transform overflow-hidden"
          style={{ y: heroBgY, scale: heroBgScale }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.9)" }}
          >
            <source src="/ROLEX.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,24,27,0.15)_0%,rgba(24,24,27,0)_25%,rgba(24,24,27,0.55)_70%,rgba(24,24,27,1)_100%)]" />

        <motion.div
          className="relative z-10 flex-1 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col justify-end pb-0"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div className="pb-14" variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.38em] uppercase text-white/40 mb-7">
              Studio de visualisation 3D
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-semibold tracking-[-0.045em] leading-none text-white"
              style={{ fontSize: "clamp(3.8rem, 11vw, 10.5rem)" }}
            >
              THAYLART
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-base md:text-xl text-white/55 max-w-[42ch] leading-relaxed">
              Visualisation produit, animations et cinématique —{" "}
              <span className="text-white/80">des visuels 3D qui marquent.</span>
            </motion.p>
            <motion.p variants={fadeUp} className="mt-7 text-[10px] tracking-[0.34em] uppercase text-white/35">
              Artisans · Marques premium · E-commerce exigeant
            </motion.p>
          </motion.div>
        </motion.div>

        <ServiceStrip />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <Marquee dark />

      {/* ── IMMOBILIER — fond clair ───────────────────────────── */}
      <section id="visualisation-produit" className="relative min-h-[100dvh] flex items-center py-24 bg-zinc-100" style={{ overflow: "visible" }}>

        {/* Modèle 3D flottant — hors flux */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute",
            left: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "52%",
            height: "130%",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <ModelViewer src="/Parfumnouveaux.glb" className="w-full h-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="flex justify-end">

            {/* Text — décalé à droite */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-full md:w-1/2"
            >
              <p className="text-[10px] tracking-[0.34em] uppercase text-zinc-400 mb-6">Service 01</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-900">
                Matière, lumière,<br />mouvement —<br />présence totale.
              </h2>
              <p className="mt-7 text-zinc-500 leading-[1.85] max-w-[44ch]">
                Mise en scène de produits avec textures, reflets et détails sur-mesure.
                Des visuels 3D qui donnent à chaque objet une présence premium — impactante et mémorable.
                Pensé pour les maisons de bijoux, parfum et marques e-commerce exigeantes.
              </p>

              {/* Aperçu vidéo compact */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.32 }}
              >
                <TiltCard className="aspect-video rounded-xl group cursor-pointer overflow-hidden">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/parfum.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Visualisation produit</span>
                  </div>
                </TiltCard>
              </motion.div>

              <div className="mt-10">
                <MagneticButton
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
                >
                  Demander un devis
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <Marquee />

      {/* ── PRODUCT ANIMATION — fond sombre ──────────────────── */}
      <section id="product-animation" className="relative min-h-[100dvh] flex items-center py-24" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Text */}
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-6">Service 02</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                Précision, éclat,<br />détail —<br />l&apos;excellence en mouvement.
              </h2>
              <p className="mt-7 text-white/45 leading-[1.85] max-w-[44ch]">
                Animations de produits haute fidélité — bijoux, parfums, montres et accessoires de luxe.
                Chaque séquence révèle la valeur intrinsèque de votre produit.
              </p>

              {/* Stats row */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-10">
                {[
                  { value: 24, suffix: "h", label: "délai de réponse" },
                  { value: 100, suffix: "%", label: "sur-mesure" },
                ].map(({ value, suffix, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-semibold tracking-tight text-white">
                      <AnimatedCounter to={value} suffix={suffix} />
                    </p>
                    <p className="text-xs text-white/35 mt-1 tracking-wide">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <MagneticButton
                  href="#portfolio"
                  className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/45 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
                >
                  Voir les réalisations
                </MagneticButton>
              </div>
            </motion.div>

            {/* Vidéo ROLEX + image */}
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="grid grid-cols-2 gap-4">
                <TiltCard className="aspect-[3/4] rounded-[1.5rem] group col-span-2">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-[1.5rem]"
                  >
                    <source src="/ROLEX.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                    <span className="text-[10px] tracking-[0.22em] uppercase text-white/50">Rendu 3D</span>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-white/50">Rolex</span>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <Marquee dark />

      {/* ── CINÉMATIQUE — fond clair ──────────────────────────── */}
      <section id="cinematique" className="relative min-h-[100dvh] flex items-center py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-12 md:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <p className="text-[10px] tracking-[0.34em] uppercase text-zinc-400 mb-8">Service 03</p>
              <h2
                className="font-semibold tracking-tight leading-none text-zinc-900"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
              >
                Séquences<br />immersives à<br />forte portée<br />émotionnelle.
              </h2>
              <p className="mt-9 text-zinc-500 leading-[1.9] max-w-[40ch] text-lg">
                Approche narrative — ambiance, univers, tension. Chaque image donne
                une sensation de film. Idéale pour lancements de produit et campagnes de marque premium.
              </p>
              <div className="mt-10">
                <MagneticButton
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
                >
                  Démarrer un projet
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <TiltCard className="aspect-[3/4] rounded-[1.5rem] group overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/voiture.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.25)_0%,transparent_50%)]" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Cinématique 3D</span>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO / RÉALISATIONS ──────────────────────────── */}
      <section id="portfolio" className="relative py-32 md:py-40" style={{ backgroundColor: "#0f0f11" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header de section */}
          <motion.div
            className="mb-24 md:mb-32"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Portfolio</p>
            <h2 className="font-semibold tracking-tight leading-[1.05] text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
              Réalisations.<br />Chaque image,<br />un univers.
            </h2>
            <p className="mt-8 text-white/45 leading-[1.85] max-w-[52ch]">
              Une sélection de visualisations produit, animations et modèles 3D interactifs.
              Chaque pièce explore une matière, une lumière, une narration propre.
            </p>
          </motion.div>

          {/* Pièces */}
          <div className="space-y-32 md:space-y-48">

            {/* ── 01 — Parfum vidéo ────────────────────────────── */}
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <TiltCard className="aspect-[4/5] rounded-[1.5rem] group overflow-hidden">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/parfum.mp4" type="video/mp4" />
                  </video>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">Pièce 01 — Visualisation produit</p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] text-white">
                  Capsule olfactive.
                </h3>
                <p className="mt-6 text-white/50 leading-[1.85] max-w-[42ch]">
                  Mise en scène cinématographique d&apos;un flacon de parfum. Lumière, reflets, texture du verre — chaque détail orchestré pour suggérer la matière sans la toucher.
                </p>
              </motion.div>
            </div>

            {/* ── 02 — Rolex animation ──────────────────────────── */}
            <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center">
              <motion.div
                className="order-2 md:order-1"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">Pièce 02 — Product Animation</p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] text-white">
                  Rolex Submariner.
                </h3>
                <p className="mt-6 text-white/50 leading-[1.85] max-w-[42ch]">
                  Animation horlogère haute fidélité. Caméra orbitale et lumière calibrée pour révéler la précision mécanique et l&apos;éclat du métal.
                </p>
              </motion.div>
              <motion.div
                className="order-1 md:order-2"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <TiltCard className="aspect-[4/5] rounded-[1.5rem] group overflow-hidden">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/ROLEX.mp4" type="video/mp4" />
                  </video>
                </TiltCard>
              </motion.div>
            </div>

            {/* ── 03 — Cinématique voiture ──────────────────────── */}
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <TiltCard className="aspect-video rounded-[1.5rem] group overflow-hidden">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/voiture.mp4" type="video/mp4" />
                  </video>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-5">Pièce 03 — Cinématique</p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] text-white">
                  Cinématique<br />automobile.
                </h3>
                <p className="mt-6 text-white/50 leading-[1.85] max-w-[42ch]">
                  Séquence narrative pensée comme un plan de film. Lumière, mouvement, atmosphère — une voiture devient un personnage.
                </p>
              </motion.div>
            </div>

          </div>

          {/* CTA bas de portfolio */}
          <motion.div
            className="mt-32 md:mt-40 flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-zinc-950 text-sm font-medium px-7 py-4 rounded-full hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
            >
              Discuter d&apos;un projet
            </MagneticButton>
          </motion.div>

        </div>
      </section>

      {/* ── À PROPOS ──────────────────────────────────────────── */}
      <section id="a-propos" className="relative py-36" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[0.85fr_1fr] gap-12 md:gap-20 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <TiltCard className="aspect-[4/5] rounded-[1.5rem] group overflow-hidden">
                <img
                  src="/Portrait.jpg"
                  alt="Dimitri Morgat — fondateur de Thaylart"
                  className="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_45%)] pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/55">Dimitri Morgat</span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white/55">Fondateur</span>
                </div>
              </TiltCard>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">À propos</p>
              <h2
                className="font-semibold tracking-tight leading-[1.05] text-white"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                L&apos;artisan derrière<br />les pixels.
              </h2>
              <p className="mt-8 text-white/55 leading-[1.85] max-w-[48ch]">
                Passé par l&apos;ESCE et voyageur passionné, j&apos;ai fondé Thaylart pour porter une approche 3D différente — sensible aux détails, attentive à l&apos;identité de chaque marque, et entièrement sur-mesure.
              </p>
              <p className="mt-5 text-white/45 leading-[1.85] max-w-[48ch]">
                Chaque collaboration est calibrée à votre univers et à vos objectifs. Pas de modèles préfabriqués, pas de compromis sur la qualité — uniquement des visuels conçus pour vous.
              </p>

              <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.18em] uppercase text-white/35">
                <span>Auto-entrepreneur</span>
                <span>Saint-Nazaire · Gard</span>
                <span>Studio Thaylart</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="relative py-36" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            className="grid md:grid-cols-[1fr_auto] gap-12 items-end"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div>
              <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Travailler ensemble</p>
              <h2
                className="font-semibold tracking-tight leading-none text-white"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Un projet<br />en tête ?
              </h2>
              <p className="mt-8 text-white/40 leading-[1.85] max-w-[38ch]">
                Décrivez votre besoin — je reviens sous 24h avec une proposition
                adaptée à votre budget et calendrier.
              </p>
            </div>
            <MagneticButton
              onClick={(e) => { e.preventDefault(); setContactOpen(true); }}
              className="inline-flex items-center gap-3 bg-white text-zinc-950 font-medium px-7 py-4 rounded-full text-sm hover:bg-zinc-100 transition-colors duration-200 whitespace-nowrap cursor-pointer"
            >
              Envoyer un message
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8" style={{ backgroundColor: "#18181b" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <span className="text-xs text-white/25 tracking-[0.2em]">THAYLART</span>
          <div className="flex items-center gap-6">
            <a
              href="/mentions-legales"
              className="text-xs text-white/25 hover:text-white/70 transition-colors duration-300 tracking-wide"
            >
              Mentions légales
            </a>
            <a
              href="https://www.instagram.com/thaylartonline/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Thaylart"
              className="text-white/25 hover:text-white/70 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <span className="text-xs text-white/20">&#169; 2026</span>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

    </div>
  )
}
