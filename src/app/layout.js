import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import FixedFooterReveal from '@/components/layout/Footer2';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NIFASE - National Institute of Finance and Stock Education",
  description: "National Institute of Finance and Stock Education (NIFASE) provides job-oriented financial, stock market, derivatives, and technical analysis courses.",
  metadataBase: new URL("https://www.niface.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FixedFooterReveal>
          <Header />
          {children}
        </FixedFooterReveal>
      </body>
    </html>
  );
}
