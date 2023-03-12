import { useContext, useEffect } from "react";
import Header from "../components/Header";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import Post from "../models/Post";
import AuthContext from "../store/AuthContext";
import connection from "../util/dbConnect";
import Menu from "../components/Menu/Menu";
import Contacts from "../components/Contacts/Contacts";
import Comment from "../models/Comment";
import Chat from "../models/Chat";
import User from "../models/User";

const Home = ({ posts, chats }: { posts: string; chats: string }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <p className="text-center">Loading...</p>;
  }

  const currentPosts = JSON.parse(posts);
  return (
    <>
      <Header />
      <Menu />
      <div className="flex flex-col justify-center items-center m-auto mt-12">
        <div className="w-3/5 mt-5 md:w-2/5">
          <NewPost />
          <Posts posts={currentPosts} />
        </div>
      </div>
      <Contacts chats={JSON.parse(chats)} />
    </>
  );
};

export const getStaticProps = async () => {
  await connection;
  let posts = await Post.find()
    .sort({ _id: "desc" })
    .populate("user", "-password")
    .populate({
      path: "comments",
      populate: [{ path: "user", select: "name image", model: User }],
      model: Comment,
    });

  let chats = await Chat.find();

  if (!posts) {
    posts = [];
  }
  // console.log(posts);
  return {
    props: {
      posts: JSON.stringify(posts),
      chats: JSON.stringify(chats),
    },
  };
};

export default Home;
