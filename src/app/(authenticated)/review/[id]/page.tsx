'use client'

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { useEffect } from "react";
import { getAllReviews, getReviewById } from "@/slices/reviewSlice";
import ReviewComponent from "@/components/Review/Review";
import { useParams } from "next/navigation";
import { Loading } from "@/components/Loading";

export default function Reviews() {

    const { id } = useParams();
    
    const {review, loading} = useSelector((state: RootState) => state.review)
    const dispatch = useDispatch<AppDispatch>()

    
    useEffect(()=>{
        dispatch(getReviewById(id as string))
    },[])


    if(loading){
        return <Loading/>
    }
    
    return (
        <>
        {review && <ReviewComponent data={[review]}/> }
        </>
    )
}