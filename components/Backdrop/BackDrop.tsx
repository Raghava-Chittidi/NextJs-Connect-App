import { createPortal } from "react-dom";

const BackDrop = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) => {
  const backdrop = <div className={className} onClick={onClick}></div>;
  return createPortal(backdrop, document.getElementById("backdrop")!);
};

export default BackDrop;
