import PostActions from "./PostActions";
import PostAddComment from "./PostAddComment";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostComments from "./PostComments";
import { Post } from "../Posts";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <li className="bg-white rounded-xl mb-5 p-5 pb-0">
      <div className="">
        <PostHeader
          userName={post.user.name}
          userImage={post.user.image}
          userId={post.user._id}
          date={post.date}
          description={post.description}
          image={post.image}
          id={post._id}
        />
        <PostContent description={post.description} image={post.image} />
        <PostActions />
        <hr className="mt-2" />
        {post.comments && <PostComments comments={post.comments} />}
        <PostAddComment id={post._id} />
      </div>
    </li>
  );
};

export default PostItem;
