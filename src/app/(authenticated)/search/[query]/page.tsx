'use client'

import { MainBooks } from "@/components/MainBooks/MainBooks";
import { useGoogleBooks } from "@/hook/useGoogleBooks";
import { useParams } from "next/navigation";


const page = () => {
    
    const { query } = useParams();

    const queryTrim = decodeURIComponent(query as string)

    const { books = [], loading: BestSellerLoad } = useGoogleBooks(query, 5) || {}


    return (
    <div className="bg-white ">
        id: {queryTrim}
        <MainBooks data={books} title={queryTrim} linkMore="/"/> 
    </div>
  )
}

export default page