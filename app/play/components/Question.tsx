"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  question: string;
};

export default function Question({ question }: Props) {
  const showQuestion = useAppSelector(
    (state: any) => state.playReducer.showQuestion
  );
  return (
    <div className="shape-wrap max-w-7xl mx-auto option-wrap">
      <div className="question bg-white flex items-center">
        <div className="question-inner flex items-center w-full h-full">
          <p
            className={`text-xl md:text-3xl w-full text-center ${
              !showQuestion && "opacity-0"
            }`}
          >
            {question}
          </p>
        </div>
      </div>
    </div>
  );
}
