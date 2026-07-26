import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://peddavommond.de"),
  title: "Pedda vom Mond — Das Signal ist da",
  description:
    "Elektronische Musik, visuelle Welten und merkwürdige Signale aus dem Orbit von Pedda vom Mond.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pedda vom Mond — Das Signal ist da",
    description:
      "Du bist nicht zufällig hier. Elektronische Signale aus einer anderen Umlaufbahn.",
    url: "/",
    siteName: "Pedda vom Mond",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Pedda vom Mond — Du bist nicht zufällig hier.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedda vom Mond — Das Signal ist da",
    description: "Du bist nicht zufällig hier.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
