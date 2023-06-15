"use client"

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { lockUserOption } from "@/redux/features/controlsSlice";

type Props = {
  letter: string;
  value: string;
  answer: string;
  nextBest: string;
};

export default function Option({ letter, value, answer, nextBest }: Props) {
  const dispatch = useAppDispatch()

  const selectedOption = useAppSelector(state => state.controlsReducer.selectedOption)
  const showAnswer = useAppSelector(state => state.controlsReducer.showAnswer)
  const fiftyFiftyActive = useAppSelector((state) => state.controlsReducer.fiftyFiftyActive)

  const [isClicked, setIsClicked] = useState(selectedOption === letter)
  const [isAnswer, setIsAnswer] = useState(false)

  useEffect(() => {
    if (selectedOption === letter) setIsClicked(true)
    else setIsClicked(false)
    if (showAnswer) {
      if (answer === letter) setIsAnswer(true)
    }
    else setIsAnswer(false)
  }, [selectedOption, letter, showAnswer, answer])


  const selectOption = () => {
    if(!showAnswer) dispatch(lockUserOption(letter))
  }

  const getValue = (value: string) => {
    let temp = ""
    if(fiftyFiftyActive) {
      if(letter === answer || letter === nextBest) return value
      else return ""
    }else return value
  }

  return (
    <div onClick={selectOption} className="option-wrap">
      <div className={`option bg-white flex items-center ${isClicked && "selected"} ${isAnswer && "answer"}`}>
        <div className="text-2xl option-inner flex items-center w-full h-full">
          <span className="mr-2">{letter}.</span>
          <span className="">{getValue(value)}</span>
        </div>
      </div>
    </div>
  );
}
