import { queryOptions } from "@tanstack/react-query";
import { getIdeas } from "./api";
import { ApiInput } from "@/types/api";

export const useIdeasQuery = ({
  page = 1,
  page_size = 20,
  sort = "published_at",
  append = ["medium_image", "small_image"],
}: ApiInput) => {
  return queryOptions({
    queryKey: ["ideas"],
    queryFn: () => getIdeas({ page, page_size, sort, append }),
  });
};
