"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { finishGame } from "@/redux/features/playSlice";
import { useDispatch } from "react-redux";

function GameTimer() {
  const dispatch = useDispatch()
  let [count, setCount] = useState(15);
  const [active, setActive] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const duringGameTimer = useAppSelector((state: any) => state.playReducer.duringGameTimer);
  const onStart = () => {
    setActive(true);
  };
  const onReset = () => {
    setActive(false);
    setCount(15);
  };
  const onHide = () => setShowTimer(false);
  useEffect(() => {
    let timer: any;
    if (count === 0) dispatch(finishGame())
    if (duringGameTimer && count > 0) {
      timer = setInterval(() => {
        // console.log("Yeah");
        setCount((prev) => prev - 1);
      }, 1000);
    } else clearInterval(timer);
    return () => clearInterval(timer);
  }, [duringGameTimer, count]);
  return (
    <div>
      {showTimer ? (
        <div className="timer">
          <div>
            <h1 className="text-2xl font-semibold px-3">
              00:
              {count < 10 && count >= 0 ? `0${count}` : count}
            </h1>
          </div>
          {/* <div className="controls grid grid-cols-3">
            <button onClick={() => onStart()} className="px-3 py-2 bg-gray-800">
              Start
            </button>
            <button onClick={() => onReset()} className="px-3 py-2 bg-gray-800">
              Reset
            </button>
            <button onClick={() => onHide()} className="px-3 py-2 bg-gray-800">
              Hide
            </button>
          </div> */}
        </div>
      ) : (
        <p
          onClick={() => setShowTimer(true)}
          className="text-3xl cursor-pointer font-bold border shadow bg-blue-800 p-4 text-white rounded-md"
        >
          <i className="fa-solid fa-stopwatch"></i> Show Timer
        </p>
      )}
    </div>
  );
}

export default GameTimer;
