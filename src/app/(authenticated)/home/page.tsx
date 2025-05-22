"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { getAllReviews } from "@/slices/reviewSlice";

import ReviewComponent from "@/components/Review/Review";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { reviews, hasMore } = useSelector((state: RootState) => state.review);
  const[limit, setLimit] = useState(4)
  const[loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllReviews(limit));
  }, [limit]);


  const loadMoreReviews = () => {
    if (loading) return; // se já estiver carregando, bloqueia
    setLoading(true);
    // Simula requisição com timeout
    setTimeout(() => {
      setLimit((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100) {
        loadMoreReviews();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  // dispara o fetch no useEffect que observa o limit
  useEffect(() => {
    // Dispara fetch quando limit muda
    dispatch(getAllReviews(limit));
  }, [limit]);


  return (
    <div className="flex flex-col justify-center pt-4 bg-white">
       
      {reviews.length == 0 ? (
        <h2>Nenhuma review atualmente.</h2>
      ) : (
        <ReviewComponent data={reviews} />
      )}

      {hasMore && <div className="flex justify-center items-center">
          <span className="w-5 h-7 rounded-full border border-azul-medio animate-spin mb-6"></span>
      </div>}
      
    </div>
  );
}
