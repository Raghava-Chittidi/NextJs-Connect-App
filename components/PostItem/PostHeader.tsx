import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";
import DeletePostModal from "../Modal/DeletePost";
import EditPostModal from "../Modal/EditPost";

const PostHeader = ({
  date,
  description,
  image,
  id,
  userName,
  userImage,
  userId,
}: {
  date: string;
  description: string;
  image: string | null;
  id: string;
  userName: string;
  userImage: string;
  userId: string;
}) => {
  const formatDate = (oldDate: string) => {
    let strArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(oldDate);
    let d = date.getDate();
    let m = strArray[date.getMonth()];

    let hr = date.getHours();
    let min: string | number = date.getMinutes();
    if (min < 10) {
      min = "0" + min.toString();
    }
    let ampm = "AM";
    if (hr > 12) {
      hr -= 12;
      ampm = "PM";
    }
    return `${m} ${d} at ${hr}:${min} ${ampm}`;
  };

  const { userData, token } = useContext(AuthContext);
  const router = useRouter();

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  if (!userName) {
    userName = userData.name;
  }

  const editPostHandler = async (description: string, image: string | null) => {
    try {
      const response = await axios.patch(
        "/api/posts/edit",
        {
          description: description,
          image: image,
          id: id,
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

  const deletePostHandler = async (id: string) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
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
    <div className="flex items-center">
      {editModal && (
        <EditPostModal
          closeModal={() => setEditModal(false)}
          getInput={editPostHandler}
          intitalDesc={description}
          initialImage={image}
        />
      )}
      {deleteModal && (
        <DeletePostModal
          closeModal={() => setDeleteModal(false)}
          onDelete={deletePostHandler}
          id={id}
        />
      )}
      <img
        className="h-12 w-12 min-w-12 rounded-full"
        src={userImage}
        alt={userName}
      />
      <div>
        <Link
          href={`/users/${userId}`}
          className="ml-2 text-lg font-bold hover:underline"
        >
          {userName}
        </Link>
        <h2 className="ml-2 text-gray-500 text-xs sm:text-sm">
          {formatDate(date)}
        </h2>
      </div>

      {userName === userData.name && (
        <div className="space-x-4 ml-auto mb-5 flex flex-col sm:flex-row text-sm sm:text-base">
          <button
            className="hover:underline"
            onClick={() => setEditModal(true)}
          >
            Edit
          </button>
          <button
            className="hover:underline"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
