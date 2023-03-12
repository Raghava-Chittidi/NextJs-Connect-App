import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BackDrop from "../Backdrop/BackDrop";

const Modal = (props: {
  onClose: () => void;
  onDelete: (id: string) => void;
  id: string;
}) => {
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onDelete(props.id);
  };

  const modal = (
    <form onSubmit={formSubmitHandler}>
      <div className="flex flex-col z-20 w-1/2 md:w-[35%] items-center fixed shadow-2xl top-1/4 left-1/4 md:left-[32.5%] bg-white rounded-xl h-[55%] border border-gray-200">
        <header className="text-2xl font-bold py-3">Delete Post</header>
        <XMarkIcon
          className="h-8 w-8 absolute right-2 top-2 cursor-pointer rounded-full hover:bg-gray-300 transition-all duration-200"
          onClick={props.onClose}
        />
        <hr className="border w-full border-gray-200" />
        <span className="text-2xl p-4">
          Are you sure you want to delete this post?
        </span>
        <button
          className="bg-blue-500 rounded-lg h-12 w-[95%] text-white hover:bg-blue-600 mb-5 mt-auto"
          type="submit"
        >
          Delete
        </button>
      </div>
    </form>
  );
  return createPortal(modal, document.getElementById("modal")!);
};

const DeletePostModal = (props: {
  closeModal: () => void;
  onDelete: (id: string) => void;
  id: string;
}) => {
  return (
    <>
      <BackDrop
        onClick={props.closeModal}
        className={"w-full h-screen bg-white opacity-70 fixed z-20 top-0"}
      />
      <Modal
        onClose={props.closeModal}
        onDelete={props.onDelete}
        id={props.id}
      />
    </>
  );
};

export default DeletePostModal;
