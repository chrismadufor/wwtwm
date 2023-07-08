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
  setCorrectAnswer,
  setFetchedQuestion,
} from "@/redux/features/controlsSlice";

export default function OptionsBlock() {
  // const socket: Socket<any, any> = io("https://wwtwmserver.onrender.com");
  // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://wwtwmserver.onrender.com");

  const dispatch = useAppDispatch();
  const questionCount = useAppSelector(
    (state: any) => state.controlsReducer.currentQuestion
  );

  const prize = useAppSelector((state: any) => state.controlsReducer.prize);
  const fetchedQuestion: boolean = useAppSelector(
    (state: any) => state.controlsReducer.fetchedQuestion
  );

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionCount]
  );

  const [data, setData] = useState<QuestionData>();
  const [received, setReceived] = useState(false)

  // const getData = () => {
    // socket.emit("get_question", [question]);
    // fetch(`https://wwtwmserver.onrender.com/admin/fetch_questions_params/${questionCategory}/${questionNumber}/${questionNumber}`)
  //   fetch(
  //     `https://wwtwmserver.onrender.com/admin/fetch_questions_params/${"A"}/${1}/${1}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Data fetched!", data.question[0]);
  //       setData(data.question[0]);
  //       socket.emit("get_question", data.question[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // // Socket useEffect
  // useEffect(() => {
  //   socket.on("receive_question", (data: QuestionData[]) => {
  //     console.log("Data on useEffect1", fetchedQuestion);
  //     if (fetchedQuestion === false) {
  //       setData(data[0]);
  //       dispatch(setFetchedQuestion());
  //       dispatch(setCorrectAnswer(data[0].correct_answer));
  //     } else {
  //       console.log("Received", data[0]);
  //     }
  //   });
  // }, [data]);

  useEffect(() => {
    // getData();
  }, []);

  return (
    <div>
      {data ? (
        <div className="options-block">
          <Lifeline />
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
              />
              <Option
                idx={1}
                letter={"B"}
                value={data.optionB}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
              />
              <Option
                idx={2}
                letter={"C"}
                value={data.optionC}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
              />
              <Option
                idx={3}
                letter={"D"}
                value={data.optionD}
                answer={data.correct_answer}
                nextBest={data.near_correct_answer}
              />
            </div>
            <div className="line firstLine"></div>
            <div className="line secondLine"></div>
          </div>
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}
