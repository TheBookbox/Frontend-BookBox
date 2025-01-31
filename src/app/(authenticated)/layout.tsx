'use client'

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { Loading } from "@/components/Loading"

export default function layout({children}: {children:React.ReactNode}){

   const {user, loading} = useSelector((state: RootState) => state.auth)
    
    const router = useRouter()
    const pathName = usePathname()

    useEffect(()=>{
        if(!user && !loading){
                router.push('/')
                
        }

        
    },[user, loading, pathName, router])


    return (
        <>
            {!user && <Loading />}
            {children}
        </>
    )
}