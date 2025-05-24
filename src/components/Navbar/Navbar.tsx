"use client";

import { navMenuIcon } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { logout, reset } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { User } from "@/utils/interfaces";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { FormEvent, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../Input/Input";

interface NavbarProps {
  mode: 'without login' | 'login'
}

export function Navbar(props: NavbarProps) {



  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const[searchBox, setSearchBox] = useState<boolean>(false)
  
  const[query, setQuery] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user: profile, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  const navOpt = [
    { name: "POPULARES", link: "/popular/all" },
    { name: "CRIAR CONTA", link: "/register" },
    { name: "LOGIN", link: "/login" },
  ];

  if (profile) {
    navOpt[1] = { name: "", link: "" };
    navOpt[2] = { name: "", link: "" };
  }

  if(props.mode === 'without login') {
    navOpt[0] = {name: '', link: ''}
  }


 

  const liClass =
    "cursor-pointer hover:text-azul-medio hover:bg-gray-300 p-2 rounded-lg";

  function handleLogout() {
    setConfirmModal(true);
  }

  function confirm(value: boolean) {
    if (confirmModal && value) {
      dispatch(logout());
      dispatch(reset());
      router.push("/");
    }
  }

  function searchBook(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    router.push(`/search/${query}`)

    
  } 




  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
        <ConfirmModal
          setVisible={()=>setConfirmModal(false)}
          showModal={confirmModal}
          title="Deseja sair?"
          description="Você voltará ao início."
          go="Sair"
          cancel="Cancelar"
          confirm={confirm}
        />

      {/* Search container */}
      {props.mode == 'login' && (
         <div className={`${searchBox ? 'relative' : 'hidden'}  w-full py-5 md:hidden`}>
         <form className="flex justify-center items-center w-1/2 mx-auto" onSubmit={e => searchBook(e)}>
             <Input 
             type="text"
             autoFocus
             placeholder="Pesquise por livros"
             value={query}
             onChange={setQuery}
             />
             <Search className="relative -left-10"/>
         </form>
     </div>
      )}

     {/* End Search container */}

      <div className="bg-white flex items-center justify-between w-full h-[105px] px-8 lg:justify-around md:h-[145px] select-none border-b">
        <Link href={user ? "/home" : "/"}>
          <span className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="logo-bookbox"
            />
            <p className="font-serif text-azul-primario text-2xl">BookBox</p>
          </span>
        </Link>
        <ul className="hidden md:flex items-center justify-around gap-10 text-azul-primario font-semibold ">
          {navOpt.map(
            (opt, i) =>
              opt.name && (
                <Link
                  href={opt.link}
                  key={i}
                >
                  <li className={liClass}>{opt.name}</li>
                </Link>
              )
          )}
         
         {props.mode === 'login' && (
          <form onSubmit={(e) => searchBook(e)} className="flex items-center">
          <Input type="text" onChange={setQuery} value={query}/>
          <Search strokeWidth={4} size={30} className="relative -left-10 "/>
          </form>
         )}
            
          
          {profile && (
            <div className="flex items-center gap-5">
              <Link href={"/me"}>
                <div className="flex justify-center items-center w-10 h-10 bg-azul-medio rounded-full cursor-pointer text-white uppercase">
                  {user.name && user.name[0]}
                </div>
              </Link>
              <p
                onClick={handleLogout}
                className="text-red-400 cursor-pointer font-semibold"
              >
                SAIR
              </p>
            </div>
          )}
        </ul>
        <ul className={`flex items-center gap-3 md:hidden text-azul-primario`}>

         {props.mode === 'login' && <li onClick={() => setSearchBox(!searchBox)} className={`${liClass} text-2xl`}>{searchBox ? <X className="text-red-500"/> : <Search strokeWidth={3} />}</li>}

          
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`${liClass} text-4xl`}
            >
              {navMenuIcon}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-52 shadow-2xl shadow-black flex flex-col gap-10 p-10 right-3 bg-white"
            >
              
              {navOpt.map(
                (opt, i) =>
                  opt.name && (
                    <Link
                      href={opt.link}
                      key={i}
                    >
                      <li className={liClass}>{opt.name}</li>
                    </Link>
                  )
              )}
              {profile && (
                <div className="flex justify-center items-center gap-3">
                  <Link href={"/me"}>
                    <div className="flex justify-center items-center w-10 h-10 bg-azul-medio rounded-full cursor-pointer text-white uppercase ">
                      {user.name && user.name[0]}
                    </div>
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="text-red-400 cursor-pointer font-semibold"
                  >
                    SAIR
                  </p>
                </div>
              )}
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
