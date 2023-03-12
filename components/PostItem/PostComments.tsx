import Link from "next/link";
import { IComment } from "../../models/Comment";

const PostComments = ({ comments }: { comments: [IComment] }) => {
  return (
    <div className="break-words overflow-x-hidden">
      {comments.map((comment) => (
        <div className="flex items-start" key={comment._id.toString()}>
          <img
            className="w-10 h-10 min-w-[2.5rem] rounded-full ml-1 m-2"
            src={comment.user.image}
            alt={comment.user.name}
          />
          <div className="my-2 bg-gray-200 rounded-lg p-2">
            <div className="font-semibold text-sm hover:underline cursor-pointer">
              <Link href={`/users/${comment.user._id}`}>
                {comment.user.name}
              </Link>
            </div>
            <span className="text-sm md:text-base">{comment.comment}</span>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default PostComments;
