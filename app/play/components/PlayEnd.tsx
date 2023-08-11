import React from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { goHome } from '@/redux/features/playSlice';

export default function PlayEnd() {
  const dispatch = useAppDispatch();
  const onGoHome = () => {
    dispatch(goHome())
  }
  return (
    <div className='h-screen flex flex-col py-10'>
        <div className='text-center flex flex-col items-center justify-center h-full'>
            <h1 className="text-2xl font-semibold">Thanks for playing!!</h1>
            <p className='mt-2'>The results will be displayed shortly.</p>
            <button onClick={onGoHome} className="bg-white mt-5 px-5 py-3 uppercase font-semibold blue-text">Back home</button>
        </div>
        <p className='italic text-center font-semibold'>Sponsored by Shelta</p>
    </div>
  )
}
