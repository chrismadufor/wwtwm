"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  moveToNextQuestion,
  questionReset,
  reset,
  revealAnswer,
  updateGuaranteedPrize,
  updatePrize,
  updateProgress,
  updateWalkaway,
} from "@/redux/features/controlsSlice";
import prices from "@/data/prices";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const disableElement = "opacity-50 pointer-events-none";

  const selectedOption = useAppSelector(
    (state) => state.controlsReducer.selectedOption
  );
  const answer = useAppSelector((state) => state.controlsReducer.correctAnswer);
  const showAnswer = useAppSelector(
    (state) => state.controlsReducer.showAnswer
  );
  const progress = useAppSelector(
    (state) => state.controlsReducer.progressCount
  );
  const guaranteedPrize = useAppSelector(
    (state) => state.controlsReducer.guaranteedPrize
  );
  const walkaway = useAppSelector((state) => state.controlsReducer.walkaway);

  const [shouldProceed, setShouldProceed] = useState(false);

  useEffect(() => {
    if (!showAnswer) setShouldProceed(false);
  }, [showAnswer]);

  const onCheckAnswer = () => {
    dispatch(revealAnswer());
    if (!walkaway) {
      if (answer === selectedOption) {
        if (progress <= 8)setShouldProceed(true)
        else setShouldProceed(false);
        dispatch(updateProgress());
        dispatch(updatePrize(prices[10 - progress - 1]));
        dispatch(updateGuaranteedPrize());
      } else {
        dispatch(updatePrize(guaranteedPrize));
      }
    }
  };

  const onWalkAway = () => {
    dispatch(updateWalkaway())
  };

  const onNextStep = () => {
    if (shouldProceed) dispatch(moveToNextQuestion());
    else {
      router.push("finish");
      dispatch(questionReset());
    }
  };

  return (
    <div className="h-20 w-full px-10 flex items-center gap-3">
      <button
        onClick={onCheckAnswer}
        className={`px-5 py-2 text-sm cursor-pointer green-bg uppercase font-semibold ${
          selectedOption === null ? disableElement : ""
        }`}
      >
        Check Answer
      </button>
      <button
        onClick={onWalkAway}
        className="px-5 py-2 text-sm cursor-pointer orange-bg uppercase font-semibold"
      >
        Walk Away
      </button>
      {(showAnswer || walkaway) && (
        <button
          onClick={onNextStep}
          className="px-5 py-2 text-sm cursor-pointer orange-bg text-white uppercase font-semibold"
        >
          {shouldProceed ? "Next" : "End"}
        </button>
      )}
    </div>
  );
}
