'use client'

import { useState } from "react";
import { MainBooks } from "@/components/MainBooks/MainBooks";
import { useGoogleBooks } from "@/hook/useGoogleBooks";
import { LoaderCircle, Plus, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";

const Page = () => {

  const { query } = useParams();
  const queryTrim = decodeURIComponent(query as string)

  const [fetchLimit, setFetchLimit] = useState(5);
  const { books = [], loading } = useGoogleBooks(queryTrim, fetchLimit) || {};

  const handleLoadMore = () => {
    setFetchLimit((prev) => prev + 5);
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-16 bg-azul-grad min-h-screen">
      <div className="w-full max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-azul-clarinho/80 mt-2 max-w-xl mx-auto">
            Exibindo resultados para:
          </p>
          <h1 className="text-4xl md:text-5xl font-serifDisplay text-azul-clarinho font-bold">{queryTrim}</h1>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Desktop: Show both sections */}
          <div className="md:block">
            <MainBooks
              data={books}
              title="Principais resultados"
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </div>


          <div className="w-full flex justify-center mt-5">
            {loading ? (
              <LoaderCircle className="animate-spin text-azul-clarinho"/>
            ) : (
              <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 mt-6 text-azul-clarinho hover:underline"
            >
              Carregar mais <Plus />
            </button>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Page;
