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

  return (
    <div onClick={() => {}} className={`option-wrap cursor-pointer}`}>
      <div className={`option bg-white flex items-center`}>
        <div
          onClick={role === "player" ? () => onSelectOption(letter) : () => {}}
          className={`${
            role !== "player" ||
            (role === "player" && !showOptions && "pointer-events-none")
          } option-inner w-full h-full flex items-center ${
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
