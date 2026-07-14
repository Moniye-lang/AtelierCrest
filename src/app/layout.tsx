import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Crest | Premium Embroidery Design Marketplace",
  description: "Bespoke digital embroidery templates (.DST, .PES, .JEF) designed for modern tailors and luxury fashion houses. Instantly download verified files.",
  keywords: ["embroidery designs", "agbada embroidery", "kaftan designs", "senator embroidery", "embroidery machine formats", "DST files", "PES files", "haute couture", "premium embroidery"],
  authors: [{ name: "Atelier Crest Guild" }],
  openGraph: {
    title: "Atelier Crest | Premium Embroidery Design Marketplace",
    description: "Bespoke digital embroidery templates designed for modern tailors and luxury fashion houses.",
    type: "website",
    locale: "en_US",
    siteName: "Atelier Crest"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-luxury-white text-luxury-charcoal transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
