import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { reset as authReset } from "@/slices/authSlice";
import { reset as reviewReset } from "@/slices/reviewSlice";
import { resetMessage } from "@/slices/userSlice";


type Alert = 'alert-error' | 'alert-warning' | 'alert-success' 

interface AlertProps {
    msg: string | null
    type: Alert
}

export function Alert(props: AlertProps) {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
      setTimeout(() => {
          dispatch(authReset())
          dispatch(reviewReset())
          dispatch(resetMessage())
      }, 2000);
  },[])

   


  return (
    <div
      role='alert'
      className={`z-[100] alert ${props.type} fixed top-5 left-5 w-full flex`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 shrink-0 stroke-current text-white`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span className="text-white font-semibold">{props.msg}</span>
    </div>
  );
}
