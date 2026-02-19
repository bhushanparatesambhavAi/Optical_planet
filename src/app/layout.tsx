import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Optical Planet | Premium Eyewear & Virtual Try-On",
  description: "Discover your perfect look with Optical Planet. AI-powered frame recommendations, virtual try-on, and premium eyewear collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}> {/* Adjusted body className */}
        <div className="flex min-h-screen flex-col"> {/* Added wrapper div */}
          <Header />
          <main className="flex-1"> {/* Changed main className */}
            {children}
          </main>
          <Footer />
        </div>
        <WhatsAppButton /> {/* Added WhatsAppButton */}
      </body>
    </html>
  );
}
