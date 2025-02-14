'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Loading } from '@/components/Loading'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
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

  useEffect(()=>{
    if(user){
      router.push('/home')

    }
  },[user])

  if (checkingAuth) {
    return <Loading />
  }

  return <>{children}</>
}

export default Layout
