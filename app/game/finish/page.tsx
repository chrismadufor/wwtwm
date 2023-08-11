"use client";

import { questionReset, reset } from "@/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router =  useRouter()
  const dispatch = useAppDispatch();
  let prize = useAppSelector((state: any) => state.controlsReducer.prize);
  const resetGame = () => {
    router.push('')
  }
  useEffect(() => {
    dispatch(questionReset());
  }, [dispatch])
  return (
    <main className="min-h-screen blue-bg flex flex-col items-center justify-center">
      <p className="text-5xl">You just won <span className="orange font-semibold">₦{prize}</span></p>
      <button
        onClick={resetGame}
        className="orange-bg py-3 px-8 mt-8"
      >
        Back Home
      </button>
    </main>
  );
}
