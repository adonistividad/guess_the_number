"use client";

import { FC, useEffect, useState } from "react";

const incrementPoints = 25;
const incrementMultiplier = 0.25;
const GameStarter = ({
  currentRound,
  speed,
  setSpeed,
  startGame,
  points,
  setPoints,
  multiplier,
  setMultiplier,
}: any) => { 
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs w-full text-center">Points</div>
          <div className="grid grid-cols-3">
            <button
              className="bg-slate-800 max-w-5 max-h-8 text-center mr-2 mb-2 rounded-lg"
              onClick={() => setPoints(points - incrementPoints)}
            >
              -
            </button>

            <input
              type="text"
              value={points}
              className="text-sm max-w-2 max-h-6 mr-1  text-center bg-slate-800"
            />

            <button
              className="bg-slate-800 max-w-5 max-h-8 text-center mr-2 mb-2 rounded-lg"
              onClick={() => setPoints(points + incrementPoints)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <div className="text-xs w-full text-center">Multiplier</div>

          <div className="grid grid-cols-3">
            <button
              className="bg-slate-800 max-w-5 max-h-8 text-center mr-2 mb-2 rounded-lg"
              onClick={() => setMultiplier(multiplier - incrementMultiplier)}
            >
              -
            </button>

            <input
              type="number"
              value={multiplier}
              // value={(multiplier).toFixed(2)}
              onChange={(e: any) => setMultiplier(parseFloat(e.target.value))}
              className="text-sm max-w-2 max-h-6 mr-1  text-center bg-slate-800"
            />

            <button
              className="bg-slate-800 max-w-5 max-h-8 text-center mr-2 mb-2 rounded-lg"
              onClick={() => setMultiplier(multiplier + incrementMultiplier)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={startGame}
      >
        Start
      </button>

      <h2 className="text-lg font-semibold text-white">Current Round</h2>
      <div className="border-x-sky-900">
        <div className="grid grid-cols-3 text-sm">
          <div>Name</div>
          <div className="text-center">Point</div>
          <div className="text-center">Multiplier</div>
        </div>
        {currentRound?.length &&
          currentRound.map((user: any, index: number) => {
            const { name: name1, point, multiplier } = user;
            return (
              <div className="grid grid-cols-3 " key={index}>
                <div>{name1 === name ? "You" : name1} </div>
                <div className="text-center">{point ? point : "-"}</div>
                <div className="text-center">
                  {multiplier ? multiplier : "-"}
                </div>
              </div>
            );
          })}
      </div>

      <h2 className="text-lg font-semibold text-white mt-3">Speed</h2>
      <div className="bg-slate-600 p-2 rounded-lg">
        <input
          id="small-range"
          type="range"
          value={speed}
          min="1"
          max="5"
          step="1"
          onChange={(e: any) => setSpeed(e.target.value)}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm "
        />
        <span className="grid grid-cols-5 text-xs p-0 m0">
          <span>1x</span>
          <span className="text-center">2x</span>
          <span className="text-center">3x</span>
          <span className="text-center">4x</span>
          <span className="text-right">5x</span>
        </span>
      </div>
    </>
  );
};

export default GameStarter;
