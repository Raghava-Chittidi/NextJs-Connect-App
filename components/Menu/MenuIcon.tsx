import Link from "next/link";

const MenuIcon = ({
  children,
  href,
  name,
}: {
  children: React.ReactNode;
  href: string;
  name: string;
}) => {
  return (
    <div className="menu-icon w-full">
      <Link href={href} className="flex w-full">
        {children}
        <span className="ml-3 font-semibold hidden md:inline">{name}</span>
      </Link>
    </div>
  );
};

export default MenuIcon;
