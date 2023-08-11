"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import GameStats from "../components/GameStats";
import PlayAdminPanel from "../components/PlayAdminPanel";
import { useEffect } from "react";
import { showResults, showResultsPage } from "@/redux/features/playSlice";
import Results from "../components/Results";

export default function QuestionsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showResults())
  }, [])
  const role = useAppSelector((state: any) => state.playReducer.role);
  const showStatsValue = useAppSelector((state: any) => state.playReducer.showStats);
  const showResultsValue = useAppSelector((state: any) => state.playReducer.showResultPage);
  return (
    <main className="h-screen max-h-screen flex flex-col blue-bg">
      <div className="h-full flex">
        <div className="h-full flex flex-col w-full"> 
          {showResultsValue ? <Results /> : <GameStats />}
        </div>
      </div>
      {role === "admin" && (
        <div className="h-16 flex items-center bg-blue-800 px-10">
          <PlayAdminPanel />
        </div>
      )}
    </main>
  );
}
