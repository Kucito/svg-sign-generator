import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SvgProvider } from "@/contexts/svg-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sign Generator",
  description: "Web app for generating signs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SvgProvider>
          {children}
          <Toaster />
        </SvgProvider>
      </body>
    </html>
  );
}
