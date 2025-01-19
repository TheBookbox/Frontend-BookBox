import { navMenuIcon, SearchIcon } from "@/utils/icons"
import Image from "next/image"

export function Navbar(){
    const liClass = 'cursor-pointer hover:text-azul-medio hover:bg-gray-300 p-2 rounded-lg'
    
    return (
        <div className="flex items-center justify-between w-full h-[105px] px-8 lg:justify-around md:h-[145px] select-none">
            <div className="flex items-center gap-2">
                <Image src={'/logo.png'} width={50} height={50} alt="logo-bookbox"/>
                <p className="font-serif text-azul-primario text-2xl">BookBox</p>
            </div>
            
            <ul className="hidden md:flex items-center justify-around gap-10 text-azul-primario font-semibold ">
                <li className={liClass}>POPULARES</li>
                <li className={liClass}>LIVROS</li>
                <li className={liClass}>CRIAR CONTA</li>
                <li className={liClass}>LOGIN</li>

                <li className={`${liClass} text-3xl`}>{SearchIcon}</li>
            </ul>

            <ul className={`flex items-center gap-3 md:hidden text-azul-primario`}>
               <li className={`${liClass} text-3xl`}>{SearchIcon}</li>

               <div className="dropdown">
                   <div tabIndex={0} role="button" className={`${liClass} text-4xl`}>{navMenuIcon}</div>

                   <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 shadow-2xl shadow-black flex flex-col gap-10 p-10 right-3 bg-white">
                    <li className={liClass}>POPULARES</li>
                        <li className={liClass}>LIVROS</li>
                        <li className={liClass}>CRIAR CONTA</li>
                        <li className={liClass}>LOGIN</li>
                   </ul>


               </div>
            </ul>
        </div> 
    )
}