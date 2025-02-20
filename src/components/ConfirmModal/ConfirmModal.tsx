'use client'

import { useEffect, useState } from "react"
import { Line } from "../Line"

interface ConfirmModal {
    title: string
    description: string
    cancel: string
    go: string
    confirm: (action: boolean) => void

    showModal: boolean
    setVisible: (visible: boolean) => void
}


export function ConfirmModal(props: ConfirmModal){

    function handleConfirm(value: boolean){
        props.confirm(value)

        props.setVisible(false)
    }

 


    return (
        <div onClick={()=>props.setVisible(false)} className={`z-10 ${props.showModal ? 'fixed' : 'hidden'} w-full h-full top-0 bg-modalBg text-black`}>
            <div className="flex flex-col justify-evenly fixed bottom-0 bg-white w-full h-[320px] opacity-100 rounded-t-xl p-5 transition-all duration-150
            
            md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2 md:rounded-lg md:max-w-[550px]">
                <div>
                    <h1 className="text-2xl font-bold">{props.title}</h1>
                    <p className="">{props.description}</p>
                </div>
                <Line/>
                <div className="flex justify-center gap-5 ">
                    <div onClick={()=>handleConfirm(false)} className="btn btn-neutral">{props.cancel}</div>
                    <div onClick={() => handleConfirm(true)} className="btn btn-error text-white">{props.go}</div>

                </div>
            </div>
        </div>
    )
}