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
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BookOpen, TrendingUp } from "lucide-react"
import Genres from '@/data/MainData'

export default function Home() {


  const [activeTab, setActiveTab] = useState<"bestsellers" | "brazilian">("bestsellers")

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

        <div className="md:hidden flex justify-center mb-8">
          <div className="bg-azul-escuro/30 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "bestsellers"
                  ? "bg-azul-primario text-azul-escuro"
                  : "text-azul-clarinho hover:bg-azul-escuro/20"
              }`}
            >
              Mais vendidos
            </button>
            <button
              onClick={() => setActiveTab("brazilian")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "brazilian"
                  ? "bg-azul-primario text-azul-escuro"
                  : "text-azul-clarinho hover:bg-azul-escuro/20"
              }`}
            >
              Por gênero
            </button>
          </div>
        </div>

        <div className="mt-6 p-4">
          {/* Desktop: Show both sections */}
          <div className="hidden md:block">
            <MainBooks data={BestSeller} title="Mais vendidos" linkMore="/" icon={<TrendingUp className="w-5 h-5" />} />

            <div className="my-12">
              <Line />
            </div>

            <MainBooks
              data={Genres}
              title="Por gênero"
              linkMore="/"
              icon={<BookOpen className="w-5 h-5" />}
            />
          </div>

          {/* Mobile: Show active tab */}
          <div className="md:hidden">
            {activeTab === "bestsellers" && (
              <MainBooks
                data={BestSeller}
                title="Machado de Assis"
                linkMore="/"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            )}

            {activeTab === "brazilian" && (
              <MainBooks
                data={Genres}
                title="Por Gênero"
                linkMore="/"
                icon={<BookOpen className="w-5 h-5" />}
              />
            )}
          </div>
        </div>
        <Line />

          <div>
            <Cta/>
          </div>
      </main>

     
    </div>
  );
}
