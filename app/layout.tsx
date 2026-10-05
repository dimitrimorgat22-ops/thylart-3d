import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL, ZONES, REGIONS } from "./content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Création site internet Bagnols-sur-Cèze & Gard | Thaylart"
const DESCRIPTION =
  "Création de sites internet sur mesure pour artisans, commerçants et PME du Gard : site vitrine dès 1 100 €, refonte, e-commerce. Devis gratuit sous 24h."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "création site internet Bagnols-sur-Cèze",
    "création site web Gard",
    "site vitrine entreprise",
    "refonte site internet",
    "création site e-commerce",
    "webdesigner Gard",
    "référencement local Gard",
  ],
  authors: [{ name: "Dimitri Morgat" }],
  creator: "Dimitri Morgat",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Thaylart",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#18181b",
};

// Données structurées : entreprise locale + site web (le FAQPage est sur la page d'accueil)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#entreprise`,
      name: "Thaylart",
      description:
        "Studio de création de sites internet sur mesure pour les entreprises : sites vitrines, refontes et boutiques en ligne. Basé à Saint-Nazaire, près de Bagnols-sur-Cèze, dans le Gard.",
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image`,
      image: `${SITE_URL}/opengraph-image`,
      email: "dimitrimorgat@thaylart.com",
      telephone: "+33662233699",
      priceRange: "€€",
      founder: { "@type": "Person", name: "Dimitri Morgat", jobTitle: "Créateur de sites internet" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "6 rue de l'Ancien Couvent",
        postalCode: "30200",
        addressLocality: "Saint-Nazaire",
        addressRegion: "Occitanie",
        addressCountry: "FR",
      },
      areaServed: [
        ...ZONES.map((name) => ({ "@type": "City", name })),
        ...REGIONS.map((name) => ({ "@type": "AdministrativeArea", name })),
      ],
      knowsAbout: ["Création de sites internet", "Site vitrine", "Refonte de site", "E-commerce", "Référencement local", "Webdesign"],
      sameAs: ["https://www.instagram.com/thaylartonline/"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Création de sites internet",
        itemListElement: [
          { name: "Diagnostic de présence en ligne", price: 400 },
          { name: "Création de site vitrine sur mesure", price: 1100 },
          { name: "Refonte complète de site internet", price: 1500 },
          { name: "Création de boutique en ligne" },
        ].map(({ name, price }) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
          ...(price && {
            priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "EUR" },
          }),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Thaylart",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#entreprise` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
