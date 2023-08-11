"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function Results() {
  const [winnersData, setWinnersData] = useState<any>();
  const showWinner = useAppSelector(
    (state: any) => state.playReducer.showWinner
  );
  useEffect(() => {
    let data: any;
    let winners: any;
    if (typeof window !== "undefined") {
      data = sessionStorage.getItem("winners");
    }
    if (data) {
      winners = JSON.parse(data);
    }
    console.log(winners);
    // sort
    let final = winners.sort(
      (a: any, b: any) => a.timeinseconds - b.timeinseconds
    );
    console.log("Final", final);
    // get first 10
    let temp = [];
    let count = final.length < 10 ? final.length : 10;

    for (let i = 0; i < count; i++) {
      temp.push(final[i]);
    }
    setWinnersData(temp);
  }, []);
  return (
    <div className="pt-3">
      <h1 className="text-5xl text-center uppercase font-semibold mb-10">
        Top 10 Players (In No Order)
      </h1>
      <div className="w-full max-w-6xl mx-auto">
        <table className="w-full bg-white blue-text font-semibold text-3xl">
          <thead className="text-4xl">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {winnersData.map((winner: any, index: number) => (
              <tr key={index} className={`${index === 0 && showWinner && 'winner'}`}>
                <td>{showWinner ? winner.player.fullname : ""}</td>
                <td>{showWinner ? winner.player.phone : ""}</td>
                <td>{winner.timeinseconds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
