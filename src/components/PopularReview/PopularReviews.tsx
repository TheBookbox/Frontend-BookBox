"use client"

import { useEffect, useState } from "react"
import { api } from "@/utils/config"
import { Heart, MessageCircle, Star, TrendingUp } from "lucide-react"
import type { Review } from "@/utils/interfaces"
import { Line } from "../Line"

interface PopularReviewsProps {
  title: string
  limit?: number
}

export default function PopularReview(props: PopularReviewsProps) {
  const [reviewsData, setReviewsData] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(limit: number | undefined) {
      setIsLoading(true)
      try {
        const response = await fetch(api + `/review/popular?limit=${limit ? limit : 5}`)
        const data = await response.json()
        setReviewsData(data)
      } catch (error) {
        console.error("Error fetching popular reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData(props.limit)
  }, [props.limit])

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 w-full px-2 sm:px-4">
      <h1 className="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-serifDisplay text-azul-clarinho font-bold text-center">
        {props.title} <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
      </h1>

      <div className="popularContainer w-full max-w-[445px] sm:max-w-[500px]">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : reviewsData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No reviews available</div>
        ) : (
          reviewsData.map((item, index) => (
            <div key={item._id || index} className="review-item">
              <div className="flex flex-col px-2 sm:px-5 py-3 sm:py-4">
                {/* Header with book title and user info */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-0">
                  <div className="order-2 sm:order-1">
                    <h2 className="font-bold text-base sm:text-lg">{item.bookName}</h2>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < item.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
                    <div className="flex justify-center items-center text-base sm:text-lg font-medium bg-azul-medio w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white shadow-sm transition-shadow">
                      {item.userName[0]}
                    </div>
                    <h4 className="text-sm sm:text-base">{item.userName}</h4>
                  </div>
                </div>

                {/* Review content with book thumbnail and text */}
                <div className="flex items-start gap-3 sm:gap-5 mt-2 sm:mt-3">
                  {item.thumbnail && (
                    <div className="flex-shrink-0 w-12 sm:w-14 h-16 sm:h-20">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={`Capa do livro ${item.bookName}`}
                        className="h-full w-full object-cover rounded-md shadow-sm"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base line-clamp-3 sm:line-clamp-none mb-1 sm:mb-2">{item.text}</p>
                    <div className="flex gap-3 sm:gap-5 mt-1">
                      <p className="flex items-center gap-1 text-xs sm:text-sm">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                        {item.likes.length}
                      </p>
                      <p className="flex items-center gap-1 text-xs sm:text-sm">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-azul-medio" />
                        {item.comments.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Line />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
