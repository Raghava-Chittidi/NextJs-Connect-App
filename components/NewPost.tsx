import { VideoCameraIcon, CameraIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import CreatePostModal from "./Modal/CreatePost";
import AuthContext from "../store/AuthContext";

const NewPost = () => {
  const router = useRouter();

  const postInputRef = useRef<null | HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const createPostHandler = async (
    description: string,
    image: string | null
  ) => {
    try {
      const response = await axios.post(
        "/api/posts/create",
        {
          description: description,
          image: image,
        },
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
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

  return (
    <div className="bg-white rounded-xl mb-5">
      {modal && (
        <CreatePostModal
          closeModal={() => setModal(false)}
          getInput={createPostHandler}
        />
      )}
      <div className="flex h-20 w-full">
        <div>
          <img
            className="w-10 h-10 min-w-[2.5rem] rounded-full mt-5 ml-5"
            src={authCtx.userData.image}
            alt={authCtx.userData.name}
          />
        </div>
        <input
          className="bg-gray-200 rounded-full m-5 ml-3 pl-5 h-10 hover:bg-[#dbdde1] transition-all duration-200 w-full cursor-pointer caret-transparent outline-none placeholder:text-sm sm:placeholder:text-base"
          type="text"
          placeholder="What's on your mind?"
          ref={postInputRef}
          onClick={() => setModal(true)}
        />
      </div>
      <hr />
      <div className="flex justify-around items-center h-16">
        <div className="w-1/4">
          <button className="new-post-icon">
            <VideoCameraIcon className="h-5 w-5 fill-red-500 mr-1" />
            <span className="hidden sm:inline">Video</span>
          </button>
        </div>
        <div className="w-1/4">
          <button className="new-post-icon">
            <CameraIcon className="h-5 w-5 fill-green-500 mr-1" />
            <span className="hidden sm:inline">Photo</span>
          </button>
        </div>
        <div className="w-1/4">
          <button className="new-post-icon">
            <FaceSmileIcon className="h-5 w-5 mr-1 fill-yellow-500" />
            <span className="hidden sm:inline">Feeling</span>
          </button>
        </div>
      </div>
      <div className="mx-6"></div>
    </div>
  );
};

export default NewPost;
