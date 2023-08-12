"use client"

import { useAppSelector } from "@/redux/hooks";
import React from "react";

export default function GameStats() {
  const stats = useAppSelector((state: any) => state.playReducer.stats);
  return (
    <div className="pt-10">
      <h1 className="text-5xl text-center uppercase font-semibold my-10">
        Game Stats
      </h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-md blue-text text-center px-5 py-10">
          <h1 className="stats-text mb-5 font-bold">{stats ? stats.total : ''}</h1>
          <p className="text-3xl uppercase font-semibold">
            Players in this round
          </p>
        </div>
        <div className="bg-white rounded-md blue-text text-center px-5 py-10">
          <h1 className="stats-text mb-5 font-bold">{stats ? stats.total_winners : ''}</h1>
          <p className="text-3xl uppercase font-semibold">
            Players got the answer correct
          </p>
        </div>
      </div>
    </div>
  );
}
