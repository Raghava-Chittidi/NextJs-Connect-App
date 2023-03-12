const ImageCard = ({ title, images }: { title: string; images: string[] }) => {
  return (
    <div className="bg-white rounded-lg p-2 pt-3 w-fit">
      <div className="text-xl font-bold mb-3">{title}</div>
      <div className="grid grid-cols-3">
        {images.map((image: string) => (
          <img
            key={Math.random() * Math.random()}
            src={image}
            alt=""
            className="w-[8rem] h-[8rem] rounded-lg m-1"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
