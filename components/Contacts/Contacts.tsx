import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";
import { IFriend } from "../../pages/users/[userId]";
import Chat from "../Modal/Chat";

export interface IChat {
  _id: string;
  members: string[];
}

const Contacts = ({ chats }: { chats: IChat[] }) => {
  const { userData, token } = useContext(AuthContext);

  // const [socket, setSocket] = useState<null | Socket<
  //   DefaultEventsMap,
  //   DefaultEventsMap
  // >>(null);

  const [contacts, setContacts] = useState<[] | IFriend[]>([]);
  const [chat, setChat] = useState<null | {
    name: string;
    image: string;
    id: string;
    chatId: string | undefined;
  }>(null);

  // useEffect(() => {
  //   const intitalizer = async () => {
  //     await fetch("/api/socket");
  //     setSocket(io());
  //   };
  //   intitalizer();
  // }, []);

  useEffect(() => {
    const getFriends = async () => {
      const response = await axios.get(`/api/friends/${userData.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setContacts(response.data.friends);
    };
    getFriends();
  }, []);

  return (
    <>
      <div className="mt-5 mr-3 fixed top-12 right-2 w-[20vw] hidden md:block">
        <div className="flex items-center justify-between mb-2">
          <span className="ml-2 font-semibold text-lg">Contacts</span>
          <div className="flex space-x-1 lg:space-x-3">
            <VideoCameraIcon className="contacts-icon" />
            <MagnifyingGlassIcon className="contacts-icon" />
            <EllipsisHorizontalIcon className="contacts-icon" />
          </div>
        </div>
        <div>
          {contacts.map((contact) => (
            <div
              className="menu-icon cursor-pointer"
              key={contact._id.toString()}
              onClick={() =>
                setChat({
                  name: contact.name,
                  image: contact.image,
                  id: contact._id.toString(),
                  chatId: chats
                    .find(
                      (chat) =>
                        chat.members.includes(contact._id.toString()) &&
                        chat.members.includes(userData.id)
                    )
                    ?._id.toString(),
                })
              }
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="w-6 h-6 rounded-full"
              />
              <Link href="/" className="ml-3 font-semibold">
                {contact.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {chat && <Chat chat={chat} close={() => setChat(null)} />}
    </>
  );
};

export default Contacts;
