'use client'


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { Input } from '@/components/Input/Input';
import { RxButton } from 'react-icons/rx';
import { User } from '@/utils/interfaces';
import { editProfile } from '@/slices/userSlice';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const { user, loading }: { user: User, loading: boolean } = useSelector(
    (state: RootState) => state.user
  );

    const[name, setName] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter()


    useEffect(()=>{
        if(user?.name){
          setName(user.name)
        }

       
        
    },[user])


    function handleEditProfile(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()

      
      dispatch(editProfile(name))

      router.push('/me')

      
    }

  return (
    <div className='flex gap-7 items-center flex-col bg-white w-full py-16'>
      <h1>Edite seu perfil</h1>
        <div className='flex justify-center items-center w-16 h-16 bg-azul-medio mt-8 rounded-full text-white font-bold uppercase'>
          {name[0]}
        </div>

        <div className='container flex justify-center  bg-white'>
            <form onSubmit={handleEditProfile} className='flex flex-col gap-4 w-2/3 items-center max-w-[380px]'>

              <Input type='text' value={name} onChange={setName} min={3} required className={
                `${name.length < 3 ? 'border-red-500 focus:outline-red-400 ' : ''}`
              }/>
              
              <button
              type="submit"
              disabled = {name.length < 3  || loading}
              className="w-full py-3 px-4 rounded-lg bg-azul-medio text-white font-medium hover:bg-azul-escuro focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Atualizar
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Processando...</span>
                </div>
              )}
            </button>
            </form>

        </div>
    </div>
  )
}

export default EditProfile