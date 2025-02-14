"use client";

import { Line } from "@/components/Line";
import { Loading } from "@/components/Loading";
import { Book } from "@/components/MainBooks/MainBooks";
import { useBook } from "@/hook/useGoogleBooks";
import { returnIcon, reviewIcon } from "@/utils/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BookDetails() {
  const { id } = useParams();

  const { book, loading } = useBook(id) || { book: [], loading: true };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`flex flex-col items-center pt-10 border bg-white text-black pb-10`}
    >
      <div className="flex justify-between gap-4 mb-4 md:hidden">
        <Link href={"/home"}>
          <span className="btn border-none bg-orange-500 text-white">
            {returnIcon} Voltar{" "}
          </span>
        </Link>
        <span className="btn border-none bg-azul-medio text-azul-clarinho">
          Avaliar {reviewIcon}
        </span>
      </div>
      {book &&
        book.map((book: Book) => (
          <div
            key={book.id}
            className="flex w-[90%] border border-gray-950 rounded-md max-w-[940px] bg-white p-5"
          >
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <img
                className="w-40 h-60 "
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <div className="flex flex-col ">
                <p className="text-azul-primario uppercase font-serifDisplay font-extrabold text-3xl">
                  {book.volumeInfo.title}
                </p>
                <p>{book.volumeInfo.authors}</p>

                <p className="mt-5">{book.volumeInfo.description}</p>
              </div>
            </div>
          </div>
        ))}

      <div className="hidden justify-between gap-4 mt-4 md:flex">
        <Link href={"/home"}>
          <span className="btn border-none bg-orange-500 text-white">
            {returnIcon} Voltar{" "}
          </span>
        </Link>
        <span className="btn border-none bg-azul-medio text-azul-clarinho">
          Avaliar {reviewIcon}
        </span>
      </div>

      <Line />

      <div className="flex flex-col items-center w-[90%]">
        <h1 className="self-start text-xl font-serifDisplay text-az">
          Reviews dos leitores
          <span className="text-azul-primario text-5xl">.</span>
        </h1>
        <p>Em breve</p>
      </div>
    </div>
  );
}
