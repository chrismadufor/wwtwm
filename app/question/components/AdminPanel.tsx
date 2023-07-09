"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  moveToNextQuestion,
  questionReset,
  reset,
  revealAnswer,
  revealOptions,
  updateGuaranteedPrize,
  updatePrize,
  updateProgress,
  updateWalkaway,
} from "@/redux/features/controlsSlice";
import prices from "@/data/prices";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

export default function AdminPanel() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const disableElement = "opacity-50 pointer-events-none";

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

  useEffect(() => {
    if (!showAnswer) setShouldProceed(false);
  }, [showAnswer]);

  const guaranteePrize = () => {
    if (prize === "2,000") return "2,000";
    if (prize === "15,000") return "15,000";
    if (prize === "50,000") return "50,000";
  };

  const onCheckAnswer = () => {
    if (!showOptions) {
      dispatch(revealOptions());
      // socket.emit("show_option", true);
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
          dispatch(updateGuaranteedPrize(guaranteePrize()));
          socket.emit("send_level", {
            status: "correct",
            value: progress + 1,
            prize: prices[10 - progress - 1],
            guarantee: guaranteePrize()
          });
        } else {
          socket.emit("send_level", { status: "wrong" });
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
      router.push("finish");
      socket.emit("end_game", true);
      // instead of this, create a new prop on controlSlice for game ended and use it instead.
    }
  };

  return (
    <div className="h-20 w-full px-10 flex justify-between items-center gap-3">
      <button
        onClick={onCheckAnswer}
        className={`px-5 py-2 text-sm cursor-pointer green-bg uppercase font-semibold ${
          showOptions && selectedOption === null ? disableElement : ""
        }`}
      >
        {showOptions ? "Display Answer" : "Display Options"}
      </button>
      {selectedOption && (
        <p className="font-semibold text-lg">Correct answer: {answer}</p>
      )}
      <div className="flex gap-3">
        {!selectedOption && progress > 0 && (
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
            className="px-5 py-2 text-sm cursor-pointer orange-bg text-white uppercase font-semibold"
          >
            {shouldProceed ? "Next" : "End"}
          </button>
        )}
      </div>
    </div>
  );
}
