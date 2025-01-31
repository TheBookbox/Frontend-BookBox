import { navMenuIcon, SearchIcon } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { logout, reset } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { User } from "@/utils/interfaces";

export function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {user: profile, loading } = useSelector((state: RootState) => state.auth);
  const {user}: {user: User} = useSelector((state: RootState) => state.user)

  const navOpt = [
    { name: "POPULARES", link: "/popular/all" },
    { name: "LIVROS", link: "" },
    { name: "CRIAR CONTA", link: "/register" },
    { name: "LOGIN", link: "/login" },
  ];

  if (profile) {
    navOpt[2] = { name: "", link: "" };
    navOpt[3] = { name: "", link: "" };
  }

  const liClass =
    "cursor-pointer hover:text-azul-medio hover:bg-gray-300 p-2 rounded-lg";

  function handleLogout() {
    dispatch(logout());
    dispatch(reset());

    router.push("/");
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-white flex items-center justify-between w-full h-[105px] px-8 lg:justify-around md:h-[145px] select-none border-b">
      <Link href={"/"}>
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
        {navOpt.map((opt, i) => (
         
            opt.name && (
              <Link href={opt.link} key={i}>
                <li className={liClass}>{opt.name}</li>
              </Link>
            )
          
        ))}

        <li className={`${liClass} text-3xl`}>{SearchIcon}</li>

        {profile && (
          <div className="flex items-center gap-5" >
            <Link href={"/profile"}>
              <div className="flex justify-center items-center w-10 h-10 bg-azul-medio rounded-full cursor-pointer text-white ">
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
        <li className={`${liClass} text-2xl`}>{SearchIcon}</li>

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
            {navOpt.map((opt, i) => (
                
                opt.name && (
                  <Link
                    href={opt.link}
                    key={i}
                  >
                    <li className={liClass}>{opt.name}</li>
                  </Link>
                )
          
            ))}

            {profile && (
              <div className="flex justify-center items-center gap-3">
                <Link href={"/profile"}>
                  <div className="flex justify-center items-center w-10 h-10 bg-azul-medio rounded-full cursor-pointer text-white ">
                    
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
  );
}
