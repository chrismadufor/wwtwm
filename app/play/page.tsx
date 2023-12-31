"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PlayComponent from "./components/PlayComponent";
import PlayStart from "./components/PlayStart";
import PlayEnd from "./components/PlayEnd";
import PlayAdminPanel from "./components/PlayAdminPanel";
import { io, Socket } from "socket.io-client";
import {
  finishGame,
  gameStart,
  setQuestionData,
  setWinners,
  showAnswer,
  showOptions,
  showQuestion,
  showResultsPage,
  showStats,
  showWinner,
  startGameTimer,
} from "@/redux/features/playSlice";
import Results from "./components/Results";
import GameStats from "./components/GameStats";
import { useEffect } from "react";

export default function QuestionsPage() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  const dispatch = useAppDispatch();
  const playStart = useAppSelector((state: any) => state.playReducer.playStart);
  const startGame = useAppSelector((state: any) => state.playReducer.startGame);
  const playEnd = useAppSelector((state: any) => state.playReducer.playEnd);
  const endGame = useAppSelector((state: any) => state.playReducer.endGame);
  const role = useAppSelector((state: any) => state.playReducer.role);
  const showResultsValue = useAppSelector(
    (state: any) => state.playReducer.showResultPage
  );
  const showStatsValue = useAppSelector(
    (state: any) => state.playReducer.showStats
  );

  const inGameSocketInitializer = () => {
    socket.on("connect", () => {
      console.log("Play socket connected");
    });

    socket.on("recieve_trivia_end", (data: any): any => {
      dispatch(gameStart());
      dispatch(setQuestionData(data));
    });

    socket.on("receive_trivia_question", (data: string) => {
      dispatch(showQuestion());
    });

    socket.on("recieve_trivia_options", (data: string) => {
      dispatch(showOptions());
    });

    socket.on("recieve_trivia_end_game", (data: string) => {
      dispatch(finishGame());
    });
  };

  const postGameSocketInitializer = () => {
    socket.on("recieve_timer", (data: string) => {
      dispatch(startGameTimer());
    });

    socket.on("receive_trivia_answer", (data: string) => {
      dispatch(showAnswer(data));
    });

    socket.on("recieve_trivia_stats", (data: any) => {
      dispatch(setWinners(data));
      dispatch(showStats());
    });

    socket.on("recieve_correct_triva_answer_users", (data: string) => {
      dispatch(showResultsPage());
    });

    socket.on("recieve_user_fastest_time", (data: string) => {
      dispatch(showWinner());
    });
  };

  useEffect(() => {
    if (role === "host") postGameSocketInitializer();
    if (role !== "admin") inGameSocketInitializer();
  }, []);

  return (
    <main className="h-screen min-h-screen flex flex-col blue-bg">
      <div className="h-full flex">
        <div className="h-full flex flex-col w-full">
          {playStart && <PlayStart />}

          {role !== "player" && startGame && !endGame && <PlayComponent />}

          {role === "player" && startGame && !playEnd && <PlayComponent />}

          {playEnd && role === "player" && <PlayEnd />}

          {playEnd && role !== "player" && (
            <div>
              {showResultsValue && <Results />}{" "}
              {showStatsValue && <GameStats />}
            </div>
          )}
        </div>
      </div>
      {role === "admin" && (
        <div className="fixed bottom-0 w-full h-16 flex items-center bg-blue-800 px-10">
          <PlayAdminPanel />
        </div>
      )}
    </main>
  );
}
