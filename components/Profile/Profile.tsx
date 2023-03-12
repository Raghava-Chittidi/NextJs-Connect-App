import { CheckIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";

const Profile = ({
  name,
  image,
  friendIds,
}: {
  name: string;
  image: string;
  friendIds: string[];
}) => {
  const { userData, token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  const addFriendHandler = async () => {
    try {
      const response = await axios.post(
        "/api/friends/add",
        {
          id: userData.id,
          friendName: name,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        router.push("/");
      } else {
        // Create Modal
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  const removeFriendHandler = async () => {
    try {
      const response = await axios.post(
        "/api/friends/remove",
        {
          id: userData.id,
          friendName: name,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        router.push("/");
      } else {
        // Create Modal
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  return (
    <>
      <div className="w-full relative top-14 h-[50vh] bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
      <div className="bg-white relative top-14 h-12 w-full">
        <div className="ml-[15%] mr-10 flex justify-evenly h-full items-center text-blue-700 font-semibold text-xs md:text-base">
          <span>Timeline</span>
          <span>About</span>
          <span className="flex items-center">
            Friends
            <div className="bg-gray-200 w-6 text-center ml-2 rounded-md">
              {friendIds.length}
            </div>
          </span>
          <span>Photos</span>
          <span>Archive</span>
        </div>
      </div>
      <div className="flex absolute left-[3%] top-[75%] md:top-[70%]">
        <img
          src={image}
          alt={name}
          className="w-[7.5rem] h-[7.5rem] md:w-[10rem] md:h-[10rem] rounded-full outline outline-white"
        />
        <span className="text-white text-2xl absolute bottom-[25%] left-[105%] md:text-3xl">
          {name}
        </span>
      </div>
      {userData.name !== name && !friendIds.includes(userData.id) && (
        <button
          className="text-blue-700 absolute right-[5%] top-[90%] bg-white rounded-lg p-2 flex items-center"
          onClick={addFriendHandler}
        >
          <PlusSmallIcon className="w-5 h-5 mr-1" />
          Add Friend
        </button>
      )}
      {userData.name !== name && friendIds.includes(userData.id) && (
        <button
          className="text-blue-700 absolute right-[5%] top-[90%] bg-white rounded-lg p-2 flex items-center text-sm sm:text-base"
          onClick={removeFriendHandler}
        >
          <CheckIcon className="w-5 h-5 mr-2" />
          Added
        </button>
      )}
    </>
  );
};

export default Profile;
