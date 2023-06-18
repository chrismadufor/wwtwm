"use client";

import { reset, setUser } from "@/redux/features/controlsSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  const onChange = (event: any) => {
    dispatch(setUser(event.target.value))
  }

  return (
    <main className="">
      <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-800 pl-20">
        <p className="text-5xl">Who Wants To Win Some Money?</p>
        <Link href="/question">
          <button className="orange-bg py-3 px-8 mt-8">Start Game</button>
        </Link>
      </div>
      <div className="fixed top-0 right-0">
        <select name="role" onChange={onChange} id="role" className="h-8 w-20 bg-blue-900 text-white pl-2">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </main>
  );
}
