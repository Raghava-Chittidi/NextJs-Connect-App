import {
  TvIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  Cog8ToothIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
  HomeIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import MenuIcon from "./MenuIcon";

const Menu = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="mt-5 cursor-pointer ml-3 fixed top-12 w-5 md:w-[20vw]">
      <MenuIcon href="/" name="Home">
        <HomeIcon className="w-6 h-6 fill-blue-600 inline" />
      </MenuIcon>
      <div className="menu-icon w-10 md:w-full">
        <Link href={`/users/${userData.id}`} className="flex w-full">
          <img
            src={userData.image}
            alt={userData.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="ml-3 font-semibold hidden md:inline">
            {userData.name}
          </span>
        </Link>
      </div>
      <hr className="w-full border border-gray-300 my-3" />
      <MenuIcon href="/" name="Watch">
        <TvIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Friends">
        <UsersIcon className="w-6 h-6 fill-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Groups">
        <UserGroupIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Marketplace">
        <BuildingStorefrontIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Games">
        <ComputerDesktopIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <hr className="w-full border border-gray-300 my-3" />
      <MenuIcon href="/" name="Events">
        <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Memories">
        <ClockIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <MenuIcon href="/" name="Settings">
        <Cog8ToothIcon className="w-6 h-6 text-blue-600" />
      </MenuIcon>
      <hr className="w-full border border-gray-300 my-3" />
    </div>
  );
};

export default Menu;
