import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

// Font optimization (using Geist Sans/Mono if user prefers, or system fonts)
// For now, let's keep it simple with system fonts as declared in globals.css,
// but adding metadata is key.

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,

  keywords: [
    "Hareram Kushwaha",
    "Software Engineer",
    "Computer Science",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@" + siteConfig.social.twitter,
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="flex justify-between items-center p-6 border-b border-gray-800">
          <Link href="/" className="text-xl font-bold">
            Hareram
          </Link>

          <div className="flex gap-6 text-gray-400">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
          </div>
        </nav>

        <div>{children}</div>
      </body>
    </html>
  );
}
