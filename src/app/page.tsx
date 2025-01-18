import { Hero } from "@/components/Hero/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { Main } from "@/components/Main/Main";

export default function Home() {
  return (
    <div className="w-full bg-white">

      <Navbar/>
      
          <Hero/>
          <div className="bg-azul-grad w-full h-screen pt-20">
              <span className="block m-auto w-[80%] h-[0.1px] bg-[#1C2738]"></span>
          </div>
        
    </div> 
   
  );
}
