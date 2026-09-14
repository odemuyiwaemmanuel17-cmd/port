import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack / Mobile Developer",
  description:
    "Portfolio of Emmanuel Odemuyiwa — Aerospace Engineering Undergraduate & Full-Stack/Mobile Developer. Building high-performance web platforms, Flutter mobile apps, and CAD systems.",
  keywords: [
    "Emmanuel Odemuyiwa",
    "Aerospace Engineering",
    "Full-Stack Developer",
    "Mobile Developer",
    "Flutter",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "CAD Modeling",
    "Onshape",
    "FreeCAD",
    "Portfolio",
  ],
  authors: [
    {
      name: "Emmanuel Odemuyiwa",
      url: "https://github.com/odemuyiwaemmanuel17-cmd",
    },
  ],
  creator: "Emmanuel Odemuyiwa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/odemuyiwaemmanuel17-cmd",
    title:
      "Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack / Mobile Developer",
    description:
      "Aerospace Engineering meets Full-Stack & Mobile Software. Parametric 3D CAD modeling, modern AI/web technology, and performant digital systems.",
    siteName: "Emmanuel Odemuyiwa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack Developer",
    description: "Aerospace Engineering meets Full-Stack & Mobile Software.",
    creator: "@odemuyiwa_dev",
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
