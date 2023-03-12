import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";

const PostAddComment = ({ id }: { id: string }) => {
  const commentInputRef = useRef<null | HTMLInputElement>(null);
  const router = useRouter();

  const { userData, token } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const addCommentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const comment = commentInputRef.current?.value;
    if (!comment) {
      return;
    }
    try {
      const response = await axios.post(
        `/api/posts/${id}`,
        { comment, userId: userData.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        commentInputRef.current!.value = "";
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
    <form onSubmit={addCommentHandler}>
      <div className="flex h-20 w-full">
        <div>
          <img
            className="w-10 h-10 min-w-[2.5rem] rounded-full mt-5 ml-1"
            src={userData.image}
            alt={userData.name}
          />
        </div>
        <input
          className="bg-gray-200 rounded-full ml-3 mt-5 pl-5 h-10 hover:bg-[#dbdde1] w-full transition-all duration-200 placeholder:text-sm sm:placeholder:text-base"
          type="text"
          placeholder="Write a comment..."
          ref={commentInputRef}
        />
      </div>
    </form>
  );
};

export default PostAddComment;
