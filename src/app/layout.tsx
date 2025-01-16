import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "BookBox",
  description: "Your books in one place. Share reviews of your favorite books. Get recommendations on what to read. Follow your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
