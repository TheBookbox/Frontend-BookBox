'use client'

import { Form } from "@/components/Form/Form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { User } from "@/utils/interfaces";
import { login, reset } from "@/slices/authSlice";
import { useEffect } from "react";

export default function Login(){
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()

        const user: User = {
            email,
            password
        }


        dispatch(login(user))
        
        setTimeout(()=>{
            dispatch(reset())
        }, 2000 )
    }

    useEffect(()=>{
        dispatch(reset())
    },[dispatch])

   

    return (
        <div className="bg-white h-screen">
            <Form mode="login" action={handleLogin}/>
        </div>
    )
}

