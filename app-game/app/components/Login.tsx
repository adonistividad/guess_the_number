"use client";

import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

// const Login: FC<any> = ({ name, setName, setJoined }: any) => {
const Login: FC<any> = ({ name, setName, join }: any) => {
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

//   const join = () => {
//     socket.emit("join", { name }, (names: any) => {
//       // console.log("names >>>", names);
//       setJoined(true);
//     });
//   };
  
  return (
    <div className="container mx-auto">
      <div className="grid text-white text-center">
        <h1>Welcome</h1>

        <h6 className="m-5">Please Insert Your Name</h6>
        <div className="">
          <input
            className="text-white  w-full mb-5 bg-slate-800 p-2 "
            type="text"
            value={name}
            onChange={(e) => onChangeName(e)}
            onKeyUp={(e) => (e.key === "Enter" ? join() : null)}
          />
        </div>
        <div>
          <button
            onClick={join}
            type="button"
            className=" w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
