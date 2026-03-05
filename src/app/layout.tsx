import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PodBundle - Podcast Advertising Made Simple",
  description: "Bundle. Launch. Report. Podcast advertising made simple for small agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
