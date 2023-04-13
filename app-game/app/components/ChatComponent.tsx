"use client";

import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const ChatComponent: FC<any> = ({ name }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [textMessage, setTextMessage] = useState<string>("");
  // const [name, setName] = useState<string>(userName);

  useEffect(() => { 
    socket.emit("join", { name }, (names: any) => {
      // console.log("names >>>", names);
      // setJoined(true);
    });
 
    socket.emit("findAllMessages", {}, (response: any) => {
      console.log("response >>>>", response);
      setMessages(response);
    });

    return () => {
      socket.off("findAllMessages");
    };
  }, [name]);

  socket.on("message", (message: any) => {
    console.log("message >>>", message);
    console.log("messages ==>>>", messages);
    setMessages([...messages, message]);
  });
 
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value);
  };
  const sendMessage = () => { 
    console.log("sendMessage>>>", name, textMessage);
    socket.emit(
      "createMessage",
      { name, text: textMessage },
      (response: any) => {
        // setMessages(response);
        setTextMessage("");
      }
    );
  };
  return (
    <> 
      <div className="h-48 max-h-full overflow-auto">
        {messages?.length &&
          messages.map((msg: any, index: number) => {
            const { name, text } = msg;
            return (
              <p className="text-white" key={index}>
                [{name}] : {text}
              </p>
            );
          })}
      </div>
      <div className="grid grid-cols-3 gap-4 ">
       
          <input
            type="text"
            value={textMessage}
            onChange={(e) => onChange(e)}
            onKeyUp={(e) => (e.key === "Enter" ? sendMessage() : null)}
            className="col-span-2 text-sm h-10 rounded-lg text-white bg-slate-800"
          />
 
          <button
            onClick={sendMessage}
            type="button"
            className="max-w-1 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Send
          </button>
        
      </div>
    </>
  );
};

export default ChatComponent;
