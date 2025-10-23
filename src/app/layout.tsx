import type { Metadata } from "next";

import { sbSans } from "@/shared/config/fonts";

import "./styles/index.css";

export const metadata: Metadata = {
  title: "Угадай стеки - Звук",
  description: "Угадай стеки - Звук",
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
