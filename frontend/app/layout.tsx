import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matchly – Smart Resume Matching",
  description:
    "Upload your resume and job description, get a matching cover letter instantly.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body
        className={`font-mono antialiased min-h-screen bg-muted`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
