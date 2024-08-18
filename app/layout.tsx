import type { Metadata } from "next";
import Menu from '../components/Menu';
import { DM_Sans } from "next/font/google";
import './globals.css';

const dmSans = DM_Sans(
  { subsets: ["latin"], weight: ['300', '400', '500'] }
);

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
      <body className={`${dmSans.className} flex flex-col lg:flex-row h-screen`}>
        <Menu/>
        <main className="flex-1 overflow-x-auto">
          {children}
        </main>
      </body>
    </html>
  );
}