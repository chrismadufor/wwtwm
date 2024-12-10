"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Timer from "./Timer";
import { resetGame } from "@/redux/features/playSlice";
import PlayAdBlock from "./PlayAdBlock";

export default function PlayStart() {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state: any) => state.playReducer.user);
  const role = useAppSelector((state: any) => state.playReducer.role);
  const user = useAppSelector((state: any) => state.playReducer.user);
  const userX = useAppSelector((state: any) => state.playReducer);
  console.log("user", userX);
  const getFirstName = (name: string) => {
    const temp = name.split(" ");
    return temp[0];
  };
  useEffect(() => {
    dispatch(resetGame());
  }, []);
  return (
    <div className="h-full flex flex-col pb-5">
      {role === "player" ? (
        <div className="h-full flex flex-col">
          <div className="w-full">
            {/* <PlayAdBlock /> */}
          </div>
          <div className="text-center flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl md:text-3xl mb-10 font-semibold">
              Hi {user ? getFirstName(user.fullname) : ""} 😃
            </h1>
            <h1 className="text-xl md:text-3xl font-semibold">
              Patience is a virtue!!
            </h1>
            <p className="mt-2">The game is about to start.</p>
          </div>
          <p className="italic text-center font-semibold">
            Sponsored by C.O.C Lugbe
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
