"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, MotionConfig } from "framer-motion"

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export function MagneticButton({
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
                      <option value="Diagnostic de présence en ligne" className="bg-zinc-950">Diagnostic de présence en ligne</option>
                      <option value="Site vitrine" className="bg-zinc-950">Site vitrine sur mesure</option>
                      <option value="Refonte" className="bg-zinc-950">Refonte complète</option>
                      <option value="Boutique en ligne" className="bg-zinc-950">Boutique en ligne</option>
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
                      <option value="1 000 € – 2 000 €" className="bg-zinc-950">1 000 € – 2 000 €</option>
                      <option value="2 000 € – 4 000 €" className="bg-zinc-950">2 000 € – 4 000 €</option>
                      <option value="4 000 € et plus" className="bg-zinc-950">4 000 € et plus</option>
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
                    placeholder="Votre activité, votre site actuel s'il existe, ce que vous attendez du nouveau..."
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

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function MaskedWords({ text, delay = 0, className = "", wordClass = "", sheenOffset = 0 }: { text: string; delay?: number; className?: string; wordClass?: string; sheenOffset?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClass}`}
            // le reflet traverse les mots l'un après l'autre, comme une seule lumière qui balaie la ligne
            style={{ animationDelay: `${(sheenOffset + i) * 0.14}s` }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function BrowserFrame({ url, children, className = "", light = false }: { url: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl md:rounded-2xl border shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${light ? "bg-white border-zinc-200" : "bg-zinc-950 border-white/[0.09]"} ${className}`}>
      <div className={`flex items-center gap-3 px-3 md:px-4 h-8 md:h-10 border-b ${light ? "border-zinc-200 bg-zinc-50" : "border-white/[0.07] bg-zinc-900"}`}>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/15" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/15" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/15" />
        </div>
        <div className={`flex-1 max-w-xs mx-auto rounded-md px-3 py-0.5 md:py-1 text-[9px] md:text-[11px] text-center truncate ${light ? "bg-zinc-200/70 text-zinc-500" : "bg-white/[0.06] text-white/40"}`}>
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

export function ContactCTA({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const bg = useTransform(p, [0.3, 0.9], ["#18181b", "#f4f4f5"])
  const color = useTransform(p, [0.3, 0.9], ["#fafafa", "#18181b"])
  const scale = useTransform(p, [0, 1], [0.72, 1])
  const sub = useTransform(p, [0.3, 0.9], ["rgba(250,250,250,0.4)", "rgba(24,24,27,0.5)"])

  return (
    <motion.section id="contact" ref={ref} className="relative py-40 md:py-56 overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <motion.p className="text-[10px] tracking-[0.34em] uppercase mb-8" style={{ color: sub }}>Travailler ensemble</motion.p>
        <motion.h2 className="font-semibold tracking-[-0.04em] leading-[0.95]" style={{ fontSize: "clamp(3rem, 10vw, 9rem)", color, scale }}>
          Parlons de<br />votre site.
        </motion.h2>
        <motion.p className="mt-10 mx-auto leading-[1.85] max-w-[42ch]" style={{ color: sub }}>
          Premier échange gratuit et sans engagement. Je reviens vers vous sous 24h avec une proposition adaptée à votre budget.
        </motion.p>
        <div className="mt-12 flex justify-center">
          <MagneticButton
            onClick={(e) => { e.preventDefault(); onContact() }}
            className="inline-flex items-center gap-3 bg-zinc-950 text-white font-medium px-8 py-4 rounded-full text-sm hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
          >
            Envoyer un message <span>&#8594;</span>
          </MagneticButton>
        </div>
      </div>
    </motion.section>
  )
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0)
  return (
    <motion.div
      className="border-b border-white/[0.08]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
    >
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer group"
        >
          <span className="text-lg md:text-2xl font-medium tracking-tight text-white/85 group-hover:text-white transition-colors duration-200">{q}</span>
          <motion.span
            className="shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            +
          </motion.span>
        </button>
      </h3>
      {/* La réponse reste dans le HTML même fermée : Google la lit */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-white/50 leading-[1.85] max-w-[70ch]">{a}</p>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   COQUILLE COMMUNE — barre de progression, grain, menu, contact, pied de page
═══════════════════════════════════════════════════════════════ */
export const SERVICE_LINKS = [
  { label: "Création de site vitrine", href: "/creation-site-vitrine" },
  { label: "Refonte de site internet", href: "/refonte-site-internet" },
  { label: "Création de boutique en ligne", href: "/creation-boutique-en-ligne" },
  { label: "Diagnostic de site internet", href: "/diagnostic-site-internet" },
]

const ContactContext = createContext<() => void>(() => {})
export const useContact = () => useContext(ContactContext)

function SiteHeader({ home }: { home: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  // depuis une page de service, les ancres renvoient vers la page d'accueil
  const base = home ? "" : "/"

  return (
    <motion.header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "top-0 bg-zinc-950/80 backdrop-blur-md border-b border-white/[0.06]" : "top-2 bg-transparent"
      }`}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-[0.22em] text-white">THAYLART</Link>
        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Méthode", href: `${base}#methode` },
              { label: "Offres", href: `${base}#offres` },
              { label: "Réalisations", href: `${base}#realisations` },
              { label: "À propos", href: `${base}#a-propos` },
              { label: "FAQ", href: `${base}#faq` },
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
            <InstagramIcon className="w-[18px] h-[18px]" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] pt-14 pb-8" style={{ backgroundColor: "#18181b" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10 pb-12 mb-8 border-b border-white/[0.06] text-sm">
        <div>
          <p className="text-xs text-white/60 tracking-[0.2em] mb-4">THAYLART</p>
          <p className="text-white/35 leading-relaxed max-w-[32ch]">Création de sites internet sur mesure pour les entreprises du Gard et d&apos;ailleurs.</p>
        </div>
        <address className="not-italic text-white/35 leading-relaxed">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-4">Contact</p>
          6 rue de l&apos;Ancien Couvent<br />
          30200 Saint-Nazaire, près de Bagnols-sur-Cèze<br />
          <a href="tel:+33665854200" className="hover:text-white transition-colors duration-200">06 65 85 42 00</a><br />
          <a href="mailto:dimitrimorgat@thaylart.com" className="hover:text-white transition-colors duration-200">dimitrimorgat@thaylart.com</a>
        </address>
        <nav aria-label="Services" className="text-white/35">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-4">Services</p>
          <ul className="space-y-1.5">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}><Link href={s.href} className="hover:text-white transition-colors duration-200">{s.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-y-3">
        <span className="text-xs text-white/25 tracking-[0.2em]">THAYLART</span>
        <div className="flex items-center gap-6">
          <Link href="/mentions-legales" className="text-xs text-white/25 hover:text-white/70 transition-colors duration-300 tracking-wide">
            Mentions légales
          </Link>
          <a
            href="https://www.instagram.com/thaylartonline/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Thaylart"
            className="text-white/25 hover:text-white/70 transition-colors duration-300"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <span className="text-xs text-white/20">&#169; 2026</span>
        </div>
      </div>
    </footer>
  )
}

export function SiteShell({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  return (
    <MotionConfig reducedMotion="user">
      <ContactContext.Provider value={openContact}>
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
          <SiteHeader home={home} />
          <main>{children}</main>
          <ContactCTA onContact={openContact} />
          <SiteFooter />
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
      </ContactContext.Provider>
    </MotionConfig>
  )
}
