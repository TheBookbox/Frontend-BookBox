"use client";

import { Line } from "../Line";
import { Input } from "../Input/Input";
import { sendIcon } from "@/utils/icons";
import { CommentData, Comments, Review } from "@/utils/interfaces";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { commentReview } from "@/slices/reviewSlice";

interface ConfirmModal {
  idReview: string | null
  showModal: boolean;
  setVisible: (visible: boolean) => void;
  review: Review | undefined;
}

export function CommentsComponent(props: ConfirmModal) {

  const dispatch = useDispatch<AppDispatch>()

  const[commentText, setCommentText] = useState<string>('')

  function handleComment(){
    const commentData:CommentData = {
        idReview: props.idReview,
        text: commentText
    }

    dispatch(commentReview(commentData))

    setCommentText('')
  
    
  }


  return (
    <div
      className={`z-50 ${props.showModal ? "fixed" : "hidden"} w-full h-full`}
    >
      <div
        onClick={() => props.setVisible(false)}
        className={`${
          props.showModal ? "fixed" : "hidden"
        } z-10 w-full h-full top-0 bg-modalBg text-black`}
      ></div>

      <div
        className="z-20 flex flex-col justify-evenly fixed bottom-0 w-full gap-5 opacity-100 rounded-t-xl transition-all duration-150
        
                    md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2  md:max-w-[550px]"
      >
        <div className="bg-white w-full h-[420px] rounded-xl p-5 overflow-auto">
          {props.review?.comments.length == 0 ? (
            <div className="flex justify-center items-center">
              <h1>Nenhum comentário nessa review.</h1>
            </div>
          ) : (
            <div>
              <h1 className="text-center font-bold">Comentários</h1>
              <Line />
              <div className="flex flex-col mt-5">

                {props.review?.comments && props.review.comments?.map((comment, i) => (
                  <div key={i} className="mt-5">
                    
                    <div className="flex items-center">
                      <div className="flex justify-center items-center bg-azul-medio w-14 h-14 rounded-full text-white ">
                        {comment.userName[0]}
                      </div>

                      <div className="flex justify-between w-full pl-4">
                        <Link href={`/profile/${comment.userId}`}>
                            <h1 className="font-semibold">{comment.userName}</h1>
                        </Link>

                        <h1 className="self-end">{new Date().toLocaleDateString("pt-BR") == comment.date ? 'Hoje' : comment.date}</h1>
                        
                      </div>
                    </div>

                    <h1 className="mt-2 pl-5">{comment.text}</h1>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-5 justify-center items-center bottom-48 w-full h-[100px] bg-white rounded-t-xl md:rounded-xl">
          <Input
            value={commentText}
            placeholder="Adicione um comentário"
            type="text"
            onChange={setCommentText}
            autoFocus
            
          />
          <span onClick={handleComment} className="btn bg-black text-azul-primario">{sendIcon}</span>
        </div>
      </div>
    </div>
  );
}
