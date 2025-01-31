'use client'

import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
           <Provider store={store}>
          <Navbar />
        
         {children}
          <Footer/>
          </Provider>
        </body>
      </html>
  
  );
}
