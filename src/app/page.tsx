"use client";
import { Hero } from "@/components/Hero/Hero";
import { Line } from "@/components/Line";
import { MainBooks } from "@/components/MainBooks/MainBooks";
import { Cta } from "@/components/CTA/Cta";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useGoogleBooks } from "@/hook/useGoogleBooks";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import PopularReview from "@/components/PopularReview/PopularReviews";
import PopularUsers from "@/components/PopularUsers/PopularUsers";
import { Navbar } from "@/components/Navbar/Navbar";

export default function Home() {

  const router = useRouter();

  const { books: BestSeller = [], loading: BestSellerLoad } =
    useGoogleBooks(
      "inauthor:Machado%de%Assis&langRestrict=pt&orderBy=relevance",
      6
    ) || {};

  const [checkingAuth, setCheckingAuth] = useState(false);

  useEffect(() => {
    const cookies = Cookies.get("user");
    const userCookies = cookies ? JSON.parse(cookies) : null;

    if (userCookies) {
      setCheckingAuth(true)
      router.push("/home");
    } else {
      setCheckingAuth(false);
    }
  }, []);


  

  if ( BestSellerLoad || checkingAuth) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white">
      <Navbar mode="without login"/>
      <div>
        <Hero />
      </div>

      <main className="bg-azul-grad w-full h-full pt-20">
        <Line />

        <div className="mt-6 p-4">
          <div className="">
            <MainBooks
              data={BestSeller}
              title="Machado de Assis"
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </div>

        
        </div>
        <Line />

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
          <PopularReview title="Reviews Populares" limit={3}/>
          <span className="hidden bg-[#1C2738] w-0.5 lg:block"></span>
         <PopularUsers title="Usuários Populares"/>
        </div>
        <div>


     
          <Cta />
        </div>
      </main>
    </div>
  );
}
