'use client'

import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import store from "../../store";


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
