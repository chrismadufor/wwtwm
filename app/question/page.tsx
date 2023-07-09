"use client"

import { useAppSelector } from "@/redux/hooks";
import AdBlock from "./components/AdBlock";
import AdminPanel from "./components/AdminPanel";
import OptionsBlock from "./components/OptionsBlock";
import PriceBlock from "./components/PriceBlock";

export default function QuestionsPage() {
  const user = useAppSelector((state: any) => state.controlsReducer.user)
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
                <p className="font-semibold text-lg text-center">
                  Correct answer: {answer}
                </p>
              )}
            </div>
          )}
      {user === "admin" && <AdminPanel />}
    </main>
  );
}
