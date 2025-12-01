import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Rakshah Real Estate | Properties in Beit Shemesh",
  description: "Find your perfect home in Ramat Beit Shemesh and Greater Beit Shemesh. Browse listings, calculate costs, and prepare legal documents.",
  keywords: ["real estate", "Beit Shemesh", "Ramat Beit Shemesh", "RBS", "Israel", "property", "apartment", "rent", "buy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
