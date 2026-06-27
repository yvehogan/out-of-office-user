import type { Metadata } from "next";
import "./globals.css";
import localfont from "next/font/local";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

// const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Out of Office",
  description: "Out of Office application",
};

const unageo = localfont({
  src: [
    {
      path: "../../public/fonts/unageo/Unageo-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/unageo/Unageo-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/unageo/Unageo-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/unageo/Unageo-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/unageo/Unageo-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-unageo",
});

const cormorantGaramond = localfont({
  src: [
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant/CormorantGaramond-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

// const cormorantGaramond = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-cormorant",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        unageo.variable,
        dmSans.variable,
        cormorantGaramond.variable,
      )}
    >
      <body className={unageo.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
