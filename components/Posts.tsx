import { IComment } from "../models/Comment";
import PostItem from "./PostItem/PostItem";

export interface Post {
  _id: string;
  description: string;
  user: { _id: string; name: string; image: string };
  image: string;
  date: string;
  comments: [IComment];
}

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default Posts;
