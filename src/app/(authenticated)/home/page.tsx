"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect } from "react";
import {  User } from "@/utils/interfaces";
import { getAllReviews } from "@/slices/reviewSlice";

import ReviewComponent from "@/components/Review/Review";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user
  );

  const { reviews, loading } = useSelector((state: RootState) => state.review);

  useEffect(() => {
   
    dispatch(getAllReviews());
  }, []);

  return (
    <div className="flex justify-center pt-4">
      {reviews.length == 0 ? (
        <h2>Nenhuma review atualmente.</h2>
      ) : (
        <ReviewComponent data={reviews}/>
      )}
    </div>
  );
}
