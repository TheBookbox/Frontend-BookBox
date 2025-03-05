"use client";

import { Input } from "@/components/Input/Input";
import { Line } from "@/components/Line";
import { Loading } from "@/components/Loading";
import { Book } from "@/components/MainBooks/MainBooks";
import { useBook } from "@/hook/useGoogleBooks";
import { returnIcon, reviewIcon } from "@/utils/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function BookDetails() {
  const { id } = useParams();

  const[mode, setMode] = useState<'book' | 'writting'>('book')

  const[stars, setStars] = useState<number>(1)
  const[text, setText] = useState<string>('')

  const { book, loading } = useBook(id) || { book: [], loading: false };

  function handleSendReview(e: FormEvent, idBook: string){
    e.preventDefault()

    const data = {
      stars,
      text,
      bookId: idBook
    }

    console.log(data);
    
  }

  function handleCancel(){
    setStars(1)
    setText('')

    setMode('book')
  }

  if (loading) {
    return <Loading />;
  }

  if(mode == 'book'){
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
          <span className="btn border-none bg-azul-medio text-azul-clarinho" onClick={()=>setMode('writting')}>
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
  
                  <p className="mt-5" dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || '' }}></p>
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
  }else{
    return (
      <div>
        
            {book && book.map((book: Book) => (
              <div key={book.id} className="flex flex-col items-center pt-5 z-80 absolute top-0 left-0 w-full h-full bg-white">
        
              <h1 className="text-2xl text-black font-bold mb-5">{book.volumeInfo.title}</h1>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h1 className="my-5 text-black">Fale algo sobre esse livro:</h1>
            <form onSubmit={(e)=>handleSendReview(e, book.id)} className="flex flex-col items-center border w-full p-2 gap-5">
              <Input required placeholder="Nota 1-5" type="number" max={5} min={1} onChange={setStars} className="w-1/2"/>
              <textarea required placeholder="Esse livro..." className="w-full border rounded-md p-4 bg-white" onChange={e => setText(e.target.value)}/>
              <div className="flex gap-5">
                <button type="reset" onClick={handleCancel} className="btn btn-error text-white w-28">Cancelar</button>
                <button type="submit" className="btn btn-success text-white w-28" >Enviar</button>
              </div>
            </form>
              </div>
            ))}
      </div>
          
    
    )
  }


  

  
}
