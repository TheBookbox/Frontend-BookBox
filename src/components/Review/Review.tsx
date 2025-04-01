"use client"

import {
  commentIcon,
  editIcon,
  eyeIcon,
  fullHeartLike,
  heartLike,
  linkBook,
  reviewIcon,
  shareIcon,
  trashIcon,
} from "@/utils/icons"

import type { Review, User } from "@/utils/interfaces"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store"
import Link from "next/link"
import { deleteReview, likeReview } from "@/slices/reviewSlice"
import { Alert } from "../Alert"
import { ConfirmModal } from "../ConfirmModal/ConfirmModal"
import { useEffect, useState } from "react"
import { EditReviewModal } from "../EditReviewModal/EditReviewModal"
import { CommentsComponent } from "../Coments/comments"

import { MoreHorizontal, Star } from "lucide-react"

interface ReviewProps {
  data: any[]
  comments?: any[]
}

export default function ReviewComponent(props: ReviewProps) {
  const dispatch = useDispatch<AppDispatch>()

  const { user }: { user: User } = useSelector((state: RootState) => state.user)

  const { error, success } = useSelector((state: RootState) => state.review)

  // Modals
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [selectReviewId, setSelectReviewId] = useState<string | null>(null)

  const [EditModal, setEditModal] = useState<boolean>(false)
  const [reviewEditModal, setReviewEditModal] = useState<Review | null>()

  const [commentModal, setCommentModal] = useState<boolean>(false)
  const [idReview, setIdReview] = useState<string | null>(null)
  const [data, setData] = useState<Review | undefined>()
  const [isShareSupported, setIsShareSupported] = useState(false)

  useEffect(() => {
    setIsShareSupported(!!navigator.share)
  }, [])

  function confirm(value: boolean) {
    if (value && selectReviewId) {
      dispatch(deleteReview(selectReviewId))
    }

    setConfirmModal(false)
    setSelectReviewId(null)
  }

  function editModal(data: Review) {
    setEditModal(!EditModal)
    setReviewEditModal(data)
  }

  function handleDelete(id: string) {
    setSelectReviewId(id)
    setConfirmModal(true)
  }

  function handleLike(id: string) {
    dispatch(likeReview(id))
  }

  function showComments(data: Review, id: string) {
    setIdReview(id)
    setCommentModal(true)
    setData(data)
  }

  const handleShare = async (id: string, data: Review) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.userName} sobre ${data.bookName}`,
          text: `Bookbox | Leia essa review de ${data.userName} sobre ${data.bookName}`,
          url: `/review/${id}`,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      alert("Seu navegador não suporta compartilhamento.")
    }
  }

  if (props.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-5xl mb-4">{reviewIcon}</div>
        <p className="text-center text-lg">Ainda não há publicações.</p>
      </div>
    )

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ConfirmModal
        go="Excluir"
        cancel="Cancelar"
        setVisible={() => setConfirmModal(false)}
        showModal={confirmModal}
        title="Confirme a exclusão."
        description="Essa ação é irreversível"
        confirm={confirm}
      />

      <EditReviewModal showModal={EditModal} setVisible={setEditModal} data={reviewEditModal || null} />

      <CommentsComponent showModal={commentModal} setVisible={setCommentModal} review={data} idReview={idReview} />

      {success && <Alert msg={success} type="alert-success" />}

      <div className="flex flex-col items-center gap-6 pb-10">
        {props.data.map((review: Review) => (
          <div
            key={review._id}
            className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 font-serifDisplay text-black"
          >
            {/* Header with user info and options */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                {/* User info and date */}
                <Link href={`/profile/${review.userId}`} className="group">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center text-lg font-medium bg-azul-medio w-10 h-10 rounded-full text-white shadow-sm group-hover:shadow-md transition-shadow">
                      {review.userName[0]}
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-azul-medio transition-colors">{review.userName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date().setHours(0, 0, 0, 0) === new Date(review.createdAt).setHours(0, 0, 0, 0)
                          ? "Hoje"
                          : new Date(review.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Options dropdown for user's own reviews */}
                {user._id === review.userId && (
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                    <ul tabIndex={0} className="dropdown-content bg-white py-2 rounded-md shadow-lg w-36 z-10 mt-1">
                      <li>
                        <Link
                          href={`/review/${review._id}`}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600">{eyeIcon}</span>
                          <span>Ver</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => editModal(review)}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600">{editIcon}</span>
                          <span>Editar</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-500 hover:bg-gray-50 transition-colors"
                        >
                          <span>{trashIcon}</span>
                          <span>Excluir</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Book info and review content */}
            <div className="p-4">
              {/* Book title with link */}
              <Link href={`/book/${review.bookId}`} className="inline-block mb-3 group">
                <div className="flex items-center gap-2 text-azul-medio font-medium group-hover:underline">
                  {review.bookName} <span>{linkBook}</span>
                </div>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">{review.stars}/5</span>
              </div>

              {/* Review text */}
              <Link href={`/review/${review._id}`}>
                <div className="font-sans text-gray-800 mb-4 hover:text-gray-600 transition-colors">
                  <p className="flex gap-3 items-start">
                    <span className="text-azul-medio mt-1 flex-shrink-0">{reviewIcon}</span>
                    <span>{review.text}</span>
                  </p>
                </div>
              </Link>

              {/* Book cover image */}
              {review.thumbnail && (
                <div className="mt-3 mb-4">
                  <img
                    src={review.thumbnail || "/placeholder.svg"}
                    alt={`Capa do livro ${review.bookName}`}
                    className="max-h-48 object-contain mx-auto rounded-md shadow-sm"
                  />
                </div>
              )}

              {/* Interaction buttons */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                {/* Like button */}
                <button
                  onClick={() => handleLike(review._id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <span className="text-2xl">
                    {user._id && review.likes.includes(user._id) ? fullHeartLike : heartLike}
                  </span>
                  <span className="text-sm font-medium">{review.likes.length}</span>
                </button>

                {/* Comment button */}
                <button
                  onClick={() => showComments(review, review._id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-azul-medio transition-colors"
                >
                  <span className="text-2xl">{commentIcon}</span>
                  <span className="text-sm font-medium">{review.comments.length}</span>
                </button>

                {/* Share button */}
                {isShareSupported && (
                  <button
                    onClick={() => handleShare(review._id, review)}
                    className="flex items-center gap-2 text-gray-600 hover:text-azul-medio transition-colors"
                  >
                    <span className="text-2xl">{shareIcon}</span>
                    <span className="text-sm font-medium">Compartilhar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

