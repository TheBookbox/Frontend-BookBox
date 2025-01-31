import Link from "next/link";

export function Cta(){
    return (
        <div className="flex flex-col justify-center gap-10 items-center w-full h-[321px]">
            <h2 className="text-white font-bold text-2xl">Crie sua conta, é grátis</h2>

            <Link href={'/register'}>
                <span className="
                active:bg-azul-medio cursor-pointer
                bg-azul-primario px-14 py-2 rounded-sm text-white font-semibold">Criar conta</span>
            </Link>
        </div>
    )
}