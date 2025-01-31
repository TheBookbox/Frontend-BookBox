'use client'

import { Form } from "@/components/Form/Form";
import { register, reset } from "@/slices/authSlice";
import {useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { User } from "@/utils/interfaces";
import { useEffect } from "react";

// Redux

const Register = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {

       event.preventDefault()

       const formData = new FormData(event.currentTarget)
        
        const name = formData.get('name')?.toString()
        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()

        

        const user: User = {
            name,
            email,
            password
        }

        dispatch(register(user))
        

        setTimeout(()=>{
            dispatch(reset())
        }, 2000 )

    }

    useEffect(()=>{
        dispatch(reset())
      },[dispatch])


    return(
               
                    <div className="bg-white h-screen">
                        <Form mode="register" action={(data)=>handleRegister(data)}/>
                    </div>
              
          
    )
}

export default Register