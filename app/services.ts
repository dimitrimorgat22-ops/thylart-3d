// Contenu des pages de services. Chaque page cible ses propres recherches Google.
// Tout ce qui est écrit ici est un engagement commercial : à garder fidèle aux devis.

import { SITE_URL, ZONES, REGIONS } from "./content"

export type Service = {
  slug: string
  label: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: [string, string]
  price: string
  priceNote: string
  priceValue?: number
  delay: string
  scope: string
  forWho: { title: string; text: string }[]
  included: string[]
  steps: { title: string; text: string }[]
  project?: { src: string; url: string; title: string; tag: string; text: string }
  faq: { q: string; a: string }[]
}

const MAISONS_BLEUES = {
  src: "/realisations/maisons-bleues.jpg",
  url: "maisonsbleues.fr",
  title: "Les Maisons Bleues",
  tag: "Constructeur · Gard rhodanien",
  text: "Constructeur de maisons individuelles depuis 2004. Un site pensé pour inspirer confiance, présenter les modèles et générer des demandes de devis qualifiées.",
}

export const SERVICES: Record<string, Service> = {
  "creation-site-vitrine": {
    slug: "creation-site-vitrine",
    label: "Création de site vitrine",
    metaTitle: "Création site vitrine Bagnols-sur-Cèze & Gard | Thaylart",
    metaDescription:
      "Site vitrine sur mesure pour artisans, commerçants et PME du Gard : jusqu'à 5 pages, design unique, référencement local. Dès 1 100 € ou 4 × 275 €.",
    eyebrow: "Service · Site vitrine",
    h1: "Création de site vitrine sur mesure dans le Gard",
    intro: [
      "Votre site vitrine est souvent le premier contact entre votre entreprise et un futur client. Je le conçois sur mesure, à votre image, pour qu'il inspire confiance en quelques secondes et donne envie de vous contacter.",
      "Basé à Saint-Nazaire, près de Bagnols-sur-Cèze, j'accompagne les artisans, commerçants, indépendants et PME du Gard rhodanien, du Vaucluse et de l'Ardèche, de la première idée jusqu'à la mise en ligne.",
    ],
    price: "1 100 €",
    priceNote: "ou 4 × 275 € sans frais",
    priceValue: 1100,
    delay: "2 à 3 semaines après réception de vos contenus",
    scope: "Jusqu'à 5 pages · 2 allers-retours de modifications",
    forWho: [
      { title: "Vous n'avez pas encore de site", text: "Vos clients vous cherchent sur Google et tombent sur vos concurrents. Un site vitrine vous rend visible et crédible." },
      { title: "Vous vivez du bouche-à-oreille", text: "Quand on vous recommande, le premier réflexe du prospect est de taper votre nom. Votre site doit confirmer la bonne impression." },
      { title: "Vous voulez des demandes, pas une simple vitrine", text: "Chaque page est pensée pour guider le visiteur vers un appel, un formulaire ou une visite." },
    ],
    included: [
      "Design 100 % sur mesure, sans template",
      "Jusqu'à 5 pages : accueil, services, réalisations, à propos, contact…",
      "Version mobile et tablette soignée",
      "Référencement local de base : titres, descriptions, données structurées, vitesse",
      "Formulaire de contact relié à votre boîte mail",
      "Mentions légales et politique de confidentialité",
      "2 allers-retours de modifications avant validation",
      "Mise en ligne de votre site, prêt à l'emploi",
    ],
    steps: [
      { title: "Échange découverte", text: "Gratuit et sans engagement. On parle de votre activité, de vos clients, de vos concurrents et de ce que le site doit vous apporter." },
      { title: "Devis clair", text: "Pages, contenu du forfait, prix et délai : tout est écrit noir sur blanc avant de commencer." },
      { title: "Conception", text: "Je conçois le design et le site. Vous disposez de 2 allers-retours de modifications pour l'ajuster." },
      { title: "Mise en ligne", text: "Tests sur mobile, vitesse et référencement, puis mise en ligne. Un forfait de maintenance mensuel est disponible si vous souhaitez être accompagné ensuite." },
    ],
    project: MAISONS_BLEUES,
    faq: [
      { q: "Que faut-il préparer avant de commencer ?", a: "Idéalement vos textes de présentation, vos photos et votre logo. Si vous n'avez pas tout, on en parle lors de l'échange découverte pour organiser vos contenus. Le délai de 2 à 3 semaines démarre à leur réception." },
      { q: "Et si j'ai besoin de plus de 5 pages ?", a: "Le forfait couvre jusqu'à 5 pages, ce qui suffit à la plupart des entreprises locales. Au-delà, les pages supplémentaires sont chiffrées dans le devis, avant le début du projet." },
      { q: "Que se passe-t-il après la mise en ligne ?", a: "Je propose un forfait de maintenance mensuel pour les mises à jour, les petites modifications et le suivi technique. Il est facultatif, et son tarif vous est communiqué sur demande." },
      { q: "Mon site sera-t-il premier sur Google ?", a: "Personne ne peut honnêtement le garantir. Votre site est construit selon les bonnes pratiques du référencement local : rapide, lisible par Google, adapté au mobile. Le classement dépend aussi de la concurrence, de vos avis et de votre fiche Google Business." },
    ],
  },

  "refonte-site-internet": {
    slug: "refonte-site-internet",
    label: "Refonte de site internet",
    metaTitle: "Refonte de site internet Bagnols-sur-Cèze & Gard | Thaylart",
    metaDescription:
      "Votre site ne vous apporte pas de clients ? Refonte complète de A à Z : nouveau design, contenus revus, référencement corrigé. Dès 1 500 €, dans le Gard.",
    eyebrow: "Service · Refonte",
    h1: "Refonte de site internet pour les entreprises du Gard",
    intro: [
      "Un site vieillissant, lent ou mal référencé fait fuir vos visiteurs avant même qu'ils découvrent votre offre. La refonte reprend tout de A à Z : on garde ce qui fonctionne, on reconstruit le reste.",
      "Chaque refonte commence par un état des lieux précis de votre site actuel : ce qui bloque vos visiteurs, ce que Google ne voit pas, ce que font vos concurrents. Le nouveau site corrige ces points dès sa conception.",
    ],
    price: "1 500 €",
    priceNote: "prix de départ, selon la taille du site",
    priceValue: 1500,
    delay: "fixé dans le devis selon le nombre de pages",
    scope: "Conception, développement et mise en ligne",
    forWho: [
      { title: "Votre site a pris de l'âge", text: "Design daté, mal adapté au mobile, lent à charger : vos visiteurs repartent en quelques secondes." },
      { title: "Vous êtes invisible sur Google", text: "Titres absents, textes illisibles par les moteurs de recherche, adresse mal déclarée : le référencement se corrige à la racine." },
      { title: "Votre site ne génère aucune demande", text: "Pas de bouton d'appel, formulaire introuvable, aucun avis visible : on remet le parcours de vos clients au centre." },
    ],
    included: [
      "État des lieux complet de votre site actuel",
      "Nouveau design sur mesure",
      "Contenus revus et lisibles par Google : services, avis, descriptions",
      "Bouton d'appel et formulaire de contact fonctionnels",
      "Référencement corrigé : titres, résumés, adresse Google",
      "Version mobile soignée et chargement rapide",
      "Mentions légales et politique de confidentialité",
      "Redirection des anciennes pages pour préserver votre référencement",
    ],
    steps: [
      { title: "État des lieux", text: "J'analyse votre site actuel, son référencement et ce qui fait partir vos visiteurs." },
      { title: "Devis et plan de refonte", text: "Ce qui est conservé, ce qui est reconstruit, le prix et le délai : tout est fixé avant de commencer." },
      { title: "Conception du nouveau site", text: "Nouveau design, contenus revus, corrections du référencement intégrées dès la construction." },
      { title: "Bascule et mise en ligne", text: "Le nouveau site remplace l'ancien. Les anciennes adresses sont redirigées vers les nouvelles pages pour ne rien perdre." },
    ],
    project: MAISONS_BLEUES,
    faq: [
      { q: "Faut-il repartir de zéro ?", a: "La refonte reconstruit le site, mais on conserve ce qui a de la valeur : votre nom de domaine, vos contenus qui fonctionnent, vos photos, et le référencement déjà acquis grâce aux redirections." },
      { q: "Vais-je perdre mon référencement ?", a: "C'est le principal risque d'une refonte, et il se prévient : chaque ancienne adresse est redirigée vers sa nouvelle page, et les réglages de référencement sont repris puis corrigés." },
      { q: "Combien coûte une refonte ?", a: "À partir de 1 500 € pour une refonte complète. Le prix final dépend du nombre de pages et des fonctionnalités, et il est fixé dans un devis détaillé avant de commencer." },
      { q: "Faut-il faire un diagnostic avant ?", a: "Ce n'est pas obligatoire : l'état des lieux de votre site fait partie de la refonte. Le diagnostic seul est utile si vous voulez d'abord comprendre ce qui bloque avant de décider." },
    ],
  },

  "creation-boutique-en-ligne": {
    slug: "creation-boutique-en-ligne",
    label: "Création de boutique en ligne",
    metaTitle: "Création de boutique en ligne sur mesure, Gard | Thaylart",
    metaDescription:
      "Boutique e-commerce codée sur mesure : catalogue, fiches produits, panier, paiement sécurisé, CGV. Pour commerçants et marques du Gard et d'ailleurs. Devis gratuit.",
    eyebrow: "Service · E-commerce",
    h1: "Création de boutique en ligne sur mesure",
    intro: [
      "Vendre en ligne, ce n'est pas seulement afficher des produits. C'est rassurer, guider et rendre l'achat évident, du premier clic jusqu'au paiement.",
      "Je code des boutiques sur mesure, avec une identité propre à votre marque et sans les limites d'un thème standard. Si votre projet le demande, la boutique peut s'appuyer sur Shopify pour la gestion des commandes et des paiements.",
    ],
    price: "Sur devis",
    priceNote: "selon la taille du catalogue et les fonctionnalités",
    delay: "fixé dans le devis",
    scope: "Du catalogue jusqu'au paiement",
    forWho: [
      { title: "Vous lancez votre marque", text: "Une boutique qui a une vraie personnalité inspire confiance dès la première visite, même sans notoriété." },
      { title: "Vous vendez déjà en magasin", text: "Prolongez votre commerce en ligne et touchez des clients bien au-delà de votre zone." },
      { title: "Votre boutique actuelle ne vend pas", text: "Parcours d'achat confus, fiches produits pauvres, manque de réassurance : on reconstruit pour vendre." },
    ],
    included: [
      "Design de marque sur mesure",
      "Catalogue et fiches produits détaillées",
      "Panier et parcours de commande fluides",
      "Paiement sécurisé",
      "Réassurance : livraison, retours, avis clients",
      "Conditions générales de vente, mentions légales, confidentialité",
      "Version mobile soignée, là où se font une grande partie des achats",
      "Connexion à Shopify si votre projet le nécessite",
    ],
    steps: [
      { title: "Échange découverte", text: "Vos produits, vos clients, votre logistique et vos objectifs de vente." },
      { title: "Devis détaillé", text: "Fonctionnalités, nombre de produits, prix et délai : tout est fixé avant de commencer." },
      { title: "Conception de la boutique", text: "Identité visuelle, fiches produits, parcours d'achat et pages légales." },
      { title: "Tests et mise en ligne", text: "Commandes de test, vérification du paiement et de l'affichage mobile, puis ouverture de la boutique." },
    ],
    project: {
      src: "/realisations/yuna.jpg",
      url: "thaylart.com/yuna",
      title: "Yuna Kids",
      tag: "E-commerce · Puériculture",
      text: "Boutique en ligne de coussins de protection pour bébés : une identité douce et joyeuse, un parcours d'achat fluide du catalogue jusqu'au paiement, et des pages légales complètes.",
    },
    faq: [
      { q: "Pourquoi une boutique sur mesure plutôt qu'un thème ?", a: "Un thème standard ressemble à des milliers d'autres boutiques. Une boutique sur mesure porte votre identité, se charge vite et s'adapte exactement à votre façon de vendre. Shopify peut tout de même servir en arrière-plan pour les commandes et les paiements." },
      { q: "Combien coûte une boutique en ligne ?", a: "Le prix dépend du nombre de produits, des options de livraison et des fonctionnalités souhaitées. Après un échange gratuit, vous recevez un devis détaillé et ferme." },
      { q: "Les pages légales sont-elles incluses ?", a: "Oui : conditions générales de vente, mentions légales et politique de confidentialité font partie de la boutique." },
    ],
  },

  "diagnostic-site-internet": {
    slug: "diagnostic-site-internet",
    label: "Diagnostic de site internet",
    metaTitle: "Diagnostic de site internet et audit SEO local, Gard | Thaylart",
    metaDescription:
      "Diagnostic complet de votre présence en ligne : technique, référencement, mobile, conversion, présence locale. Rapport écrit et plan d'action sous 7 jours ouvrés. 400 €.",
    eyebrow: "Service · Diagnostic",
    h1: "Diagnostic de site internet et de présence en ligne",
    intro: [
      "Votre site existe, mais il ne vous apporte pas les clients espérés ? Avant de tout refaire, il faut comprendre ce qui bloque.",
      "J'analyse votre site, votre visibilité sur Google et votre présence locale, puis je vous remets un rapport écrit, clair et sans jargon, avec les problèmes classés par gravité et un plan d'action priorisé.",
    ],
    price: "400 €",
    priceNote: "200 € à la commande, 200 € à la remise du rapport",
    priceValue: 400,
    delay: "rapport remis sous 7 jours ouvrés",
    scope: "Rapport écrit + plan d'action priorisé",
    forWho: [
      { title: "Votre site ne génère pas de contacts", text: "Les visites sont là, ou pas, mais les demandes n'arrivent jamais. Le diagnostic identifie pourquoi." },
      { title: "Vous hésitez à refaire votre site", text: "Le rapport vous dit si une refonte est vraiment nécessaire, ou si quelques corrections suffisent." },
      { title: "Vos concurrents passent devant vous", text: "Vous comprenez ce qu'ils font mieux sur Google, et par où commencer pour les rattraper." },
    ],
    included: [
      "Technique et indexation : Google voit-il vraiment votre site ?",
      "Référencement : titres, contenus, positionnement observé",
      "Images, vitesse de chargement et affichage mobile",
      "Conversion et confiance : ce qui fait partir vos visiteurs",
      "Présence locale : fiche Google et avis",
      "Réseaux sociaux et cohérence de votre image",
      "Problèmes classés par gravité",
      "Plan d'action priorisé, utilisable seul ou avec le prestataire de votre choix",
    ],
    steps: [
      { title: "Commande", text: "Vous validez le devis et réglez l'acompte de 200 €. Vous me transmettez l'adresse de votre site." },
      { title: "Analyse complète", text: "Technique, référencement, mobile, conversion, présence locale et réseaux sont passés au crible." },
      { title: "Rapport écrit", text: "Remis sous 7 jours ouvrés : état des lieux, problèmes classés par gravité, plan d'action." },
      { title: "À vous de jouer", text: "Vous appliquez le plan vous-même, avec votre prestataire actuel, ou avec moi si vous le souhaitez." },
    ],
    faq: [
      { q: "Que contient exactement le rapport ?", a: "Un état des lieux de votre présence en ligne (technique, référencement, images, vitesse, mobile, conversion, présence locale et réseaux), les problèmes classés par gravité et un plan d'action priorisé." },
      { q: "Dois-je ensuite vous confier la refonte ?", a: "Non. Le rapport vous appartient, et le plan d'action peut être mis en œuvre par vous-même ou par le prestataire de votre choix." },
      { q: "De quoi avez-vous besoin pour commencer ?", a: "L'adresse de votre site et l'acompte de 200 €. Le rapport est remis sous 7 jours ouvrés à réception de l'acompte et des éléments nécessaires." },
    ],
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICES)

// Données structurées d'une page de service : le service, le fil d'Ariane et la FAQ
export function serviceJsonLd(s: Service) {
  const url = `${SITE_URL}/${s.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.label,
        serviceType: s.label,
        description: s.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#entreprise` },
        areaServed: [
          ...ZONES.map((name) => ({ "@type": "City", name })),
          ...REGIONS.map((name) => ({ "@type": "AdministrativeArea", name })),
        ],
        ...(s.priceValue && {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceValue, priceCurrency: "EUR" },
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: s.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  }
}
