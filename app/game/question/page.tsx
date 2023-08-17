"use client";

import { useAppSelector } from "@/redux/hooks";
import AdBlock from "./components/AdBlock";
import AdminPanel from "./components/AdminPanel";
import OptionsBlock from "./components/OptionsBlock";
import PriceBlock from "./components/PriceBlock";

export default function QuestionsPage() {
  const user = useAppSelector((state: any) => state.controlsReducer.user);
  const question = useAppSelector(
    (state: any) => state.controlsReducer.question
  );
  const answer = useAppSelector(
    (state: any) => state.controlsReducer.correctAnswer
  );
  const selectedOption = useAppSelector(
    (state: any) => state.controlsReducer.selectedOption
  );

  return (
    <main className="h-screen max-h-screen flex flex-col blue-bg">
      <div className="h-full flex">
        <div className="h-full flex flex-col w-full">
          <AdBlock />
          <OptionsBlock />
        </div>
        <PriceBlock />
      </div>
      {user === "host" && (
        <div className="h-10">
          {selectedOption && (
            <div className="py-3 px-5 blue-bg">
              <p className="font-semibold text-lg">Correct answer: {answer}</p>
              <p className="text-lg">{question.preview || "No preview"}</p>
            </div>
          )}
        </div>
      )}
      {user === "admin" && <AdminPanel />}
    </main>
  );
}
