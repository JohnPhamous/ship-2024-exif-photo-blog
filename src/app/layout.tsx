import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { clsx } from "clsx/lite";
import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_DOMAIN_OR_TITLE,
  SITE_TITLE,
} from "@/site/config";
import AppStateProvider from "@/state/AppStateProvider";
import ToasterWithThemes from "@/toast/ToasterWithThemes";
import PhotoEscapeHandler from "@/photo/PhotoEscapeHandler";
import { Metadata } from "next/types";
import { ThemeProvider } from "next-themes";
import Nav from "@/site/Nav";
import Footer from "@/site/Footer";
import CommandK from "@/site/CommandK";
import SwrConfigClient from "../state/SwrConfigClient";
import { GeistMono } from "geist/font/mono";

import "../site/globals.css";
import "../site/sonner.css";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ...(BASE_URL && { metadataBase: new URL(BASE_URL) }),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/png",
      sizes: "180x180",
    },
    {
      url: "/favicons/light.png",
      rel: "icon",
      media: "(prefers-color-scheme: light)",
      type: "image/png",
      sizes: "32x32",
    },
    {
      url: "/favicons/dark.png",
      rel: "icon",
      media: "(prefers-color-scheme: dark)",
      type: "image/png",
      sizes: "32x32",
    },
    {
      url: "/favicons/apple-touch-icon.png",
      rel: "icon",
      type: "image/png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Suppress hydration errors due to next-themes behavior
      suppressHydrationWarning
      className={GeistMono.variable}
    >
      <body>
        <AppStateProvider>
          <SwrConfigClient>
            <ThemeProvider attribute="class" forcedTheme="dark">
              <main className={clsx("mx-3 mb-3", "lg:mx-6 lg:mb-6")}>
                <Nav siteDomainOrTitle={SITE_DOMAIN_OR_TITLE} />
                <div
                  className={clsx("min-h-[16rem] sm:min-h-[30rem]", "mb-12")}
                >
                  {children}
                </div>
                <div className="fixed bottom-0 left-0 right-0 grid items-end">
                  <div
                    className="absolute w-full bg-white pointer-events-none dark:bg-black h-[600px]"
                    style={{
                      maskImage: `linear-gradient(to
				bottom, transparent 0%,
				rgba(0, 0, 0, 0.4) 50%,
				rgba(0, 0, 0, 0.8) 80%,
				rgba(0, 0, 0, 0.9) 90%)`,
                    }}
                  ></div>
                  <div className="px-6 pb-2">
                    <Footer />
                  </div>
                </div>
              </main>
              <CommandK />
            </ThemeProvider>
          </SwrConfigClient>
          <Analytics debug={false} />
          <SpeedInsights debug={false} />
          <PhotoEscapeHandler />
          <ToasterWithThemes />
        </AppStateProvider>
      </body>
    </html>
  );
}
