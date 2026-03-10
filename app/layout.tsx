import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConvexClient } from "convex/browser";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stamp",
  description: "Introducing Stamp. Your all-one-study assistant made to assist in all your learning.Whether its jotting down notes, making mind maps or doing research on the web you can do it all inside stamp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
          <TooltipProvider>
            <ClerkProvider appearance={{variables: {colorBackground: '#FFE373', colorForeground: '#000000', colorPrimary: '#2F3037', colorForegroundPrimary: "#FFFFFF", colorNeutral: "#000000", colorMuted: "#F5F5F5", colorMutedForeground: '#747684', colorRing: "#000000", colorInput: "#FFFFFF", colorInputForeground:"#000000", colorBorder: "#E5E5E5",colorModalBackdrop: "#000000",colorShadow: "#000000", colorSuccess: "#22C543", colorWarning: "#F36B16", colorDanger: "#EF4444"},cssLayerName: 'clerk',}}>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </ClerkProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
