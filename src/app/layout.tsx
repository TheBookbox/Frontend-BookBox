'use client'

import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import store from "../../store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Line } from "@/components/Line";


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

         <Line/>
          <Footer/>
          </Provider>
        </body>
      </html>
  
  );
}
