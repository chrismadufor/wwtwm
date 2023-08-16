"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  moveToNextQuestion,
  questionReset,
  reset,
  revealAnswer,
  revealOptions,
  setQuestionData,
  updateGuaranteedPrize,
  updatePrize,
  updateProgress,
  updateWalkaway,
} from "@/redux/features/controlsSlice";
import prices from "@/data/prices";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useFetchGameQuestionMutation } from "@/redux/services/playService";
import Spinner from "./Spinner";

export default function AdminPanel() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const disableElement = "opacity-50 pointer-events-none";
  const [loading, setLoading] = useState(false)
  const [fetchQuestion] = useFetchGameQuestionMutation()

  const getQuestion = (data: any) => {
    setLoading(true)
    fetchQuestion(data)
    .unwrap()
    .then(res => {
      setLoading(false)
      if (!res.error) {
        dispatch(setQuestionData(res.question[0]))
        socket.emit("get_question", res.question[0])
      } else {
        alert(res.message)
      }
    })
    .catch(err => {
      alert("An error occured. Try again")
    })
  }

  const category = useAppSelector(
    (state: any) => state.playReducer.category
  );
  const questionCount = useAppSelector(
    (state: any) => state.controlsReducer.currentQuestion
  );
  const selectedOption = useAppSelector(
    (state: any) => state.controlsReducer.selectedOption
  );
  const answer = useAppSelector(
    (state: any) => state.controlsReducer.correctAnswer
  );
  const showAnswer = useAppSelector(
    (state: any) => state.controlsReducer.showAnswer
  );
  const showOptions = useAppSelector(
    (state: any) => state.controlsReducer.showOptions
  );
  const progress = useAppSelector(
    (state: any) => state.controlsReducer.progressCount
  );
  const prize = useAppSelector((state: any) => state.controlsReducer.prize);
  const guaranteedPrize = useAppSelector(
    (state: any) => state.controlsReducer.guaranteedPrize
  );
  const walkaway = useAppSelector(
    (state: any) => state.controlsReducer.walkaway
  );

  const [shouldProceed, setShouldProceed] = useState(false);
  const [guaranteePrize, setGuaranteePrice] = useState("0")

  useEffect(() => {
    if (!showAnswer) setShouldProceed(false);
  }, [showAnswer]);

  useEffect(() => {
    if (!category) {
      alert("No category selected, Set a category to continue")
      return router.push("/?role=admin")
    }
    let data = {
      value: questionCount,
      category
    }
    getQuestion(data)
  }, [questionCount])

  const getGuaranteePrize = (value: string) => {
    if (value === "1,000") setGuaranteePrice("2,000");
    else if (value === "15,000") setGuaranteePrice("15,000");
    else if (value === "50,000") setGuaranteePrice("50,000");
    else return guaranteePrize
  };

  // useEffect(() => {
  //   getGuaranteePrize(prize)
  // }, [prize])

  const onCheckAnswer = () => {
    if (!showOptions) {
      dispatch(revealOptions());
      socket.emit("show_answer", "option");
    } else {
      dispatch(revealAnswer());
      socket.emit("show_answer", "answer");
      if (!walkaway) {
        if (answer === selectedOption) {
          if (progress <= 8) setShouldProceed(true);
          else setShouldProceed(false);
          dispatch(updateProgress(progress + 1));
          dispatch(updatePrize(prices[10 - progress - 1]));
          // dispatch(updateGuaranteedPrize(guaranteePrize));
          socket.emit("send_level", {
            status: "correct",
            value: progress + 1,
            prize: prices[10 - progress - 1],
            guarantee: guaranteedPrize
          });
        } else {
          socket.emit("send_level", { status: "wrong", guarantee: guaranteedPrize });
          dispatch(updatePrize(guaranteedPrize));
        }
      }
    }
  };

  const onWalkAway = () => {
    dispatch(updateWalkaway());
    socket.emit("walk_away", true);
  };

  const onNextStep = () => {
    if (shouldProceed) {
      dispatch(moveToNextQuestion());
      socket.emit("end_game", false);
    } else {
      router.push("game/finish");
      socket.emit("end_game", true);
      // instead of this, create a new prop on controlSlice for game ended and use it instead.
    }
  };

  return (
    <div className="h-20 w-full px-10 flex justify-between items-center gap-3">
      
      {loading ? <button className="px-5 py-2 text-sm pointer-events-none green-bg"><Spinner /></button> : <button
        onClick={onCheckAnswer}
        className={`px-5 py-2 text-sm cursor-pointer green-bg uppercase font-semibold ${
          (showOptions && selectedOption === null) || showAnswer ? disableElement : ""
        }`}
      >
        {showOptions ? "Display Answer" : "Display Options"}
      </button>}
      <div className="flex gap-3">
        {showOptions && !selectedOption && progress > 0 && (
          <button
            onClick={onWalkAway}
            className={`px-5 py-2 text-sm cursor-pointer orange-bg uppercase font-semibold ${
              walkaway && disableElement
            }`}
          >
            Walk Away
          </button>
        )}
        {(showAnswer || walkaway) && (
          <button
            onClick={onNextStep}
            className={`px-5 py-2 text-sm cursor-pointer orange-bg text-white uppercase font-semibold ${
              !showOptions && disableElement
            }`}
          >
            {shouldProceed ? "Next" : "End"}
          </button>
        )}
      </div>
    </div>
  );
}
