"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { lockUserOption } from "@/redux/features/controlsSlice";
import { updateAnswer } from "@/redux/features/playSlice";

type Props = {
  idx: number;
  letter: string;
  value: string;
};

export default function PlayOption({ idx, letter, value }: Props) {
  const dispatch = useAppDispatch();
  const [optionSelected, setOptionSelected] = useState(false);
  const showOptions = useAppSelector(
    (state: any) => state.playReducer.showOptions
  );
  const role = useAppSelector((state: any) => state.playReducer.role);

  const onSelectOption = (letter: string) => {
    dispatch(updateAnswer(letter));
    setOptionSelected(true);
  };

  // const selectedOption = useAppSelector((state: any) => state.controlsReducer.selectedOption)
  // const showOptions = useAppSelector((state: any) => state.controlsReducer.showOptions)
  // const user = useAppSelector((state: any) => state.controlsReducer.user)
  // const showAnswer = useAppSelector((state: any) => state.controlsReducer.showAnswer)
  // const fiftyFiftyActive = useAppSelector((state: any) => state.controlsReducer.fiftyFiftyActive)

  // const [isClicked, setIsClicked] = useState(selectedOption === letter)
  // const [isAnswer, setIsAnswer] = useState(false)
  // const [isWrong, setIsWrong] = useState(false)

  // useEffect(() => {
  //   if (selectedOption === letter) setIsClicked(true)
  //   else setIsClicked(false)
  //   if (showAnswer) {
  //     if (isClicked && letter !== answer) setIsWrong(true)
  //     if (answer === letter) setIsAnswer(true)
  //   }
  //   else setIsAnswer(false)
  // }, [selectedOption, letter, showAnswer, answer, isClicked])

  // const selectOption = () => {
  //   // if(!showAnswer) dispatch(lockUserOption(letter))
  //   onSelect(letter)
  // }

  // const getValue = (value: string) => {
  //   let temp = ""
  //   if(fiftyFiftyActive) {
  //     if(letter === answer || letter === nextBest) return value
  //     else return ""
  //   }else return value
  // }

  return (
    <div onClick={() => {}} className={`option-wrap cursor-pointer}`}>
      <div className={`option bg-white flex items-center`}>
        <div
          onClick={() => onSelectOption(letter)}
          className={`${
            role !== "player" || (role === "player" && !showOptions) && "pointer-events-none"
          } text-base md:xl lg:text-3xl option-inner w-full h-full flex items-center ${
            optionSelected && "pointer-events-none"
          }`}
        >
          <div
            className={`${
              optionSelected && "opacity-50"
            } flex cursor-pointer items-center ${!showOptions && "opacity-0"}`}
          >
            <span className="mr-2">{letter}.</span>
            <span className={``}>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
