"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  startGameTimer,
  gameStart,
  showOptions,
  showQuestion,
  finishGame,
  showAnswer,
  showStats,
  showResultsPage,
  showResults,
  showWinner,
  showAnswerBtn,
} from "@/redux/features/playSlice";
import { io, Socket } from "socket.io-client";
import { fetchWinners, updateQuestionTime } from "@/lib/playService";

export default function PlayAdminPanel() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  const dispatch = useAppDispatch();
  const [showStatBtn, setShowStatBtn] = useState(false);
  const [count, setCount] = useState(0);
  const startGame = useAppSelector((state: any) => state.playReducer.startGame);
  const showWinnerValue = useAppSelector(
    (state: any) => state.playReducer.showWinner
  );
  const showAnswerValue = useAppSelector(
    (state: any) => state.playReducer.showAnswer
  );
  const showStatsValue = useAppSelector(
    (state: any) => state.playReducer.showStats
  );
  const endGame = useAppSelector((state: any) => state.playReducer.endGame);
  const showResultPageValue = useAppSelector(
    (state: any) => state.playReducer.showResultPage
  );
  const playEnd = useAppSelector((state: any) => state.playReducer.playEnd);
  const showQuestionValue = useAppSelector(
    (state: any) => state.playReducer.showQuestion
  );
  const showOptionsValue = useAppSelector(
    (state: any) => state.playReducer.showOptions
  );

  let data;
  if (typeof window !== "undefined") {
    data = sessionStorage.getItem("question");
  }
  let question: any;
  if (data) {
    question = JSON.parse(data);
    // console.log("data", question)
  }

  const getWinners = async () => {
    let obj = {
      answer: question.correct_answer,
      question_id: question._id
  }
    let data = await fetchWinners(obj)
    let statsData = {
      total: data.total,
      total_winners: data.total_users_who_answered_correctly,
    }
    let winnersData = data.answers
    sessionStorage.setItem('stats', JSON.stringify(statsData))
    sessionStorage.setItem('winners', JSON.stringify(winnersData))
    // console.log(data)
  }

  const onStartGameTimer = () => {
    dispatch(startGameTimer());
    socket.emit("start_timer", "timer");
  };
  const onGameStart = () => {
    let questionObj = {
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      id: question._id,
      answer: question.correct_answer
    }
    sessionStorage.setItem("questionObj", JSON.stringify(questionObj))
    dispatch(gameStart());
    socket.emit("start_trivia_game", questionObj);
  };
  const onShowQuestion = () => {
    dispatch(showQuestion());
    socket.emit("send_trivia_question", "question");
  };
  const onShowOptions = async () => {
    dispatch(showOptions());
    socket.emit("send_trivia_options", "options");
    // make call to start timer on backend
    let data = await updateQuestionTime(question._id)
    console.log(data)
  };
  const onShowStats = () => {
    dispatch(showStats());
    socket.emit("show_trivia_stats", "stats");
  };
  const onShowWinner = () => {
    dispatch(showWinner());
    socket.emit("send_user_fastest_time", "winner");
  };
  const onShowResultsPage = () => {
    dispatch(showResultsPage());
    socket.emit("send_correct_triva_answer_users", "results");
  };
  const onShowAnswer = () => {
    let temp = count + 1;
    if (temp <= 4) {
      dispatch(showAnswer(temp));
      socket.emit("send_trivia_answer", temp);
      setCount(temp);
    }
    if (count === 3) {
      getWinners()
      setShowStatBtn(true);
    }
  };
  const onEndGame = () => {
    // fire socket event to end game on player screens
    dispatch(showAnswerBtn());
    socket.emit("send_trivia_end_game", "end game");
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        {!startGame && (
          <button
            onClick={onStartGameTimer}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Start Timer
          </button>
        )}
        {!startGame && (
          <button
            onClick={onGameStart}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Start Game
          </button>
        )}
        {startGame && !showQuestionValue && (
          <button
            onClick={onShowQuestion}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Display question
          </button>
        )}
        {showQuestionValue && !showOptionsValue && (
          <button
            onClick={onShowOptions}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Display options
          </button>
        )}
        {showOptionsValue && !showAnswerValue && (
          <button
            onClick={onEndGame}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            End Game
          </button>
        )}
        {playEnd && !showStatBtn && (
          <button
            onClick={onShowAnswer}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Show answer
          </button>
        )}
        {showStatBtn && !endGame && (
          // <Link href={"/play/stats"}>
          <button
            onClick={onShowStats}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Show stats
          </button>
          // </Link>
        )}
        {showStatsValue && !showResultPageValue && (
          <button
            onClick={onShowResultsPage}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Show results
          </button>
        )}
        {showResultPageValue && !showWinnerValue && (
          <button
            onClick={onShowWinner}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Show Winner
          </button>
        )}
      </div>
    </div>
  );
}
