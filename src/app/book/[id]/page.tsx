"use client"

import { Input } from "@/components/Input/Input"
import { Line } from "@/components/Line"
import { Loading } from "@/components/Loading"
import type { Book } from "@/components/MainBooks/MainBooks"
import { useBook } from "@/hook/useGoogleBooks"
import { returnIcon, reviewIcon } from "@/utils/icons"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../store"
import { insertReview } from "@/slices/reviewSlice"
// import { Star } from "lucide-react"

import { FaStar } from "react-icons/fa";

export default function BookDetails() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [mode, setMode] = useState<"book" | "writting">("book")
  const [stars, setStars] = useState<number>(1)
  const [text, setText] = useState<string>("")
  const { book, loading } = useBook(id) || { book: [], loading: false }
  const { loading: reviewLoading } = useSelector((state: RootState) => state.review)
  const { user } = useSelector((state: RootState) => state.auth);


 

  function handleSendReview(e: FormEvent, idBook: string) {
    e.preventDefault()

    const data = {
      stars,
      text,
      bookId: idBook,
    }

    dispatch(insertReview(data))
    router.push("/home")
  }

  function handleCancel() {
    setStars(1)
    setText("")
    setMode("book")
  }

  if (loading) {
    return <Loading />
  }

  if (mode === "book") {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Mobile Navigation */}
          <div className="flex justify-between gap-4 mb-6 md:hidden">
            <Link href="/">
              <span className="inline-flex items-center px-4 py-2 rounded-md bg-orange-500 text-white font-medium text-sm shadow-sm hover:bg-orange-600 transition-colors">
                {returnIcon} Voltar
              </span>
            </Link>
            {user && (
              <button
              onClick={() => setMode("writting")}
              className="inline-flex items-center px-4 py-2 rounded-md bg-azul-medio text-azul-clarinho font-medium text-sm shadow-sm hover:bg-blue-700 transition-colors"
            >
              Avaliar {reviewIcon}
            </button>
            )}
            
          </div>

          {/* Book Details */}
          {book &&
            book.map((book: Book) => (
              <div
                key={book.id}
                className="w-full border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden mb-8"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <img
                        className="w-48 h-auto object-cover rounded-md shadow-sm"
                        src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg"}
                        alt={book.volumeInfo.title}
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-azul-primario font-serifDisplay">
                        {book.volumeInfo.title}
                      </h1>
                      <p className="text-lg text-gray-700 font-medium">{book.volumeInfo.authors?.join(", ")}</p>
                      <div className="prose prose-sm max-w-none mt-4">
                        <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || "" }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between gap-4 my-8">
            <Link href="/">
              <span className="inline-flex items-center px-4 py-2 rounded-md bg-orange-500 text-white font-medium shadow-sm hover:bg-orange-600 transition-colors">
                {returnIcon} Voltar
              </span>
            </Link>
          {user && (
              <button
              onClick={() => setMode("writting")}
              className="inline-flex items-center px-4 py-2 rounded-md bg-azul-medio text-azul-clarinho font-medium shadow-sm hover:bg-blue-700 transition-colors"
            >
              Avaliar {reviewIcon}
            </button>
          )}
          </div>

          <Line />

          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold font-serifDisplay mb-4">
              Reviews dos leitores
              <span className="text-azul-primario text-4xl">.</span>
            </h2>
            <div className="text-center py-8 text-gray-500">
              <p>Em breve</p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {book &&
            book.map((book: Book) => (
              <div key={book.id} className="flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{book.volumeInfo.title}</h1>

                <div className="w-32 h-48 mb-6">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg"}
                    alt={book.volumeInfo.title}
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                </div>

                <h2 className="text-xl font-medium text-gray-800 mb-6">Fale algo sobre esse livro:</h2>

                <form
                  onSubmit={(e) => handleSendReview(e, book.id)}
                  className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <div className="mb-6">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                      Avaliação (1-5 estrelas)
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setStars(value)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            className={`w-8 h-8 ${value <= stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                    </div>
                    
                  </div>

                  <div className="mb-6">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                      Sua opinião
                    </label>
                    <textarea
                      id="review"
                      required
                      placeholder="Esse livro..."
                      className="w-full min-h-[150px] p-3 border rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={reviewLoading}
                    >
                      {reviewLoading ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </form>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

