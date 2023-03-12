import { GetServerSideProps } from "next";
import connection from "../../util/dbConnect";
import User from "../../models/User";
import Posts from "../../components/Posts";
import Header from "../../components/Header";
import Profile from "../../components/Profile/Profile";
import NewPost from "../../components/NewPost";
import Photos from "../../components/Profile/Photos";
import Friends from "../../components/Profile/Friends";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { IUser } from "../../models/User";
import mongoose from "mongoose";
import Comment from "../../models/Comment";

export interface IFriend extends IUser {
  _id: mongoose.Types.ObjectId;
}

const ProfilePage = ({ user }: { user: string }) => {
  const { userData } = useContext(AuthContext);
  const currentUser = JSON.parse(user);

  return (
    <>
      <Header />
      <div className="xl:w-[70%] relative m-auto">
        <Profile
          name={currentUser.name}
          image={currentUser.image}
          friendIds={currentUser.friends.map(
            (friend: { _id: string }) => friend._id
          )}
        />
      </div>
      <div className="flex justify-center mt-[5rem] gap-8">
        <div>
          <div className="sticky top-20 space-y-5 hidden md:block">
            <Photos />
            <Friends />
          </div>
        </div>
        <div className="w-4/5 md:w-2/5">
          {currentUser._id === userData.id && <NewPost />}
          <Posts posts={currentUser.posts} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params!.userId;
  await connection;
  const user = await User.findById(userId)
    .select("-password")
    .populate("friends", "_id")
    .populate({
      path: "posts",
      populate: [
        { path: "user", select: "-password" },
        {
          path: "comments",
          select: "user comment",
          model: Comment,
          populate: [{ path: "user", select: "name image" }],
        },
      ],
      options: { sort: { _id: "desc" } },
    });
  // console.log(JSON.stringify(user));
  return {
    props: { user: JSON.stringify(user) },
  };
};
