import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mentions légales — THAYLART",
  description: "Mentions légales du site thaylart.com, studio de visualisation 3D fondé par Dimitri Morgat.",
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#18181b" }}>
      {/* Header sobre */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-[0.22em] text-white hover:text-white/70 transition-colors duration-300"
          >
            THAYLART
          </Link>
          <Link
            href="/"
            className="text-xs tracking-[0.16em] uppercase text-white/45 hover:text-white transition-colors duration-300"
          >
            ← Retour
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="text-[10px] tracking-[0.34em] uppercase text-white/28 mb-7">Informations légales</p>
        <h1
          className="font-semibold tracking-tight leading-[1.05] text-white mb-12"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
        >
          Mentions légales.
        </h1>

        <div className="space-y-14 text-white/65 leading-[1.85]">

          {/* Éditeur */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Éditeur du site
            </h2>
            <div className="space-y-1.5">
              <p>
                <span className="text-white">THAYLART</span> — entreprise individuelle (micro-entreprise)
              </p>
              <p>Représentée par Dimitri Morgat, fondateur et directeur de la publication</p>
              <p>Adresse : 6 rue de l&apos;Ancien Couvent, 30200 Saint-Nazaire, France</p>
              <p>SIRET : 104 131 602 00013</p>
              <p>SIREN : 104 131 602</p>
              <p>Téléphone : 06 62 23 36 99</p>
              <p>
                Email : <a href="mailto:dimitrimorgat@thaylart.com" className="text-white underline underline-offset-4 hover:no-underline">dimitrimorgat@thaylart.com</a>
              </p>
              <p>TVA : non applicable, article 293 B du Code général des impôts (franchise en base de TVA).</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Hébergement
            </h2>
            <div className="space-y-1.5">
              <p>Le site <span className="text-white">thaylart.com</span> est hébergé par :</p>
              <p>Vercel Inc.</p>
              <p>440 N Barranca Ave #4133</p>
              <p>Covina, CA 91723, États-Unis</p>
              <p>
                Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:no-underline">vercel.com</a>
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des éléments présents sur ce site (textes, visuels 3D, animations,
              modèles, photographies, identité graphique, code source) est la propriété exclusive
              de Dimitri Morgat — Thaylart, sauf mention contraire.
            </p>
            <p className="mt-4">
              Toute reproduction, représentation, modification, publication ou adaptation, totale
              ou partielle, de ces éléments, par quelque procédé que ce soit, est interdite sans
              autorisation écrite préalable. Toute exploitation non autorisée engage la
              responsabilité de l&apos;utilisateur et constitue une contrefaçon sanctionnée par les
              articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Données personnelles
            </h2>
            <p>
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi
              Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et d&apos;opposition concernant les données
              personnelles vous concernant.
            </p>
            <p className="mt-4">
              Les seules données collectées par le biais de ce site le sont via les emails que
              vous nous adressez volontairement à des fins de contact commercial. Elles ne sont
              ni vendues, ni partagées avec des tiers, et ne sont conservées que le temps
              strictement nécessaire au traitement de votre demande.
            </p>
            <p className="mt-4">
              Pour toute demande relative à vos données, contactez :{" "}
              <a href="mailto:dimitrimorgat@thaylart.com" className="text-white underline underline-offset-4 hover:no-underline">
                dimitrimorgat@thaylart.com
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Cookies
            </h2>
            <p>
              Ce site n&apos;utilise pas de cookies de suivi ni d&apos;outils de mesure
              d&apos;audience tiers. Aucun consentement n&apos;est requis pour la consultation.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              et après échec de toute tentative de résolution amiable, les tribunaux français
              seront seuls compétents.
            </p>
          </section>

        </div>

        {/* Footer info */}
        <div className="mt-20 pt-10 border-t border-white/[0.06] text-xs text-white/35 tracking-wide">
          Dernière mise à jour : mai 2026
        </div>
      </main>
    </div>
  )
}
