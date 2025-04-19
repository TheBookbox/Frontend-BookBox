'use client'

import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import store from "../../store"
import { Line } from "@/components/Line";
import { Metadata } from "next";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  
  return (
    
      <html lang="pt-br">
        <head>
          <link rel="shortcut icon" href="/logo.png" type="image/png" />
          <title>BookBox</title>
        </head>
        <body
          className={`antialiased`}
        >
           <Provider store={store}>
          <Navbar />
          
          

         {children}

         <Line/>
          <Footer/>
          </Provider>
        </body>
      </html>
  
  );
}
