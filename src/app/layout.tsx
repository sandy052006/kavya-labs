import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "Kavya Labs — Health Intelligence, Reimagined",
  description: "Kavya Labs turns fragmented clinical data into predictive insights — so providers can act before symptoms appear.",
  openGraph: {
    title: "Kavya Labs — Health Intelligence, Reimagined",
    description: "AI-powered health intelligence platform. Predict, prevent, and personalize care at scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
