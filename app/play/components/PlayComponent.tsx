import React, { useEffect, useState } from "react";
import Question from "./Question";
import PlayOption from "./PlayOption";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { finishGame } from "@/redux/features/playSlice";
import { answerQuestion } from "@/lib/playService";

export default function PlayComponent() {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state: any) => state.playReducer.answer);
  const showAnswer = useAppSelector(
    (state: any) => state.playReducer.showAnswer
  );
  const role = useAppSelector((state: any) => state.playReducer.role);
  const answerCount = useAppSelector(
    (state: any) => state.playReducer.answerCount
  );
  const userAnswer = answer.split("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [question, setQuestion] = useState<any>();
  const [userObj, setUserObj] = useState<any>();
  // const correctAnswerArray = correctAnswer.split("", answerCount);
  // const correctAnswerArray = correctAnswer.split("")

  let data: any;
  let tempQuestion: any;
  let userData: any;
  let tempUserObj: any;
  if (typeof window !== "undefined") {
    data = sessionStorage.getItem("questionObj");
  }
  if (data && correctAnswer.length === 0) {
    tempQuestion = JSON.parse(data);
    // console.log("temp>>>>", tempQuestion);
  }
  if (typeof window !== "undefined") {
    userData = sessionStorage.getItem("user");
  }
  if (userData && correctAnswer.length === 0) {
    tempUserObj = JSON.parse(userData);
    // console.log("data in play comp.", userObj);
  }
  useEffect(() => {
    setQuestion(tempQuestion);
    setUserObj(tempUserObj);
  }, []);

  useEffect(() => {
    if (question) {
      let temp = question.answer;
      setCorrectAnswer(temp.split("", answerCount));
    }
  }, [answerCount]);

  const submit = async () => {
    // send user's answers and other info to backend
    console.log(userObj)
    let obj = {
      answer,
      player_id: userObj._id,
      question_id: question.id,
    };
    console.log("obj", obj)
    let data = await answerQuestion(obj);
    console.log(data);
    dispatch(finishGame());
  };

  return (
    <div className="h-full py-10">
      {question && (
        <div>
          <h1 className="text-center font-semibold text-2xl md:text-4xl mb-5">
            Fastest Fingers First!!
          </h1>
          <div className="relative">
            <Question question={question.question} />
            <div className="line questionLine"></div>
          </div>
          <div className="relative mt-5">
            <div className="shape-wrap max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">
              {/* {currentQuestion.options.map((option, index) => ( */}
              <PlayOption idx={0} letter={"A"} value={question.optionA} />
              <PlayOption idx={1} letter={"B"} value={question.optionB} />
              <PlayOption idx={2} letter={"C"} value={question.optionC} />
              <PlayOption idx={3} letter={"D"} value={question.optionD} />
            </div>
            <div className="line firstLine"></div>
            <div className="line secondLine"></div>
          </div>

          {userAnswer[0] !== "" && (
            <div>
              <div className="flex gap-4 justify-center py-10">
                {userAnswer.map((letter: string, index: number) => (
                  <div
                    key={index}
                    className="border-2 border-white h-10 md:h-14 w-10 md:w-14 flex items-center justify-center font-semibold text-2xl rounded-md"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              {answer.length === 4 && (
                <button
                  onClick={submit}
                  className="w-28 mx-auto block h-10 bg-white blue-text uppercase font-semibold"
                >
                  Submit
                </button>
              )}
            </div>
          )}
          {role !== "player" && showAnswer && (
            <div className="flex gap-4 justify-center py-10">
              {correctAnswer.map((letter: string, index: number) => (
                <div
                  key={index}
                  className="border-4 border-white bg-white blue-text h-48 w-48 flex items-center justify-center font-semibold answer-text rounded-md"
                >
                  {letter}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
