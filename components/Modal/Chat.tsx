import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export interface IMessage {
  _id: string;
  chatId: string;
  sender: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const Chat = ({
  close,
  chat,
}: {
  close: () => void;
  chat: { id: string; name: string; image: string; chatId: string | undefined };
}) => {
  const messageInputRef = useRef<null | HTMLInputElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [allMessages, setAllMessages] = useState<[] | IMessage[]>([]);

  const sendMessageHandler = async () => {
    const message = messageInputRef.current?.value;
    if (message!.length === 0 || !message) {
      return;
    }

    try {
      messageInputRef.current!.value = "";
      const response = await axios.post(
        "/api/messages",
        {
          message,
          sender: authCtx.userData.id,
          receiver: chat.id,
          chatId: chat.chatId || null,
        },
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      console.log(response);
      // initializer();
      if (response.status === 201) {
      } else {
        // Create Modal
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`/api/chat/${chat?.chatId}`, {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      setAllMessages(response.data.messages);
    };
    getMessages();
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    const initializer = async () => {
      fetch("/api/socket");
      socket = io();
    };
    initializer();
  }, []);

  useEffect(() => {
    socket.removeAllListeners("message");
    socket.off("message").once("message", (data) => {
      setAllMessages((prevState) => [...prevState, data.message]);
      socket.removeAllListeners("message");
    });
  }, [allMessages]);

  return (
    <div className="bg-white fixed bottom-0 md:right-[5%] lg:right-[10%] xl:right-[15%] h-[60%] w-[40vh] shadow-2xl rounded-t-lg border border-gray-200 hidden md:block">
      <header>
        <div className="bg-white h-12 border-b-2 border-b-gray-300 rounded-t-lg flex items-center p-2">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={chat.image}
            alt={chat.name}
          />
          <Link
            href={`/users/${chat.id}`}
            className="font-semibold hover:underline"
          >
            {chat.name}
          </Link>
        </div>
        <div className="absolute top-2 right-1 flex items-center space-x-2">
          <PhoneIcon className="w-7 h-7 fill-blue-500 cursor-pointer hover:bg-gray-300 transition-all duration-200 rounded-full p-1" />
          <VideoCameraIcon className="w-7 h-7 fill-blue-500 cursor-pointer hover:bg-gray-300 transition-all duration-200 rounded-full p-1" />
          <XMarkIcon
            className="w-7 h-7 cursor-pointer fill-blue-500 rounded-full hover:bg-gray-300 transition-all duration-200"
            onClick={close}
          />
        </div>
      </header>
      <div className="overflow-y-scroll h-[46vh] overflow-x-hidden">
        {allMessages.map((message) => (
          <div key={message._id + Math.random().toString()} ref={scrollRef}>
            <p
              className={
                message.sender === authCtx.userData.id ? "sender" : "receiver"
              }
            >
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <footer>
        <div className="absolute bottom-0 left-1 flex items-center w-full">
          <PlusCircleIcon className="w-10 h-10 fill-blue-500 text-white cursor-pointer" />
          <input
            type="text"
            placeholder="Aa"
            className="bg-gray-200 rounded-full pl-3 pr-3 h-8 mx-2 hover:bg-[#dbdde1] w-full transition-all duration-200"
            ref={messageInputRef}
          />
          <PaperAirplaneIcon
            className="w-8 h-8 text-blue-500 mr-3 cursor-pointer"
            onClick={sendMessageHandler}
          />
        </div>
      </footer>
    </div>
  );
};

export default Chat;
