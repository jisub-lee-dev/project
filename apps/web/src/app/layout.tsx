import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Full-Stack App",
  description: "Built with Next.js 15, React 19, and Turborepo",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Turborepo"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    title: "Modern Full-Stack App",
    description: "Built with Next.js 15, React 19, and Turborepo",
    siteName: "Modern Full-Stack App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Full-Stack App",
    description: "Built with Next.js 15, React 19, and Turborepo",
    creator: "@your_twitter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="bg-background min-h-screen font-sans antialiased">
          {children}
        </div>
      </body>
    </html>
  );
}
