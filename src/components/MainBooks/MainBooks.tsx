"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookIcon } from "lucide-react"
import type { ReactNode } from "react"

export interface Book {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    description?: string
    imageLinks?: {
      thumbnail?: string
    }
  }
}

interface MainBooksProps {
  title: string
  data: Book[]
  icon?: ReactNode
}

export function MainBooks(props: MainBooksProps) {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {props.icon && <span className="text-azul-primario">{props.icon}</span>}
          <h2 className="text-azul-clarinho font-bold text-xl md:text-2xl">{props.title}</h2>
        </div>
       
      </div>

      {/* Books Grid */}
      <div className="flex-wrap flex justify-center gap-4 md:gap-6  max-w-7xl mx-auto  lg:max-w-7xl lg:gap-10">
  {props.data?.map((book, i) => (
    <Link
      key={i}
      href={`/book/${book.id}`}
      className="group w-[calc(33.333%-12px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-14px)] lg:w-[calc(25%-14px)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-azul-escuro/20 shadow-md transition-all duration-300 group-hover:shadow-xl">
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <Image
            src={book.volumeInfo.imageLinks.thumbnail || "/placeholder.svg"}
            alt={book.volumeInfo.title}
            fill
            sizes="(max-width: 768px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <BookIcon className="w-10 h-10 text-azul-primario mb-2" />
            <p className="text-azul-clarinho text-sm line-clamp-3">{book.volumeInfo.title}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-azul-escuro/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex flex-col items-center w-full bg-black p-3">
            <h3 className="text-azul-clarinho font-medium text-sm line-clamp-2">{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && (
              <p className="text-azul-primario text-xs mt-1 line-clamp-1">{book.volumeInfo.authors.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

    </div>
  )
}

