'use client'
import { Hero } from "@/components/Hero/Hero";
import { Line } from "@/components/Line";
import { MainBooks } from "@/components/MainBooks/MainBooks";
import { Cta } from "@/components/CTA/Cta";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const{user:AuthUser, loading} = useSelector((state: RootState) => state.auth)
  const{user} = useSelector((state: RootState) => state.user)

  useEffect(()=>{
      if(AuthUser){
        router.push('/home')
      }
  },[])

  if(loading){
    return <p>Carregando...

    </p>
  }

  return (
    <div className="w-full bg-white">

      <div>
        <Hero />
      </div>

      <main className="bg-azul-grad w-full h-full pt-20">
        <Line />

        <div className="mt-5">
          <MainBooks title={'Brasileiros famosos'} data={[]} linkMore={!user ? '/popular' : '/register'}/>
          <Line />
          <MainBooks title={'Por gênero'} data={[]} linkMore={!user ? '/popular' : '/register'}/>
        </div>
        <Line />

          <div>
            <Cta/>
          </div>
      </main>

     
    </div>
  );
}
