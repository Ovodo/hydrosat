import type { Metadata } from "next";
import { Exo_2, Outfit, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import LayoutProvider from "@/components/LayoutProvider";

const exo = Outfit({
  variable: "--font-exo_2",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HydroSat",
  description: "Re-imagining products on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${exo.className} flex flex-col   h-screen antialiased`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
