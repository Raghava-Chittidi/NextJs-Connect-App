import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";

const PostActions = () => {
  return (
    <div className="flex mt-2 items-center">
      <button className="new-post-icon">
        <HandThumbUpIcon className="h-5 w-5 mr-2" />
        Like
      </button>
      <button className="new-post-icon">
        <ShareIcon className="h-5 w-5 mr-2" />
        Share
      </button>
    </div>
  );
};

export default PostActions;
