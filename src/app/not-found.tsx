'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Custom404() {
    const router = useRouter()

    useEffect(()=>{
        setTimeout(() => {
            router.push('/home')
        }, 1000);
    },[])

    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>404 - Página não encontrada</h1>
        <p>Ops! A página que você procurou não existe.</p>
        <p>Levando de volta...</p>
        
      </div>
    );
  }