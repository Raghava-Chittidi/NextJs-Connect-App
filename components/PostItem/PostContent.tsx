const PostContent = ({
  description,
  image,
}: {
  description: string;
  image: string | null;
}) => {
  return (
    <div className="mt-5">
      <p>{description}</p>
      {image && <img className="max-w-1/2 m-auto mt-2" src={image} alt="" />}
    </div>
  );
};

export default PostContent;
