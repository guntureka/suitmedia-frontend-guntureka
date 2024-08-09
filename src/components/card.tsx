import { Data } from "@/types/api";

const Card = ({ data }: { data: Data }) => {
  return (
    <div className="flex h-40 flex-col">
      <div className="relative h-[50%] w-full">
        <img
          src={data?.medium_image[0].url ?? "./bg.jpg"}
          alt={data?.medium_image?.[0]?.file_name ?? "./bg.jpg"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Card;
