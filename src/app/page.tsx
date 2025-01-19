
import { Hero } from "@/components/Hero/Hero";
import { Line } from "@/components/Line";
import { MainBooks } from "@/components/MainBooks/MainBooks";
import { Navbar } from "@/components/Navbar/Navbar";
import {books, Genres} from '../data/MainData'

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Navbar />

      <div>
        <Hero />
      </div>

      <main className="bg-azul-grad w-full h-full pt-20">
        <Line />

        <div className="mt-5">
          <MainBooks title={'Brasileiros famosos'} data={books} linkMore={''}/>
          <Line />
          <MainBooks title={'Por gênero'} data={Genres} linkMore={''}/>
        </div>

        
      </main>
    </div>
  );
}
