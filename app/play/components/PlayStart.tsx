"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Timer from "./Timer";

export default function PlayStart() {
  // const user = useAppSelector((state: any) => state.playReducer.user);
  const role = useAppSelector((state: any) => state.playReducer.role);
  const getFirstName = (name: string) => {
    const temp = name.split(" ");
    return temp[0];
  };
  let data;
  if (typeof window !== "undefined") {
    data = sessionStorage.getItem("user");
  }
  let user: any;
  if (data) {
    user = JSON.parse(data);
  }
  return (
    <div className="h-full flex flex-col py-5">
      {role === "player" ? (
        <div className="h-full flex flex-col">
          <div className="text-center flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl md:text-3xl mb-10 font-semibold">
              Hi {getFirstName(user.fullname)} 😃
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold">Patience is a virtue!!</h1>
            <p className="mt-2">The game is about to start.</p>
          </div>
          <p className="italic text-center font-semibold">
            Sponsored by Shelta
          </p>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl mb-10 font-semibold">
            Countdown to the next game!!
          </h1>
          <Timer />
        </div>
      )}
    </div>
  );
}
