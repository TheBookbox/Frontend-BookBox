"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect } from "react";
import { profile } from "@/slices/userSlice";
import { Review, User } from "@/utils/interfaces";
import { getAllReviews } from "@/slices/reviewSlice";
import { author, commentIcon, expand, fullHeartLike, heartLike, reviewIcon, star } from "@/utils/icons";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  const { reviews, loading } = useSelector((state: RootState) => state.review);

  useEffect(() => {
    dispatch(profile());
    dispatch(getAllReviews());
  }, []);

  return (
    <div className="flex justify-center pt-4">
      {reviews.length == 0 ? (
        <h2>Nenhuma review atualmente.</h2>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review: Review, i) => (
            <>
              <div className="card bg-base-100 w-96 shadow-xl p-3 font-serifDisplay">
              <div className="text-end">
                  {new Date().setHours(0, 0, 0, 0) ===
                  new Date(review.createdAt).setHours(0, 0, 0, 0)
                    ? "Hoje"
                    : new Date(review.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="card-body p-5 gap-5">
                  <h2 className="card-title">
                    <span className="text-3xl ">{author}</span>{" "}
                    {review.userName}
                  </h2>

                  <p className="text-azul-medio font-semibold">
                    {review.bookName}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-yellow-600">{star}</span>
                    {review.stars}/5
                  </p>
                  <p className="flex font-sans gap-4">
                    <span>{reviewIcon}</span>
                    {review.text}
                  </p>
                </div>
                <figure>
                  <img
                    src={review.thumbnail}
                    alt={review.text}
                  />
                </figure>

                

                <div className="flex items-center text-xl mt-10 gap-3">
                        {!review.likes.includes(user._id) ? (
                            <p className="text-4xl cursor-pointer">{heartLike}</p>

                        ) : (
                            <p className="text-4xl">{fullHeartLike}</p>

                        )}
                    

                    <p>{review.likes.length}</p>
                </div>

                <div tabIndex={0} className="collapse bg-azul-medio  text-white mt-3">
                  <div className="collapse-title text-xl font-medium">
                    <div className="flex justify-between items-center ">
                        <p className="flex items-center gap-2">{commentIcon} {review.comments.length}</p>
                        <p>{expand}</p>
                    </div>
                  </div>
                  <div className="collapse-content w-full bg-azul-clarinho text-black">
                        {review.comments.length == 0 ? (
                            <p>Seja o primeiro a comentar!</p>
                        ) : (
                            <div>
                                {review.comments.map((comment) => (
                                    <div className="flex flex-col mt-5 border-b border-black pb-4">
                                        <p className="font-semibold">{comment.userName}:</p>
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
