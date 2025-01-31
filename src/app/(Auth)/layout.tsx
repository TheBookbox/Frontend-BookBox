'use client'

import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'



const layout = ({children}: { children: React.ReactNode }) => {

    const {user, loading} = useSelector((state: RootState) => state.auth)
    
    const router = useRouter()

    useEffect(()=>{
        if(user){
            router.push('/home')
        }
    },[user])

  return (
    <>
        {children}
    </>
  )
}

export default layout