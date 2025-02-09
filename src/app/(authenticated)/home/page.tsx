"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect } from "react";
import { getAllReviews } from "@/slices/reviewSlice";

import ReviewComponent from "@/components/Review/Review";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();


  const { reviews, loading } = useSelector((state: RootState) => state.review);
  const { user } = useSelector((state: RootState) => state.user);
  

  useEffect(() => {
    dispatch(getAllReviews());
    
  }, []);

  return (
    <div className="flex justify-center pt-4 bg-white">
      {reviews.length == 0 ? (
        <h2>Nenhuma review atualmente.</h2>
      ) : (
        <ReviewComponent data={reviews}/>
      )}
    </div>
  );
}
