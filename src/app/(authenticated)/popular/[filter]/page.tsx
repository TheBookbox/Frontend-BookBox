"use client"

import { useState } from "react"
import { Line } from "@/components/Line"
import { Loading } from "@/components/Loading"
import { MainBooks } from "@/components/MainBooks/MainBooks"
import { useGoogleBooks } from "@/hook/useGoogleBooks"
import { BookOpen, TrendingUp } from "lucide-react"

export default function PopularBooks() {
  const { books: BestSeller = [], loading: BestSellerLoad } = useGoogleBooks("best%20sellers", 5) || {}
  const { books: BrazilBestSeller = [], loading: BrazilBestSellerLoad } =
    useGoogleBooks("inauthor:Machado%de%Assis&langRestrict=pt&orderBy=relevance", 5) || {}

  const [activeTab, setActiveTab] = useState<"bestsellers" | "brazilian">("bestsellers")

  if (BestSellerLoad || BrazilBestSellerLoad) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-azul-grad">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center pt-10 pb-16 bg-azul-grad min-h-screen">
      <div className="w-full max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serifDisplay text-azul-clarinho font-bold">Populares</h1>
          <p className="text-azul-clarinho/80 mt-2 max-w-xl mx-auto">
            Descubra os livros que estão fazendo sucesso entre os leitores
          </p>
        </div>

        {/* Tab Navigation - Mobile Only */}
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
              Brasileiros
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Desktop: Show both sections */}
          <div className="hidden md:block">
            <MainBooks data={BestSeller} title="Mais vendidos" linkMore="/" icon={<TrendingUp className="w-5 h-5" />} />

            <div className="my-12">
              <Line />
            </div>

            <MainBooks
              data={BrazilBestSeller}
              title="Brasileiros famosos"
              linkMore="/"
              icon={<BookOpen className="w-5 h-5" />}
            />
          </div>

          {/* Mobile: Show active tab */}
          <div className="md:hidden">
            {activeTab === "bestsellers" && (
              <MainBooks
                data={BestSeller}
                title="Mais vendidos"
                linkMore="/"
                icon={<TrendingUp className="w-5 h-5" />}
              />
            )}

            {activeTab === "brazilian" && (
              <MainBooks
                data={BrazilBestSeller}
                title="Brasileiros famosos"
                linkMore="/"
                icon={<BookOpen className="w-5 h-5" />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

