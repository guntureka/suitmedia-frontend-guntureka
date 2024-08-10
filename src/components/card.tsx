import { Data } from "@/types/api";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const Card = ({ data }: { data: Data }) => {
  return (
    <div className="grid h-96 w-full grid-rows-2 rounded-xl shadow-md">
      <div className="relative h-full w-full">
        <img
          src={data?.medium_image[0]?.url ?? "./bg.jpg"}
          alt={data?.medium_image?.[0]?.file_name ?? "./bg.jpg"}
          className="absolute inset-0 h-full w-full rounded-t-xl object-cover"
          loading="lazy"
        />
      </div>
      <div className="relative flex h-full w-full flex-col items-start justify-center gap-2 overflow-hidden p-6">
        <span className="text-sm text-gray-500">
          {moment(data.published_at!).format("D MMMM Y").toUpperCase()}
        </span>
        <p className="relative line-clamp-3 w-full text-start font-semibold">
          {data.title}
        </p>
      </div>
    </div>
  );
};

export default Card;
