"use client";

import { useEffect, useState } from "react";
import { Line } from "../Line";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { editReview, getReviewById, reset } from "@/slices/reviewSlice";
import { Input } from "../Input/Input";
import { Review, ReviewEdit } from "@/utils/interfaces";


interface EditReviewModalProps {
  data: Review | null;

  showModal: boolean;
  setVisible: (visible: boolean) => void;
}

export function EditReviewModal(props: EditReviewModalProps) {
  const [stars, setStars] = useState<number | undefined>();
  const [text, setText] = useState<string | undefined>();

  console.log(props.data);
  

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setStars(props.data?.stars);
    setText(props.data?.text);

  }, [props.data]);

  const handleEdit = () => {
    const data: ReviewEdit = {
      _id: props.data?._id,
      stars,
      text,
    };

    dispatch(editReview(data));

    setTimeout(()=>{
        dispatch(reset())
    }, 2000)

    props.setVisible(false)

  };

  return (
    <div className={`z-50 ${props.showModal ? 'fixed' : 'hidden'} w-full h-full`}>

        <div onClick={() => props.setVisible(!props.showModal)}  className={`fixed z-40 w-full h-full top-0 bg-modalBg text-black border`}>
        </div>
          <div
            className="z-50 flex flex-col justify-evenly fixed bottom-0 bg-white w-full h-auto opacity-100 rounded-t-xl p-5 transition-all duration-150
                gap-5
                md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2 md:rounded-lg md:max-w-[550px]"
          >

            
            {props.data && 
              <>
                <div>
                  <h1 className="text-2xl font-bold">{props.data && props.data.bookName}</h1>
                </div>
                <div className="flex flex-col items-center gap-5 ">
                  <Input
                    value={stars}
                    placeholder="0 a 5"
                    type="number"
                    onChange={setStars}
                    min={0}
                    max={5}
                  />
                  <textarea onChange={e => setText(e.target.value)} className="textarea textarea-bordered w-full max-w-xs" placeholder="Bio" value={text}></textarea>
                 
                </div>
                <div className="flex justify-center gap-5 ">
                  <div className="btn btn-error text-white" onClick={() => props.setVisible(false)} >Cancelar</div>
                  <div
                    onClick={handleEdit}
                    className="btn btn-success text-white"
                  >
                    Editar
                  </div>
                </div>
              </>
            }
          
        </div>
    </div>
  );
}
