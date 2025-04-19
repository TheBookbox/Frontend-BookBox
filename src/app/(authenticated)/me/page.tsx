"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { Loading } from "@/components/Loading";
import { User } from "@/utils/interfaces";
import ReviewComponent from "@/components/Review/Review";
import { useEffect } from "react";
import { getAllReviews, getUserReview } from "@/slices/reviewSlice";
import { Line } from "@/components/Line";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  const { user: profile } = useSelector((state: RootState) => state.auth);

  const { reviews, loading } = useSelector((state: RootState) => state.review);


  useEffect(() => {
    if (profile?._id) {
      dispatch(getUserReview(profile._id));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 gap-4 bg-white h-full">

      <div className="flex justify-center items-center w-24 h-24 bg-azul-grad rounded-full">
        <p className="text-azul-clarinho text-2xl">
          {user.name && user.name[0]}
        </p>
        
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-serifDisplay font-bold text-black">{user.name}</h1>
        <span className="border bg-azul-medio px-3 py-1 rounded-lg text-white cursor-pointer">Editar perfil</span>
    </div>
        

      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">Reviews</p>
          <p className="">
            {reviews.length > 999
              ? `${(reviews.length / 1000).toFixed(1)}k`
              : reviews.length}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">Seguidores</p>
          <p className=" ">
            {user.followers && user.followers.length > 999
              ? `${(user.followers.length / 1000).toFixed(1)}k`
              : user.followers && user.followers.length}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">Seguindo</p>
          <p className="">
            {user.following && user.following.length > 999
              ? `${(user.following.length / 1000).toFixed(1)}k`
              : user.following && user.following.length}
          </p>
        </div>
      </div>

      <Line/>

      <div className="w-full">
        <ReviewComponent data={reviews}/>
      </div>
    </div>
  );
}
