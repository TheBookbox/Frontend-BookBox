import Link from "next/link"
import { Input } from "../Input/Input"
import Image from "next/image"
import { RootState } from "../../../store"
import { useSelector } from "react-redux"
import { Alert } from "../Alert"

interface FormProps {
    mode: 'login' | 'register'
    action: (data: any) => void
}

export function Form(props: FormProps){
    
    const{loading, error} = useSelector((state: RootState) => state.auth)

    return (
        <div className="flex flex-col justify-center pt-9">  
            <div className="text-3xl text-center font-serifDisplay font-semibold text-azul-medio">
                {props.mode == 'register' && <h1>Crie sua conta, <br/>é grátis</h1>}
                {props.mode == 'login' && <h1>Faça login na sua conta</h1>}
            </div>
                
            <form onSubmit={(e) => props.action(e)}
                className="flex flex-col items-center mt-10 gap-5"
            >   
                {props.mode == 'register' && <Input name="name" type="text" required placeholder="Nome" autoFocus/>}
                <Input name="email" type="text" required placeholder="Seu email" autoFocus={props.mode == 'login' && true}/>
                <Input name="password" type="password" required placeholder="Sua senha" />

                
                <button disabled={loading ? true : false} className="btn w-full max-w-xs bg-azul-medio text-white hover:bg-azul-grad">
                    {loading ? (
                        <p>
                            Carregando...
                        </p>
                    ) : (
                        <p>
                            {props.mode == 'register' && 'Criar conta'}
                            {props.mode == 'login' && 'Login'}
                        </p>
                    )}
                    
                    
                </button>


                {props.mode == 'login' && (
                    <Link href={'/resetPassword'}>
                        <p className="font-semibold text-azul-medio">Esqueceu a senha?</p>
                    </Link>)}

            </form>
            
            {error && <Alert msg={error} type="alert-error"/> }
            

            <div className="flex mt-20 justify-center items-center ">
                <Image src={'/imgs/illustrations/undraw_access.svg'} width={250} height={250} alt="illustration-svg"/>
            </div>

            
        </div>
    )
}