'use client'

import { useParams } from "next/navigation"

export default function BookDetails(){

   const{id} = useParams()
   
    return (
        <div className="flex items-center flex-col pt-10">
                <p>id: {id}</p>
                <p>Olá</p>
        </div>
    )
}