"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Option from "./Option";
import Question from "./Question";
import Lifeline from "./Lifeline";
import Spinner from "./Spinner";
import questions from "@/data/questions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  lockUserOption,
  setCorrectAnswer,
  updateAskFriend,
  updateFiftyFifty,
  updateAskHost,
  revealAnswer,
  revealOptions,
  updateGuaranteedPrize,
  updatePrize,
  updateProgress,
  updateWalkaway,
  moveToNextQuestion,
} from "@/redux/features/controlsSlice";
import { fetchQuestion } from "@/lib/fetchQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faHandshake } from "@fortawesome/free-solid-svg-icons";
import prices from "@/data/prices";
import { useRouter } from "next/navigation";

export default function OptionsBlock() {
  const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");

  const dispatch = useAppDispatch();
  const router = useRouter();
  // for fetching the question
  const questionCount = useAppSelector(
    (state: any) => state.controlsReducer.currentQuestion
  );
  const disableElement = "opacity-50 pointer-events-none used";

  const prize = useAppSelector((state: any) => state.controlsReducer.prize);
  const user = useAppSelector((state: any) => state.controlsReducer.user);
  const showAnswer = useAppSelector(
    (state: any) => state.controlsReducer.showAnswer
  );
  const usedFiftyFifty = useAppSelector(
    (state: any) => state.controlsReducer.usedFiftyFifty
  );
  const usedAskHost = useAppSelector(
    (state: any) => state.controlsReducer.usedAskHost
  );
  const usedAskFriend = useAppSelector(
    (state: any) => state.controlsReducer.usedAskFriend
  );
  const showOptions = useAppSelector(
    (state: any) => state.controlsReducer.showOptions
  );
  const selectedOption = useAppSelector(
    (state: any) => state.controlsReducer.selectedOption
  );
  const progress = useAppSelector(
    (state: any) => state.controlsReducer.progressCount
  );
  const guaranteedPrize = useAppSelector(
    (state: any) => state.controlsReducer.guaranteedPrize
  );
  const walkaway = useAppSelector(
    (state: any) => state.controlsReducer.walkaway
  );

  // const [currentQuestion, setCurrentQuestion] = useState(
  //   questions[questionCount]
  // );

  const [data, setData] = useState<QuestionData>();
  const [endGame, setEndGame] = useState(false);

  const socketInitializer = async () => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("receive_question", (data: any) => {
      setData(data);
      dispatch(setCorrectAnswer(data.correct_answer));
    });

    socket.on("receive_option", (data: string) => {
      dispatch(lockUserOption(data));
    });

    socket.on("receive_live_line", (data: string) => {
      if (data === "fiftyFifty") dispatch(updateFiftyFifty());
      else if (data === "askHost") dispatch(updateAskHost());
      else dispatch(updateAskFriend());
    });

    socket.on("receive_walk_away", () => {
      dispatch(updateWalkaway());
    });

    socket.on("receive_answer", (data: string) => {
      if (data === "answer") dispatch(revealAnswer());
      else dispatch(revealOptions());
    });

    socket.on("receive_level", (data: any) => {
      if (data.status === "correct") {
        dispatch(updateProgress(data.value));
        dispatch(updatePrize(data.prize));
        // dispatch(updateGuaranteedPrize(data.guarantee));
      } else dispatch(updatePrize(data.guarantee));
    });

    socket.on("receive_end_game", (data: any) => {
      if (data === true) {
        router.push("finish");
      } else dispatch(moveToNextQuestion());
    });
  };

  const onSelect = (value: string) => {
    if (!showAnswer) {
      dispatch(lockUserOption(value));
      socket.emit("select_answer", value);
    }
  };

  const onClickLifeLine = (value: any) => {
    if (value === "fiftyFifty") dispatch(updateFiftyFifty());
    else if (value === "askHost") dispatch(updateAskHost());
    else dispatch(updateAskFriend());
    socket.emit("choose_live_line", value);
  };

  const getData = async (value: number) => {
    let data = await fetchQuestion(value);
    if (data.error) {
      console.log("There is an error");
    }
    let temp = data.question[0];
    setData(temp);
    dispatch(setCorrectAnswer(temp.correct_answer));
    socket.emit("get_question", data.question[0]);
  };

  useEffect(() => {
    console.log(user);
    if (user !== "admin") socketInitializer();
  }, []);

  // useEffect for fetching data

  useEffect(() => {
    if (user === "admin") getData(questionCount);
  }, [questionCount]);

  return (
    <div>
      {data && (
        <div className="options-block">
          {/* <Lifeline /> */}
          <div className="flex justify-center gap-5 mb-5 w-full">
            <div
              onClick={() => onClickLifeLine("fiftyFifty")}
              className={`life-line ${
                (!showOptions || selectedOption || user !== "admin") &&
                "pointer-events-none"
              } cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
                usedFiftyFifty && disableElement
              }`}
            >
              <span className="text-3xl font-semibold">50:50</span>
            </div>
            <div
              onClick={() => onClickLifeLine("askHost")}
              className={`life-line ${
                !showOptions || selectedOption || user !== "admin"
                  ? "pointer-events-none"
                  : ""
              } cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
                usedAskHost && disableElement
              }`}
            >
              <FontAwesomeIcon icon={faUserTie} size="4x" />
            </div>
            <div
              onClick={() => onClickLifeLine("askFriend")}
              className={`life-line ${
                (!showOptions || selectedOption || user !== "admin") &&
                "pointer-events-none"
              } cursor-pointer w-28 h-28 rounded-full border-4 flex items-center justify-center light-blue ${
                usedAskFriend && disableElement
              }`}
            >
              <FontAwesomeIcon icon={faHandshake} size="3x" />
            </div>
          </div>
          <div className="relative">
            <Question question={data.question} />
            <div className="line questionLine"></div>
          </div>
          <div className="relative mt-5">
            <div className="shape-wrap max-w-7xl mx-auto grid grid-cols-2 gap-5 w-full">
              {/* {currentQuestion.options.map((option, index) => (
            <Option
              key={index}
              idx={index}
              letter={option.key}
              value={option.value}
              answer={currentQuestion.answerKey}
              nextBest={currentQuestion.nextBest}
            />
          ))} */}
              <Option
                idx={0}
                letter={"A"}
                value={data.optionA}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
                onSelect={onSelect}
              />
              <Option
                idx={1}
                letter={"B"}
                value={data.optionB}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
                onSelect={onSelect}
              />
              <Option
                idx={2}
                letter={"C"}
                value={data.optionC}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
                onSelect={onSelect}
              />
              <Option
                idx={3}
                letter={"D"}
                value={data.optionD}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
                onSelect={onSelect}
              />
            </div>
            <div className="line firstLine"></div>
            <div className="line secondLine"></div>
          </div>
        </div>
      )}
    </div>
  );
}
