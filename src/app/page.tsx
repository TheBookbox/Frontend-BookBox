'use client'
import { Hero } from "@/components/Hero/Hero";
import { Line } from "@/components/Line";
import { MainBooks } from "@/components/MainBooks/MainBooks";
import { Cta } from "@/components/CTA/Cta";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useGoogleBooks } from "@/hook/useGoogleBooks";
import Genres from '@/data/MainData'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {

  const{user, loading} = useSelector((state: RootState) => state.auth)

  const router = useRouter()

  const {books: BestSeller = [], loading: BestSellerLoad} = useGoogleBooks('inauthor:Machado%de%Assis&langRestrict=pt&orderBy=relevance', 5) || {}

  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const cookies = Cookies.get('user')
    const userCookies = cookies ? JSON.parse(cookies) : null

    if (userCookies) {
      router.push('/home')
    } else {
      setCheckingAuth(false)
    }
  }, [])


 

  if(loading || BestSellerLoad || checkingAuth){
    return <Loading />
  }
  

  return (
    <div className="w-full bg-white">

      <div>
        <Hero />
      </div>

      <main className="bg-azul-grad w-full h-full pt-20">
        <Line />

        <div className="mt-5">
          <MainBooks title={'Brasileiros famosos'} data={BestSeller} linkMore={!user ? '/popular' : '/register'}/>
          <Line />
          <MainBooks title={'Por gênero'} data={Genres} linkMore={!user ? '/popular' : '/register'}/>
        </div>
        <Line />

          <div>
            <Cta/>
          </div>
      </main>

     
    </div>
  );
}
