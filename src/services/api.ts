import { ApiInput, Data, Fetch } from "@/types/api";
import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_API_SERVER_URL;
const axiosInstance = axios.create({ baseURL: SERVER_BASE_URL });

export const getIdeas = async ({ page, page_size, sort, append }: ApiInput) => {
  const url =
    `api/ideas?page[number]=${page ?? ""}&page[size]=${page_size ?? ""}${append ? append.map((v) => `&append[]=${v}`).join("") : null}&sort=${sort}` as string;

  const res = await axiosInstance.get<Fetch<Data>>(url).then((v) => v.data);

  return res;
};
