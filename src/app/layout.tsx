import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Navigation } from "~/components/navigation/Navigation";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Morpheus",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} mocha bg-base text-peach`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
