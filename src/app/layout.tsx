import type { Metadata } from "next";

import { sbSans } from "@/shared/config/fonts";

import "./styles/index.css";

export const metadata: Metadata = {
  title: "Угадай стеки - Звук",
  description: "Угадай стеки - Звук",
  openGraph: {
    title: "Угадай стеки — Звук",
    description: "Угадай стеки - Звук",
    siteName: "Угадай стеки - Звук",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Угадай стеки — Звук",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Угадай стеки — Звук",
    description: "Угадай стеки — Звук",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={sbSans.variable}>{children}</body>
    </html>
  );
}
