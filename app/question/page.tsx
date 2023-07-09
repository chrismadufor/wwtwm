"use client"

import { useAppSelector } from "@/redux/hooks";
import AdBlock from "./components/AdBlock";
import AdminPanel from "./components/AdminPanel";
import OptionsBlock from "./components/OptionsBlock";
import PriceBlock from "./components/PriceBlock";

export default function QuestionsPage() {
  const user = useAppSelector((state: any) => state.controlsReducer.user)
  return (
    <main className="h-screen max-h-screen flex flex-col blue-bg">
      <div className="h-full flex">
        <div className="h-full flex flex-col w-full">
          <AdBlock />
          <OptionsBlock />
        </div>
        <PriceBlock />
      </div>
      {user === "admin" && <AdminPanel />}
    </main>
  );
}
