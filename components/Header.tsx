import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);

  if (!authCtx.isLoggedIn) {
    return <></>;
  }

  return (
    <>
      {dropdown && (
        <div
          className="w-full h-screen z-20 absolute top-0 bg-transparent"
          onClick={() => setDropdown(false)}
        ></div>
      )}
      <header className="w-full top-0 fixed z-10">
        <div className="h-[3.5rem] flex items-center justify-between bg-white shadow-md">
          <div className="text-blue-500 text-2xl ml-5 font-bold cursor-pointer md:text-3xl w-fit">
            <Link href="/">facebook</Link>
          </div>
          <div className="w-1/2 md:mr-14 xl:mr-5">
            <MagnifyingGlassIcon className="w-5 h-5 absolute top-5 ml-4 md:top-4 md:ml-9 md:mt-[0.2rem]" />
            <input
              type="search"
              placeholder="Search Facebook"
              className="bg-[#f0f2f5] rounded-full h-8 pl-8 w-5/6 ml-2 md:h-10 md:pl-10 md:ml-6 placeholder:text-sm sm:placeholder:text-base"
            />
          </div>
          <div className="cursor-pointer">
            <div
              className="flex items-center mr-3"
              onClick={() => setDropdown((prevState) => !prevState)}
            >
              <img
                className="w-10 h-10 min-w-[2.5rem] rounded-full hover:opacity-90"
                src={authCtx.userData.image}
                alt={authCtx.userData.name}
              />
              <div className="bg-gray-200 w-3 h-3 rounded-full absolute right-3 top-9 outline outline-white">
                <ChevronDownIcon className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {dropdown && (
        <div className="fixed top-14 right-3 shadow-xl z-30 text-base md:text-lg cursor-pointer ">
          <div className="dropdown-option">
            <UserCircleIcon className="w-4 h-4 md:w-6 md:h-6 mr-2" />
            <Link href={`/users/${authCtx.userData.id}`}>Profile</Link>
          </div>
          <div className="dropdown-option">
            <ArrowLeftOnRectangleIcon className="w-4 h-4 md:w-6 md:h-6 mr-2" />
            <Link href="/auth" onClick={authCtx.logout}>
              Logout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
