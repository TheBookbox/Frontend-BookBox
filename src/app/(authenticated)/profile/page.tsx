'use client'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store"
import { Loading } from "@/components/Loading"
import { User } from "@/utils/interfaces"
import ReviewComponent from "@/components/Review/Review"
import { useEffect } from "react"
import { getUserReview } from "@/slices/reviewSlice"

export default function Profile(){

    const dispatch = useDispatch<AppDispatch>();

    const { user }: { user: User } = useSelector(
      (state: RootState) => state.user
    );
  
    const { reviews, loading } = useSelector((state: RootState) => state.review);
  
    useEffect(() => {
     
      dispatch(getUserReview(user._id));
    }, []);
  
    
    if(loading){
        return <Loading/>
    }

    return (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
            <div className="flex justify-center items-center w-24 h-24 bg-azul-grad rounded-full">
                <p className="text-azul-clarinho text-2xl">{user.name && user.name[0]}</p>
            </div>
            <div>
                <h2>{user.name}</h2>
            </div>

            <h2>Suas reviews: {reviews.length}</h2>

            <div>
               <ReviewComponent data={reviews}/>
            </div>

    
        </div>
    )
}