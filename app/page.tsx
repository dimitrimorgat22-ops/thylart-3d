"use client"

import { useEffect, useState } from "react"

export default function PremiumStudioLanding() {
  const [offset, setOffset] = useState(0)
  const [zoom, setZoom] = useState(1.08)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.25)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    let frame: number
    const animateZoom = () => {
      setZoom((prev) => (prev < 1.15 ? prev + 0.0003 : prev))
      frame = requestAnimationFrame(animateZoom)
    }

    animateZoom()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="h-screen overflow-y-auto snap-y snap-proximity text-white overflow-x-hidden relative bg-black scroll-smooth">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="text-2xl font-medium tracking-tight text-white">THYLART</div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="relative snap-start snap-always">
        <section className="w-full h-screen relative px-6 md:px-10 pt-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale will-change-transform"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop')",
              transform: `translateY(${offset}px) scale(${zoom})`,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.30)_45%,rgba(0,0,0,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.30)_55%,rgba(0,0,0,0.78)_100%)]" />

          <div className="relative z-10 w-full h-full flex flex-col">
            <div className="flex-1 w-full flex items-center justify-center -translate-y-6 md:-translate-y-10">
              <div className="w-full">
                <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto items-center justify-center">
                  <a
                    href="#immobilier"
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl min-h-[340px] md:min-h-[480px] p-8 md:p-10 flex flex-col justify-end transition-all duration-700 hover:scale-[1.04] hover:rotate-[-1deg]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_35%,rgba(0,0,0,0.78)_100%)]" />
                    <div className="relative z-10 transform transition-all duration-700 group-hover:translate-y-[-6px]">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/45 mb-3">Service 01</p>
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Immobilier</h2>
                      <p className="mt-3 text-sm md:text-base text-white/60 max-w-xs leading-7">
                        Visualisations pour valoriser un bien et accélérer la projection.
                      </p>
                    </div>
                  </a>

                  <a
                    href="#product-animation"
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl min-h-[340px] md:min-h-[480px] p-8 md:p-10 flex flex-col justify-end transition-all duration-700 hover:scale-[1.04] hover:rotate-[-1deg]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_35%,rgba(0,0,0,0.78)_100%)]" />
                    <div className="relative z-10 transform transition-all duration-700 group-hover:translate-y-[-6px]">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/45 mb-3">Service 02</p>
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Product Animation</h2>
                      <p className="mt-3 text-sm md:text-base text-white/60 max-w-xs leading-7">
                        Mise en scène d’objets, matière, mouvement et présence visuelle.
                      </p>
                    </div>
                  </a>

                  <a
                    href="#cinematique"
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl min-h-[340px] md:min-h-[480px] p-8 md:p-10 flex flex-col justify-end transition-all duration-700 hover:scale-[1.04] hover:rotate-[-1deg]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_35%,rgba(0,0,0,0.78)_100%)]" />
                    <div className="relative z-10 transform transition-all duration-700 group-hover:translate-y-[-6px]">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/45 mb-3">Service 03</p>
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Cinématique</h2>
                      <p className="mt-3 text-sm md:text-base text-white/60 max-w-xs leading-7">
                        Séquences immersives, émotion, tension et langage filmique.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 px-6 md:px-10 flex items-end justify-between z-20">
              <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                THYLART
              </div>

              <div className="hidden md:block max-w-[240px] text-sm leading-6 text-white/60 text-right">
                3D visual identity
                <br />
                for contemporary spaces
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* IMMOBILIER */}
      <section id="immobilier" className="relative min-h-screen snap-start snap-always flex items-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1505691723518-36a5ac3b2b95?q=80&w=2000&auto=format&fit=crop')"}} />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-14 md:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-5">Immobilier</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl">
                Des visuels pensés pour valoriser un bien et accélérer la projection.
              </h2>
              <p className="mt-7 max-w-xl text-white/60 leading-8">
                Rendus intérieurs, extérieurs et avant / après pour aider agences, investisseurs
                et particuliers à révéler immédiatement le potentiel d’un espace.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden relative shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')"}} />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product-animation" className="relative min-h-screen snap-start snap-always flex items-center border-t border-white/10 overflow-hidden">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.coverr.co/videos/coverr-spinning-watch-8636/1080p.mp4" type="video/mp4" />
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-14 md:gap-20 items-center">
            <div className="relative md:order-1 order-2">
              <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden relative shadow-[0_20px_80px_rgba(0,0,0,0.38)]">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop')"}} />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>

            <div className="md:order-2 order-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-5">Product Animation</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl">
                Des animations produit conçues pour révéler matière, détail et présence.
              </h2>
              <p className="mt-7 max-w-xl text-white/60 leading-8">
                Mise en scène, mouvement, lumière et rythme visuel pour transformer un objet
                en expérience premium, impactante et mémorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIQUE */}
      <section id="cinematique" className="relative min-h-screen snap-start snap-always flex items-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=2000&auto=format&fit=crop')"}} />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-14 md:gap-20 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-5">Cinématique</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl">
                Des séquences visuelles immersives à forte portée émotionnelle.
              </h2>
              <p className="mt-7 max-w-xl text-white/60 leading-8">
                Une approche plus narrative, pensée pour créer une ambiance, installer un univers
                et donner à chaque image une sensation de film.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden relative shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop')"}} />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
