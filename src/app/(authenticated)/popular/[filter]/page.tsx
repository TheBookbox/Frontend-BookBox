'use client'

import { Line } from "@/components/Line"
import { Loading } from "@/components/Loading"
import { MainBooks } from "@/components/MainBooks/MainBooks"
import { useGoogleBooks } from "@/hook/useGoogleBooks"

export default function PopularBooks(){

    const {books: BestSeller = [], loading: BestSellerLoad} = useGoogleBooks('best%20sellers', 5) || {}
    
    const {books: BrazilBestSeller = [], loading: BrazilBestSellerLoad} = useGoogleBooks('inauthor:Machado%de%Assis&langRestrict=pt&orderBy=relevance', 5) || {}

    if(BestSellerLoad){
        return <Loading />
    }

    return (
        <div className="flex flex-col items-center pt-16 bg-azul-grad">
            
            <h1 className="text-4xl font-serifDisplay text-azul-clarinho">Populares</h1>

            <div className="mt-14">
                <MainBooks data={BestSeller} title="Mais vendidos" linkMore="/"/>
                <Line/>
                <MainBooks data={BrazilBestSeller} title="Brasileiros famosos" linkMore="/" />
            </div>
        </div>
    )
}