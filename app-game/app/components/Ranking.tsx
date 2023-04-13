"use client";

import { FC, useEffect, useState } from "react";

const Ranking: FC<any> = ({ currentRound }: any) => {
    
  return (
    <div className="bg-gray-700 rounded-lg p-4">
    {/* Ranking - start */}
    <h2 className="text-lg font-semibold text-white">Ranking</h2>
    <div className="border-x-sky-900">
      <div className="grid grid-cols-3 text-sm">
        <div>Number</div>
        <div className="text-center">Name</div>
        <div className="text-center">Score</div>
      </div>
      {currentRound?.length &&
        [...currentRound].sort((a:any, b:any) =>  b.score-a.score).map((user: any, index: number) => {
          const { name: name1, score } = user;
          return (
            <div className="grid grid-cols-3 " key={index}>
              <div>{index + 1}</div>
              <div className="text-center">
                {!name1 || score === null
                  ? "-"
                  : name1 === name
                  ? "You"
                  : name1}
              </div>
              <div className="text-center">
                {score === null ? "-" : score}
              </div>
            </div>
          );
        })}
    </div>
    {/* Ranking - end */}
  </div>
  )
}

export default Ranking