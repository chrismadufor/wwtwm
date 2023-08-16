"use client";

import { reset, setUser } from "@/redux/features/controlsSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const role = searchParams.get("role");
  const password = searchParams.get("password");
  useEffect(() => {
    dispatch(reset());
    if (!role) router.push("/");
    else if (role === "player" && password !== "wwtwmplayer8") {
      alert("Password is incorrect for player");
      router.push("/");
    } else if (role === "host" && password !== "wwtwmhost3") {
      alert("Password is incorrect for host");
      router.push("/");
    } else if (role === "admin" && password !== "wwtwmadmin5") {
      alert("Password is incorrect for admin");
      router.push("/");
    } else if (role === "admin" && password === "wwtwmadmin5") {
      dispatch(setUser("admin"));
    } else if (
      (role === "host" && password === "wwtwmhost3") ||
      (role === "player" && password === "wwtwmplayer8")
    ) {
      dispatch(setUser(role));
      router.push("/game/question");
    } else router.push("/");
  }, [dispatch]);

  // const onChange = (event: any) => {
  //   dispatch(setUser(event.target.value))
  // }

  return (
    <main className="">
      {role === "admin" && <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-800 pl-20">
        <p className="text-5xl">Who Wants To Win Some Money?</p>
        <Link href="/game/question">
          <button className="orange-bg py-3 px-8 mt-8">Start Game</button>
        </Link>
      </div>}
      {/* <div className="fixed top-0 right-0">
        <select name="role" onChange={onChange} id="role" className="h-8 w-20 bg-blue-900 text-white pl-2">
          <option value="host">Host</option>
          <option value="admin">Admin</option>
          <option value="player">Player</option>
        </select>
      </div> */}
    </main>
  );
}
