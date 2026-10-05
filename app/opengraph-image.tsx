import { ImageResponse } from "next/og"

// Image d'aperçu affichée quand le lien est partagé (Google, LinkedIn, WhatsApp, Facebook...)
export const alt = "Thaylart, création de sites internet à Bagnols-sur-Cèze et dans le Gard"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(900px 500px at 75% 20%, #27272a 0%, #18181b 60%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 8, color: "rgba(250,250,250,0.55)" }}>
          <span>THAYLART</span>
          <span>BAGNOLS-SUR-CÈZE · GARD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          <span>Des sites web qui</span>
          <span style={{ color: "rgba(250,250,250,0.45)" }}>travaillent pour vous.</span>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "rgba(250,250,250,0.6)" }}>
          {["Sites vitrines", "Refontes", "E-commerce", "Référencement local"].map((t) => (
            <span key={t} style={{ border: "1px solid rgba(250,250,250,0.2)", borderRadius: 999, padding: "10px 22px" }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
