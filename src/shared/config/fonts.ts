import localFont from "next/font/local";

export const sbSans = localFont({
  src: [
    {
      path: "./assets/sb-sans-text-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/sb-sans-text-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-family-main",
  display: "swap",
});
