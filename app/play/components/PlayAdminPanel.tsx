"use client";

import React, { useEffect, useState } from "react";
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
  setWinners,
  setQuestionData,
} from "@/redux/features/playSlice";
import { io, Socket } from "socket.io-client";
import { fetchWinners, updateQuestionTime } from "@/lib/playService";
import {
  useFetchTriviaQuestionMutation,
  useFetchWinnersMutation,
  useUpdateQuestionTimeMutation,
} from "@/redux/services/playService";
import Spinner from "./Spinner";

export default function PlayAdminPanel() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  const dispatch = useAppDispatch();
  const [showStatBtn, setShowStatBtn] = useState(false);
  const [count, setCount] = useState(0);
  const [finalResult, setFinalResult] = useState<any>()
  const [question, setQuestion] = useState<any>();
  const [questionLoading, setQuestionLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
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
  const category = useAppSelector((state: any) => state.playReducer.category);
  // const question = useAppSelector((state: any) => state.playReducer.question);
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

  const [fetchTriviaQuestion] = useFetchTriviaQuestionMutation();
  const [fetchWinners] = useFetchWinnersMutation();
  const [updateTime] = useUpdateQuestionTimeMutation();
  const fetchQuestion = (data: string) => {
    setQuestionLoading(true);
    fetchTriviaQuestion(data)
      .unwrap()
      .then((res) => {
        setQuestionLoading(false);
        if (!res.err) {
          // console.log(res);
          setQuestion(res.question[0]);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        setQuestionLoading(false);
        alert("Fetch Question failed. Try again");
      });
  };
  const getWinners = () => {
    let obj = {
      answer: question.correct_answer,
      question_id: question._id,
    };
    setResultsLoading(true);
    fetchWinners(obj)
      .unwrap()
      .then((res) => {
        setQuestionLoading(false);
        if (!res.err) {
          // console.log("winners", res);
          let stats = {
            total: res.total,
            total_winners: res.total_users_who_answered_correctly,
          };
          let winners = res.answers;
          setFinalResult({ stats, winners })
          dispatch(setWinners({ stats, winners }));
          setShowStatBtn(true);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        setQuestionLoading(false);
        alert("Fetch Results failed. Try again");
      });
  };

  useEffect(() => {
    fetchQuestion(category);
  }, []);

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
      answer: question.correct_answer,
    };
    dispatch(setQuestionData(questionObj));
    dispatch(gameStart());
    socket.emit("start_trivia_game", questionObj);
  };
  const onShowQuestion = () => {
    dispatch(showQuestion());
    socket.emit("send_trivia_question", "question");
  };
  const onShowOptions = () => {
    setOptionsLoading(true)
    updateTime(question._id)
      .unwrap()
      .then((res) => {
        setOptionsLoading(false)
        if (!res.error) {
          dispatch(showOptions());
          socket.emit("send_trivia_options", "options");
        }else {
          alert(res.message)
        }
      })
      .catch(err => {
        setOptionsLoading(false)
        alert("An error occured. Try again")
      })
  };
  const onShowStats = () => {
    dispatch(showStats());
    socket.emit("show_trivia_stats", finalResult);
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
      getWinners();
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
            className={`py-1 px-2 bg-white text-blue-800 font-semibold uppercase ${
              questionLoading && "pointer-events-none"
            }`}
          >
            {questionLoading ? <Spinner /> : "Start Game"}
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
            className={`py-1 px-2 bg-white text-blue-800 font-semibold uppercase ${
              questionLoading && "pointer-events-none"
            }`}
          >
            {optionsLoading ? <Spinner /> : "Display options"}
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
            {resultsLoading ? <Spinner /> : "Show answer"}
          </button>
        )}
        {showStatBtn && !endGame && (
          <button
            onClick={onShowStats}
            className="py-1 px-2 bg-white text-blue-800 font-semibold uppercase"
          >
            Show stats
          </button>
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
