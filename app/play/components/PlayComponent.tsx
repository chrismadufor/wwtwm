import React, { useEffect, useState } from "react";
import Question from "./Question";
import PlayOption from "./PlayOption";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { finishGame } from "@/redux/features/playSlice";
import { useAnswerQuestionMutation } from "@/redux/services/playService";
import Spinner from "./Spinner";

export default function PlayComponent() {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state: any) => state.playReducer.answer);
  const showAnswer = useAppSelector(
    (state: any) => state.playReducer.showAnswer
  );
  const role = useAppSelector((state: any) => state.playReducer.role);
  const user = useAppSelector((state: any) => state.playReducer.user);
  const question = useAppSelector((state: any) => state.playReducer.questionData);
  const answerCount = useAppSelector(
    (state: any) => state.playReducer.answerCount
  );
  const userAnswer = answer.split("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = question.answer;
    setCorrectAnswer(temp.split("", answerCount));
  }, [answerCount]);

  const [answerQuestion] = useAnswerQuestionMutation();

  const submit = async () => {
    setLoading(true)
    // send user's answers and other info to backend
    console.log(user);
    let obj = {
      answer,
      player_id: user._id,
      question_id: question.id,
    };
    answerQuestion(obj)
      .unwrap()
      .then((res) => {
        setLoading(false)
        if (!res.error) {
          dispatch(finishGame());
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        setLoading(false)
        alert("An error occured. Try again");
      });
  };

  return (
    <div className="h-full py-10">
      {question && (
        <div>
          <h1 className="text-center font-semibold text-2xl md:text-4xl xl:text-5xl mb-5">
            Fastest Fingers!!
          </h1>
          <div className="relative">
            <Question question={question.question} />
            <div className="line questionLine"></div>
          </div>
          <div className="relative mt-5">
            <div className="shape-wrap mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 xl:gap-x-12 w-full">
              {/* {currentQuestion.options.map((option, index) => ( */}
              <PlayOption idx={0} letter={"A"} value={question.optionA} />
              <PlayOption idx={1} letter={"B"} value={question.optionB} />
              <PlayOption idx={2} letter={"C"} value={question.optionC} />
              <PlayOption idx={3} letter={"D"} value={question.optionD} />
            </div>
            <div className="line firstLine"></div>
            <div className="line secondLine"></div>
            <div className="line secondLine"></div>
            <div className="line secondLine"></div>
          </div>

          {userAnswer[0] !== "" && role === "player" && (
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
                  {loading ? <Spinner /> : "Submit"}
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
