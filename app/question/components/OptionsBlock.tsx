"use client";

import React, { useEffect, useState } from "react";
import Option from "./Option";
import Question from "./Question";
import Lifeline from "./Lifeline";
import questions from "@/data/questions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  lockUserOption,
  setCorrectAnswer,
} from "@/redux/features/controlsSlice";

export default function OptionsBlock() {
  const dispatch = useAppDispatch();
  const questionCount = useAppSelector(
    (state) => state.controlsReducer.currentQuestion
  );
  const prize = useAppSelector((state) => state.controlsReducer.prize);

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionCount]
  );

  useEffect(() => {
    setCurrentQuestion(questions[questionCount]);
    dispatch(setCorrectAnswer(currentQuestion.answerKey));
  }, [dispatch, currentQuestion, prize, questionCount]);

  return (
    <div className="options-block">
      <Lifeline />
      <div className="relative">
        <Question question={currentQuestion.question} />
        <div className="line questionLine"></div>
      </div>
      <div className="relative mt-5">
        <div className="shape-wrap max-w-7xl mx-auto grid grid-cols-2 gap-5 w-full">
          {currentQuestion.options.map((option, index) => (
            <Option
              key={index}
              idx={index}
              letter={option.key}
              value={option.value}
              answer={currentQuestion.answerKey}
              nextBest={currentQuestion.nextBest}
            />
          ))}
        </div>
        <div className="line firstLine"></div>
        <div className="line secondLine"></div>
      </div>
    </div>
  );
}
