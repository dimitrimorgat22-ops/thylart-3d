import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thaylart.com"),
  title: "THAYLART — Studio de visualisation 3D produit",
  description: "Visualisation produit et animations 3D — des visuels construits pour marquer durablement. Studio basé près de Bagnols-sur-Cèze, dans le Gard.",
  keywords: ["visualisation 3D produit", "animation 3D produit", "packshot 3D", "rendu 3D Blender", "studio 3D Gard", "3D Bagnols-sur-Cèze", "infographiste 3D Gard"],
  openGraph: {
    title: "THAYLART — Studio de visualisation 3D produit",
    description: "Visualisation produit et animations 3D — des visuels construits pour marquer durablement.",
    url: "https://www.thaylart.com",
    siteName: "THAYLART",
    images: [{ url: "/visualisation-produit.png", width: 1080, height: 1920, alt: "Visualisation produit 3D — Thaylart" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THAYLART — Studio de visualisation 3D produit",
    description: "Visualisation produit et animations 3D — des visuels construits pour marquer durablement.",
    images: ["/visualisation-produit.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Thaylart",
  founder: { "@type": "Person", name: "Dimitri Morgat" },
  image: "https://www.thaylart.com/visualisation-produit.png",
  url: "https://www.thaylart.com",
  email: "dimitrimorgat@thaylart.com",
  telephone: "+33662233699",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 rue de l'Ancien Couvent",
    postalCode: "30200",
    addressLocality: "Saint-Nazaire",
    addressRegion: "Gard",
    addressCountry: "FR",
  },
  sameAs: ["https://www.instagram.com/thaylartonline/"],
  description: "Studio de visualisation 3D produit et animations, basé à Saint-Nazaire près de Bagnols-sur-Cèze, dans le Gard.",
  areaServed: [
    { "@type": "City", name: "Bagnols-sur-Cèze" },
    { "@type": "City", name: "Saint-Nazaire" },
    { "@type": "AdministrativeArea", name: "Gard" },
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
