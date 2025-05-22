"use client"

import type React from "react"
import type { CommentData} from "@/utils/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store"
import { commentReview, getCommentsByIdReview } from "@/slices/reviewSlice"
import { Input } from "../Input/Input"
import { LoaderCircle, MessageSquare, Send, X } from "lucide-react"

interface CommentsModalProps {
  idReview: string | null
  showModal: boolean
  setVisible: (visible: boolean) => void
 
}

export function CommentsComponent(props: CommentsModalProps) {
  const [commentText, setCommentText] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState(false)

  const { comments, commentLoading } = useSelector((state: RootState) => state.review)
  
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (props.showModal) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      setTimeout(() => {
        setIsAnimating(false)
        document.body.style.overflow = ""
      }, 300)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [props.showModal])

  function handleComment() {
    if (!commentText.trim()) return

    const commentData: CommentData = {
      idReview: props.idReview,
      text: commentText,
    }

    dispatch(commentReview(commentData))
    setCommentText("")
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleComment()
    }
  }

  useEffect(()=>{
    dispatch(getCommentsByIdReview(props.idReview as string))
    
  },[props.showModal])



  if (!isAnimating && !props.showModal) return null

  return (
    <div
      className={`fixed inset-0 z-50 ${props.showModal ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      {/* Backdrop */}
      <div onClick={() => props.setVisible(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`
          fixed z-50 bg-white overflow-hidden
          transition-all duration-300 ease-out
          ${props.showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          
          /* Mobile positioning */
          bottom-0 left-0 right-0 rounded-t-xl h-[80vh] max-h-[80vh]
          
          /* Desktop positioning */
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:w-full md:max-w-xl md:h-auto md:max-h-[90vh] md:rounded-xl
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Comentários</h2>
          <button
            onClick={() => props.setVisible(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Comments list */}
        {commentLoading ? (
          <div className="flex justify-center items-center w-full py-10"> 
           <LoaderCircle className="animate-spin"/>

          </div>
        ): (
          <div className="flex-1 overflow-y-auto p-4 h-[calc(80vh-140px)] md:h-[60vh]">
          {!comments?.length ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
              <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-center">Nenhum comentário nesta publicação.</p>
              <p className="text-center text-sm mt-1">Seja o primeiro a comentar!</p>
            </div>
          ) : (
            <div className="space-y-6 ">
              {comments?.map((comment, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-3">
                    {/* User avatar */}
                    <Link href={`/profile/${comment.userId}`}>
                      <div className="flex-shrink-0 flex justify-center items-center bg-azul-medio w-10 h-10 rounded-full text-white shadow-sm group-hover:shadow-md transition-shadow">
                        {comment.userName[0]}
                      </div>
                    </Link>

                    {/* Comment content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <Link
                          href={`/profile/${comment.userId}`}
                          className="font-medium text-gray-900 hover:text-azul-medio transition-colors truncate"
                        >
                          {comment.userName}
                        </Link>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date().toLocaleDateString("pt-BR") === comment.date ? "Hoje" : comment.date}
                        </span>
                      </div>
                      <p className="text-gray-700 break-words">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}

       

        {/* Comment input */}
        <div className="sticky bottom-0 border-t bg-white p-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                disable={commentLoading ? true : false}
                value={commentText}
                placeholder="Adicione um comentário..."
                type="text"
                onChange={setCommentText}
                onKeyDown={handleKeyPress}
                className="w-full pr-10 py-3 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className={`p-3 rounded-full ${
                commentText.trim() ? "bg-azul-medio text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400"
              } transition-colors`}
              aria-label="Enviar comentário"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

