"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store"
import { editReview, reset } from "@/slices/reviewSlice"
import { Input } from "../Input/Input"
import type { Review, ReviewEdit } from "@/utils/interfaces"
import { FaStar as Star } from "react-icons/fa";
import { IoClose as X } from "react-icons/io5";

interface EditReviewModalProps {
  data: Review | null
  showModal: boolean
  setVisible: (visible: boolean) => void
}

export function EditReviewModal(props: EditReviewModalProps) {
  const [stars, setStars] = useState<number | undefined>()
  const [text, setText] = useState<string | undefined>()
  const [isAnimating, setIsAnimating] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (props.showModal) {
      setIsAnimating(true)
    } else {
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [props.showModal])

  useEffect(() => {
    setStars(props.data?.stars)
    setText(props.data?.text)
  }, [props.data])

  const handleEdit = () => {
    const data: ReviewEdit = {
      _id: props.data?._id,
      stars,
      text,
    }

    dispatch(editReview(data))

    setTimeout(() => {
      dispatch(reset())
    }, 2000)

    props.setVisible(false)
  }

  const closeModal = () => {
    props.setVisible(false)
  }

  if (!isAnimating && !props.showModal) return null

  return (
    <div
      className={`fixed inset-0 z-50 ${props.showModal ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      {/* Backdrop */}
      <div onClick={closeModal} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`
          fixed z-50 bg-white rounded-lg shadow-xl overflow-hidden
          w-[95%] max-w-md mx-auto
          transition-all duration-300 ease-out
          ${props.showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          
          /* Mobile positioning */
          bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl rounded-b-none
          
          /* Desktop positioning */
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:bottom-auto
        `}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {props.data && (
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Editar avaliação</h2>
              <p className="text-sm text-gray-500 mt-1">Atualize sua opinião sobre este livro</p>
            </div>

            {/* Book title */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                {props.data.bookName}
              </h3>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sua avaliação</label>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStars(value)}
                    className="focus:outline-none transition-all duration-150"
                  >
                    <Star
                      className={`w-8 h-8 ${value <= (stars || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>

              {/* Numeric input */}
              <div className="relative">
                <Input
                  value={stars}
                  placeholder="0 a 5"
                  type="number"
                  onChange={setStars}
                  min={0}
                  max={5}
                  className="w-full p-2 border rounded-md"
                />
                <span className="text-xs text-gray-500 absolute right-2 top-1/2 -translate-y-1/2">estrelas</span>
              </div>
            </div>

            {/* Review text */}
            <div className="mb-6">
              <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2 ">
                Sua opinião
              </label>
              <textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                placeholder="Compartilhe seus pensamentos sobre este livro..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

