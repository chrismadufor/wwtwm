"use client";

import { reset, setUser } from "@/redux/features/controlsSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { setCategory } from "@/redux/features/playSlice";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const role = searchParams.get("role");
  const password = searchParams.get("password");
  useEffect(() => {
    dispatch(reset());
    if (!role) router.push("/");
    else if (role === "player" && password !== "wwtwmplayer12") {
      alert("Password is incorrect for player");
      router.push("/");
    } else if (role === "host" && password !== "wwtwmhost15") {
      alert("Password is incorrect for host");
      router.push("/");
    } else if (role === "admin" && password !== "wwtwmadmin20") {
      alert("Password is incorrect for admin");
      router.push("/");
    } else if (role === "admin" && password === "wwtwmadmin20") {
      dispatch(setUser("admin"));
    } else if (
      (role === "host" && password === "wwtwmhost15") ||
      (role === "player" && password === "wwtwmplayer12")
    ) {
      dispatch(setUser(role));
      router.push("/game/question");
    } else router.push("/");
  }, [dispatch]);

  // const onChange = (event: any) => {
  //   dispatch(setUser(event.target.value))
  // }
  const [categoryData, setCategoryData] = useState("");
  const onCategoryChange = (event: any) => {
    setCategoryData(event.target.value);
  };
  const startGame = () => {
    if (!categoryData) {
      alert("Fill all fields");
    }
    let data: string = categoryData.toUpperCase().trim();
    dispatch(setCategory(data));
    router.push("/game/question")
  }

  return (
    <main className="">
      {role === "admin" && <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-800 pl-20">
        <p className="text-5xl">Who Wants To Win Some Money?</p>
        <div>
          <input
            value={categoryData}
            onChange={onCategoryChange}
            type="text"
            placeholder="Round"
            className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
            required
          />
          <button onClick={startGame} className="orange-bg py-3 px-8 mt-8">Start Game</button>
        </div>
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
