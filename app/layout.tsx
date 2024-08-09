import type { Metadata } from "next";
import Menu from '../components/Menu';
import { Inter } from "next/font/google";
import "@/styles/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexile | Briana Gude",
  description: "A time tracking feature for the flexile contractor portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
