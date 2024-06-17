import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rubiks Cube",
  description: "a very cool website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
