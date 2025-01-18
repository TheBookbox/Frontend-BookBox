import Image from "next/image"

export function Hero(){
    return (
        <div className="
        flex items-end bgs
        w-full h-[300px] bg-black bg-[url('/hero-image.png')] bg-cover bg-no-repeat bg-center 

        md:h-[600px]
        
        ">
            <div className="
            relative top-9 
            flex flex-col items-center w-full text-xl font-serifDisplay py-5 text-white 
            md:text-5xl
            md:gap-3
            "> 
                <h2>Dê sua opinião sobre seus livros.</h2>
                <h2>Compartilhe com amigos.</h2>
                <h2>Receba indicações.</h2>

                <span className="
                font-semibold mt-5  cursor-pointer active:bg-azul-medio
                flex justify-center items-center font-sans w-[200px] h-7 rounded-sm text-sm bg-azul-primario border-none text-white
                md:w-[300px]
                md:h-10
                md:text-base
                md:mt-12
                
                ">Comece agora - é gratís</span>
            </div>

           
        </div>
    )
}