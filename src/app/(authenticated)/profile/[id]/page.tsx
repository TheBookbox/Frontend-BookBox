"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { Loading } from "@/components/Loading";
import ReviewComponent from "@/components/Review/Review";
import { useEffect, useState } from "react";
import { getUserReview } from "@/slices/reviewSlice";
import { Line } from "@/components/Line";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/slices/userSlice";
import { Comments } from "@/utils/interfaces";

export default function Profile() {
  const { id } = useParams();
  const router = useRouter()
  
  const dispatch = useDispatch<AppDispatch>();

  const { user: authUser } = useSelector((state: RootState) => state.auth);

  if(id === authUser?._id){
    router.push('/me')

  }
  
  const { profile, loading: profileLoading } = useSelector((state: RootState) => state.user);

  const { reviews, loading: reviewLoading } = useSelector((state: RootState) => state.review);

  useEffect(()=>{
    if (typeof id === 'string') {
      dispatch(getUserById(id));
    } 
  },[id])

  useEffect(() => {
    if (profile?._id) {
      dispatch(getUserReview(profile._id));
    }
  }, [profile]);

  if (profileLoading) {
    return <Loading />;
  }




  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 gap-4 bg-white h-full">

        {profile.following?.some((follow: Comments) => follow.userId === authUser?._id) && <p>Segue você</p>}


      <div className="flex justify-center items-center w-24 h-24 bg-azul-grad rounded-full">
        <p className="text-azul-clarinho text-2xl">
          {profile.name && profile.name[0]}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-serifDisplay font-bold text-black">{profile.name}</h1>

        <span className="border bg-azul-medio px-3 py-1 rounded-lg text-white cursor-pointer">

        {profile.following?.some((follow: Comments) => follow.userId === authUser?._id) ? (
           <span>Seguir</span>
        ): (
          <span className="">Seguindo</span>
        )}


        </span>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">
            Reviews
          </p>
          <p className="">
            {reviews.length > 999
              ? `${(reviews.length / 1000).toFixed(1)}k`
              : reviews.length}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">
            Seguidores
          </p>
          <p className=" ">
            {profile.followers && profile.followers.length > 999
              ? `${(profile.followers.length / 1000).toFixed(1)}k`
              : profile.followers && profile.followers.length}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-serifDisplay text-azul-medio font-extrabold">
            Seguindo
          </p>
          <p className="">
            {profile.following && profile.following.length > 999
              ? `${(profile.following.length / 1000).toFixed(1)}k`
              : profile.following && profile.following.length}
          </p>
        </div>
      </div>

      <Line />

      {reviewLoading ? (
        <div className="flex justify-center items-center">
            Carregando...
        </div>
      ) : (
        <div className="w-full">
        <ReviewComponent data={reviews}/>
      </div>
      )}

      
    </div>
  );
}
