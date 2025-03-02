import {
  commentIcon,
  editIcon,
  eyeIcon,
  fullHeartLike,
  heartLike,
  linkBook,
  reviewIcon,
  ReviewOptionsIcon,
  shareIcon,
  star,
  trashIcon,
} from "@/utils/icons";

import { Comments, Review, User } from "@/utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Link from "next/link";
import { deleteReview, getReviewById, likeReview } from "@/slices/reviewSlice";
import { Alert } from "../Alert";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { useEffect, useState } from "react";
import { EditReviewModal } from "../EditReviewModal/EditReviewModal";
import { CommentsComponent } from "../Coments/comments";

interface ReviewProps {
  data: any[];
  comments?: any[];
}

export default function ReviewComponent(props: ReviewProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  const { error, success } = useSelector((state: RootState) => state.review);

  // Modais

  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [selectReviewId, setSelectReviewId] = useState<string | null>(null);

  const [EditModal, setEditModal] = useState<boolean>(false);
  const [reviewEditModal, setReviewEditModal] = useState<Review | null>();

  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [idReview, setIdReview] = useState<string | null>(null);

  function confirm(value: boolean) {
    if (value && selectReviewId) {
      dispatch(deleteReview(selectReviewId));
    }

    setConfirmModal(false);
    setSelectReviewId(null);
  }

  function editModal(data: Review) {
    setEditModal(!EditModal);
    setReviewEditModal(data);
  }


  function handleDelete(id: string) {
    setSelectReviewId(id);
    setConfirmModal(true);
  }

  function handleLike(id: string) {
    dispatch(likeReview(id));
  }

  function showComments(data: Review, id: string) {
    setIdReview(id);
    setCommentModal(true);
  }

  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    setIsShareSupported(!!navigator.share);
  }, []);

  const handleShare = async (id: string, data: Review) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.userName} sobre ${data.bookName}`,
          text: `Bookbox | Leia essa review de ${data.userName} sobre ${data.bookName}`,
          url: `/review/${id}`,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Seu navegador não suporta compartilhamento.");
    }
  };

  if (props.data.length == 0)
    return <p className="text-center mb-10">Ainda não há publicações.</p>;

  return (
    <div className="w-full">
      <ConfirmModal
        go="Excluir"
        cancel="Cancelar"
        setVisible={() => setConfirmModal(false)}
        showModal={confirmModal}
        title="Confirme a exclusão."
        description="Essa ação é irreversível"
        confirm={confirm}
      />
      <div className="flex flex-col items-center gap-4 pb-10">
        {/* {error && (
            <Alert
            msg={error}
            type="alert-error"
          />
        )} */}

        {success && (
          <Alert
            msg={success}
            type="alert-success"
          />
        )}
        {props.data.map((review: Review, i) => (
          <>
            <EditReviewModal
              showModal={EditModal}
              setVisible={setEditModal}
              data={reviewEditModal}
            />

            <CommentsComponent
              showModal={commentModal}
              setVisible={setCommentModal}
              review={review}
              idReview={idReview}
            />
            <div className="flex card bg-white w-full shadow-xl font-serifDisplay text-black p-5 rounded-none max-w-[530px] h-auto">
              {user._id == review.userId && (
                <div className="self-end dropdown w-5">
                  <div
                    tabIndex={0}
                    role="button"
                  >
                    {ReviewOptionsIcon}
                  </div>
                  <ul
                    tabIndex={0}
                    className="flex flex-col items-center gap-3 dropdown-content bg-white px-5 py-5 rounded-md shadow-lg font-semibold right-9"
                  >
                    <Link href={`/review/${review._id}`}>
                      <p className="flex justify-around items-center gap-2 cursor-pointer hover:scale-105 px-5 text-black">
                        {eyeIcon} Ver
                      </p>
                    </Link>
                    <p
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center gap-2 cursor-pointer hover:scale-105 px-5 text-red-500"
                    >
                      {trashIcon} Excluir
                    </p>
                    <p
                      onClick={() => editModal(review)}
                      className="flex items-center gap-2 cursor-pointer hover:scale-105 text-black"
                    >
                      {editIcon} Editar
                    </p>
                  </ul>
                </div>
              )}
              <div className="card-body p-5 gap-5">
                <h2 className="flex card-title justify-between">
                  <Link href={`/profile/${review.userId}`}>
                    <span className="flex items-center gap-2">
                      <span className="flex justify-center items-center text-xl bg-azul-medio w-10 h-10 rounded-full text-white">
                        {review.userName[0]}
                      </span>
                      {review.userName}
                    </span>
                  </Link>
                  <div className="text-end font-normal">
                    {new Date().setHours(0, 0, 0, 0) ===
                    new Date(review.createdAt).setHours(0, 0, 0, 0)
                      ? "Hoje"
                      : new Date(review.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </h2>
                <Link
                  href={`/book/${review.bookId}`}
                  className="text-azul-primario"
                >
                  <div className="inline text-azul-medio font-semibold">
                    <p className="flex gap-2">
                      {review.bookName} {linkBook}
                    </p>
                  </div>
                </Link>
                <p className="flex items-center gap-2">
                  <span className="text-yellow-600">{star}</span>
                  {review.stars}/5
                </p>
                <p className="flex font-sans gap-4 max-w-[300px] min-w-full">
                  <span className="self-center">{reviewIcon}</span>
                  {review.text}
                </p>
              </div>
              <figure>
                <img
                  src={review.thumbnail}
                  alt={review.text}
                />
              </figure>
              <div className="flex items-center mt-10 gap-5">
                <div className="flex items-center text-xl gap-1">
                  {user._id && review.likes.includes(user._id) ? (
                    <p className="text-4xl">{fullHeartLike}</p>
                  ) : (
                    <p
                      className="text-4xl cursor-pointer"
                      onClick={() => handleLike(review._id)}
                    >
                      {heartLike}
                    </p>
                  )}
                  <p>{review.likes.length}</p>
                </div>
                <div className="flex items-center text-xl gap-1">
                  <p
                    onClick={() => showComments(review, review._id)}
                    className="text-3xl cursor-pointer text-azul-medio"
                  >
                    {commentIcon}
                  </p>
                  <p>{review.comments.length}</p>
                </div>
                {isShareSupported && (
                  <div
                    className="flex items-center text-xl gap-1"
                    onClick={() => handleShare(review._id, review)}
                  >
                    <p className="text-3xl cursor-pointer text-azul-medio">
                      {shareIcon}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
