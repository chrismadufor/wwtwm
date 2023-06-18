"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateAskFriend,
  updateFiftyFifty,
  updateAskHost,
} from "@/redux/features/controlsSlice";

export default function Lifeline() {
  const dispatch = useAppDispatch();
  const disableElement = "opacity-50 pointer-events-none";
  const usedFiftyFifty = useAppSelector(
    (state) => state.controlsReducer.usedFiftyFifty
  );
  const usedAskHost = useAppSelector(
    (state) => state.controlsReducer.usedAskHost
  );
  const usedAskFriend = useAppSelector(
    (state) => state.controlsReducer.usedAskFriend
  );

  const onUseFiftyFifty = () => {
    dispatch(updateFiftyFifty());
  };
  const onUseAskHost = () => {
    dispatch(updateAskHost());
  };
  const onUseAskFriend = () => {
    dispatch(updateAskFriend());
  };

  return (
    <div className="flex justify-center gap-5 mb-5 w-full">
      <div
        onClick={onUseFiftyFifty}
        className={`life-line cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
          usedFiftyFifty && disableElement
        }`}
      >
        <span className="text-3xl font-semibold">50:50</span>
      </div>
      <div
        onClick={onUseAskHost}
        className={`life-line cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
          usedAskHost && disableElement
        }`}
      >
        <FontAwesomeIcon icon={faUserTie} size="4x" />
      </div>
      <div
        onClick={onUseAskFriend}
        className={`life-line cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
          usedAskFriend && disableElement
        }`}
      >
        <FontAwesomeIcon icon={faHandshake} size="3x" />
      </div>
    </div>
  );
}
