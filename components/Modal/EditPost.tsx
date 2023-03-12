import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BackDrop from "../Backdrop/BackDrop";

const Modal = (props: {
  onClose: () => void;
  getInput: (description: string, image: string | null) => void;
  intitalDesc: string;
  initialImage: string | null;
}) => {
  const textInputRef = useRef<null | HTMLTextAreaElement>(null);
  const imageInputRef = useRef<null | HTMLInputElement>(null);
  const [addImage, setAddImage] = useState(false);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const description = textInputRef.current!.value;
    const image = imageInputRef.current ? imageInputRef.current.value : null;
    props.getInput(description, image);
    if (description.length > 0) {
      props.onClose();
    }
  };

  const modal = (
    <form onSubmit={formSubmitHandler}>
      <div className="flex flex-col z-20 w-1/2 md:w-[35%] items-center fixed shadow-2xl top-1/4 left-1/4 md:left-[32.5%] bg-white rounded-xl h-[55%] border border-gray-200">
        <header className="text-2xl font-bold py-3">Edit Post</header>
        <XMarkIcon
          className="h-8 w-8 absolute right-2 top-2 cursor-pointer rounded-full hover:bg-gray-300 transition-all duration-200"
          onClick={props.onClose}
        />
        <hr className="border w-full border-gray-200" />
        <textarea
          className="w-full h-full placeholder:text-2xl outline-none text-2xl mt-3 resize-none p-4"
          placeholder="What's on your mind?"
          ref={textInputRef}
          autoFocus
          defaultValue={props.intitalDesc ? props.intitalDesc : ""}
        />
        {!addImage && !props.initialImage && (
          <button
            className="rounded-lg h-16 w-[95%] border border-gray-300"
            type="submit"
            onClick={() => setAddImage(true)}
          >
            Add Photo
          </button>
        )}
        {(addImage || props.initialImage) && (
          <input
            className="w-[95%] h-16 pl-2 border-2 border-gray-400"
            type="text"
            placeholder="Image Link/Address"
            autoFocus
            ref={imageInputRef}
            defaultValue={props.initialImage ? props.initialImage : ""}
          />
        )}
        <button
          className="mt-3 bg-blue-500 rounded-lg h-16 w-[95%] text-white hover:bg-blue-600 mb-5"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
  return createPortal(modal, document.getElementById("modal")!);
};

const EditPostModal = (props: {
  closeModal: () => void;
  getInput: (description: string, image: string | null) => void;
  intitalDesc: string;
  initialImage: string | null;
}) => {
  return (
    <>
      <BackDrop
        onClick={props.closeModal}
        className={"w-full h-screen bg-white opacity-70 fixed z-20 top-0"}
      />
      <Modal
        onClose={props.closeModal}
        getInput={props.getInput}
        intitalDesc={props.intitalDesc}
        initialImage={props.initialImage}
      />
    </>
  );
};

export default EditPostModal;
