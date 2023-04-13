"use client";

import { FC, useEffect, useState } from "react";
import Login from "./components/Login";
import GameStarter from "./components/GameStarter";
import ChatComponent from "./components/ChatComponent";
import ChartComponent from "./components/ChartComponent";
import Ranking from "./components/Ranking";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

interface pageProps {}

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const page: FC<pageProps> = ({}) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    points: 0,
    time: "",
  });
  const [joined, setJoined] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const [textMessage, setTextMessage] = useState<string>("");
  const [name, setName] = useState<string>("Don");
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [speed, setSpeed] = useState<number>(0);
  const [isUp, setIsUp] = useState<boolean>(true);
  // const [isWinner, setIsWinner] = useState<boolean>(false);

  const [arrayLabels, setArrayLabels] = useState<any>([]);
  const [arrayPoints, setArrayPoints] = useState<any>([]);

  const [currentRound, setCurrentRound] = useState<any>([
    {
      name: "Don",
      point: 0,
      multiplier: 0,
      score: null,
      totalPoints: 1000,
      time: "21:30",
    },
    {
      name: "CPU 1",
      point: 0,
      multiplier: 0,
      score: null,
      totalPoints: 1000,
      time: "21:30",
    },
    {
      name: "CPU 2",
      point: 0,
      multiplier: 0,
      score: null,
      totalPoints: 1000,
      time: "21:30",
    },
    {
      name: "CPU 3",
      point: 0,
      multiplier: 0,
      score: null,
      totalPoints: 1000,
      time: "21:30",
    },
    {
      name: "CPU 4",
      point: 0,
      multiplier: 0,
      score: null,
      totalPoints: 1000,
      time: "21:30",
    },
  ]);
  const [datasetValues, setDatasetValues] = useState<any>([]);

  const join = () => {
    setJoined(true);
    setUserInfo({
      name,
      points: 1000,
      time: "21:30",
    });
  };

  useEffect(() => {
    socket.emit("findAllMessages", {}, (response: any) => {
      // console.log("response >>>>", response);
      setMessages(response);
    });

    const arrNumbers = Array.from(Array(100).keys());
    setArrayPoints(arrNumbers);
    setArrayLabels(" ".repeat(arrNumbers.length));
    return () => {
      socket.off("findAllMessages");
    };
  }, []);

  const updateUsers = async () => {
    const newRound = await currentRound.map((data: any) => {
      const randomNumber = randomNumberInRange(1, 10);
      let isWinnerGen = randomNumber > 5;
      console.log(
        "isWinnerGen >>>",
        isWinnerGen,
        randomNumber,
        data.point,
        data.multiplier
      );
      return {
        ...data,
        score: data.score + (isWinnerGen ? data.point * data.multiplier : 0),
      };
    });
    setCurrentRound(newRound);
  };
  const updateUserInfo = () => {
    setUserInfo({
      ...userInfo,
      points: userInfo.points + points * multiplier,
    });
  };

  useEffect(() => {
    if (isEnded) {
      updateUserInfo();
      updateUsers();
    }
  }, [isEnded]);

  socket.on("message", (message: any) => {
    // console.log("message >>>", message);
    // console.log("messages ==>>>", messages);
    setMessages([...messages, message]);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value);
  };
  const sendMessage = () => {
    // console.log("sendMessage>>>", name, textMessage);
    socket.emit(
      "createMessage",
      { name, text: textMessage },
      (response: any) => {
        setTextMessage("");
      }
    );
  };

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const setNewRound = () => {
    const newRound = currentRound.map((data: any) => {
      return {
        ...data,
        point: data?.name === name ? points : randomNumberInRange(1, 900),
        multiplier:
          data?.name === name ? multiplier : randomNumberInRange(1, 25),
      };
    });
    setCurrentRound(newRound);
  };

  const generateNumberArray = () => {
    const incrementer = randomNumberInRange(0.1, 0.9);
    const numberStart = randomNumberInRange(1, 5);
    const maxLength = randomNumberInRange(20, 50);
    let arrNumbers: any = [];
    let newNumber = numberStart;
    for (let i = 0; i <= maxLength; i++) {
      arrNumbers.push(newNumber);
      // newNumber = parseFloat((newNumber * 1.001).toFixed(2));
      newNumber = newNumber + incrementer;
    }
    console.log("arrNumbers >>>>", arrNumbers);
    return arrNumbers;
  };

  const curveFormula = (startPoint: number, endPoint:number) => {
    
    return startPoint + (endPoint - startPoint) * 0.33;;
  };
  const startGame = async () => {
    setNewRound();
    const newPoints = userInfo.points - points;
    setUserInfo({ ...userInfo, points: newPoints });

    setIsStarted(true);

    const newDatasetValues = generateNumberArray();
    ///////// 
    setDatasetValues(newDatasetValues);
    // setDatasetValues([
    //   // 0,
    //   // 0,
    //   // 0,
    //   // 0,
    //   // 0,
    //   // 0,
    //   // curveFormula(0, 2),
    //   // 2,
    //   // curveFormula(2,2.35),
    //   // 2.35,
    //   // curveFormula(2.35,2.69),
    //   // 2.69,
    //   // curveFormula(2.69,3.04),
    //   // 3.04, 
    //   2, 2.35, 2.69, 3.04, 3.38, 3.73, 4.07, 4.42, 4.76, 5.11, 5.46, 5.8, 6.15,
    //   6.49, 6.84, 7.18, 7.53, 7.88, 8.22, 8.57, 8.91, 9.26, 9.6, 9.64,
    // ]);
  };

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      const fixedValue: any = parsedValue.toFixed(2);
      onChange(fixedValue);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto text-white ">
        <div className="grid grid-cols-2 gap-4 ">
          {/* top left - start */}
          <div className="bg-gray-700 rounded-lg p-4">
            {!joined ? (
              <Login name={name} setName={setName} join={join} />
            ) : (
              <GameStarter
                currentRound={currentRound}
                speed={speed}
                setSpeed={setSpeed}
                startGame={startGame}
                multiplier={multiplier}
                setMultiplier={setMultiplier}
                points={points}
                setPoints={setPoints}
              />
            )}
          </div>
          {/* top left - end */}

          {/* top right - start */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 h-10 bg-gradient-to-l from-gray-700 via-gray-900 to-gray-950 rounded-lg">
                {userInfo.points ? userInfo.points : "-"}
              </div>
              <div className="p-2 h-10 bg-gradient-to-l from-gray-700 via-gray-900 to-gray-950 rounded-lg">
                {userInfo.name}
              </div>
              <div className="p-2 h-10 bg-gradient-to-l from-gray-700 via-gray-900 to-gray-950 rounded-lg">
                {userInfo.time}
              </div>
            </div>
            {datasetValues && (
              <ChartComponent
                speed={speed}
                // isStarted={isStarted}
                // setIsStarted={setIsStarted}
                isEnded={setIsEnded}
                setIsEnded={setIsEnded}
                datasetValues={datasetValues}
              />
            )}
          </div>
          {/* top right - end */}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {/* bottom left - start */}
          <Ranking currentRound={currentRound} />
          {/* bottom left - end */}

          {/* bottom right - start */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white">Chat</h2>
            {joined && <ChatComponent name={name} />}
          </div>

          {/* bottom right - end */}
        </div>
      </div>
    </div>
  );
};

export default page;
