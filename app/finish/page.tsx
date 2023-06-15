"use client";

import { reset } from "@/redux/features/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  let prize = useAppSelector((state) => state.controlsReducer.prize);

  return (
    <main className="">
      <p className="text-4xl">You just won N{prize}</p>
      <Link href="">
        <button
          onClick={() => dispatch(reset())}
          className="orange-bg py-3 px-8 mt-5"
        >
          Back Home
        </button>
      </Link>
    </main>
  );
}
