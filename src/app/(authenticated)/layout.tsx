'use client'

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store"
import { Loading } from "@/components/Loading"
import { profile } from "@/slices/userSlice"

export default function layout({children}: {children:React.ReactNode}){

    const dispatch = useDispatch<AppDispatch>()

   const {user, loading} = useSelector((state: RootState) => state.auth)

   useEffect(()=>{
    dispatch(profile());
   },[])
    
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