"use client";

import React, { useEffect, useState } from "react";
import prices from "@/data/prices";
import { useAppSelector } from "@/redux/hooks";
import { lockUserOption } from "@/redux/features/controlsSlice";
import Image from "next/image";

export default function PriceBlock() {
  const progress = useAppSelector(
    (state: any) => state.controlsReducer.progressCount
  );

  const [currentVal, setCurrentVal] = useState(-1);

  const isGuaranteed = (index: number) => {
    if (10 - index === 3 || 10 - index === 6 || index === 0) return true;
  };

  useEffect(() => {
    let temp = progress === 0 ? -1 : 10 - progress;
    setCurrentVal(temp);
  }, [progress]);

  return (
    <div className="h-full flex flex-col border-l w-64">
      <div className="relative h-20 w-full bg-gray-50 py-5">
        <p className="text-3xl text-center text-blue-800 font-bold">C.O.C LUGBE</p>
      </div>
      <div className="h-full grid grid-cols-1">
        {prices.map((price, index) => (
          <p
            className={`font-semibold flex items-center text-3xl pl-5 ${
              isGuaranteed(index) ? "orange" : ""
            } ${index === currentVal ? "orange-bg" : ""}`}
            key={index}
          >
            <span className="mr-2">{10 - index}.</span>₦{price}
          </p>
        ))}
      </div>
    </div>
  );
}
