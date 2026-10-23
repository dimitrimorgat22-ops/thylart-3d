import type { Metadata } from "next"
import ServicePage from "../components/service-page"
import { SERVICES, serviceJsonLd } from "../services"
import { SITE_URL } from "../content"

const s = SERVICES["creation-boutique-en-ligne"]

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `/${s.slug}` },
  openGraph: {
    title: s.metaTitle,
    description: s.metaDescription,
    url: `${SITE_URL}/${s.slug}`,
    siteName: "Thaylart",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(s)) }} />
      <ServicePage slug={s.slug} />
    </>
  )
}
