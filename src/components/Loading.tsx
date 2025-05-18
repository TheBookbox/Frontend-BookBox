import Image from "next/image";

export function Loading(){
    return (
        <div className="z-50 flex justify-center items-center absolute top-0 left-0 bg-white h-screen w-full select-none">
            <Image className="animate-pulse" src={'/logo.png'} width={100} height={100} alt="logo.png"/>
        </div>
    )
}