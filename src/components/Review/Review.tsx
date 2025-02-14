import {
  author,
  commentIcon,
  expand,
  fullHeartLike,
  heartLike,
  linkBook,
  reviewIcon,
  star,
} from "@/utils/icons";
import { Review, User } from "@/utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";

interface ReviewProps {
  data: any[];
}

export default function ReviewComponent(props: ReviewProps) {
  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  if(props.data.length == 0) return <p className="mb-10">Ainda não há publicações.</p>

  return (
    <div className="flex flex-col items-center gap-4 pb-10 max-w-[550px]">
      {props.data.map((review: Review, i) => (
        <div
          key={i}
          className="card bg-white w-[90%] shadow-xl p-3 font-serifDisplay text-black"
        >
          <div className="text-end">
            {new Date().setHours(0, 0, 0, 0) ===
            new Date(review.createdAt).setHours(0, 0, 0, 0)
              ? "Hoje"
              : new Date(review.createdAt).toLocaleDateString("pt-BR")}
          </div>
          <div className="card-body p-5 gap-5">
            <h2 className="card-title">
              <span className="text-3xl ">{author}</span> {review.userName}
            </h2>

            <Link
              href={`/book/${review.bookId}`}
              className="text-azul-primario"
            >
              <div className="inline text-azul-medio font-semibold">
                <p className="flex gap-2">{review.bookName} {linkBook}</p> 
                
              </div>
            </Link>
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

          <div
            tabIndex={0}
            className="collapse bg-azul-medio  text-white mt-3"
          >
            <div className="collapse-title text-xl font-medium">
              <div className="flex justify-between items-center ">
                <p className="flex items-center gap-2">
                  {commentIcon} {review.comments.length}
                </p>
                <p>{expand}</p>
              </div>
            </div>

            <div className="collapse-content w-full bg-white border text-black">
              {review.comments.length == 0 ? (
                <p className="pt-2">Seja o primeiro a comentar!</p>
              ) : (
                <div>
                  {review.comments.map((comment, i) => (
                    <div
                      key={i}
                      className="flex flex-col mt-5 border-b border-black pb-4"
                    >
                      <p className="font-semibold">{comment.userName}:</p>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
