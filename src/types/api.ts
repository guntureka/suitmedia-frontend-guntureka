export type ApiInput = {
  page?: number;
  page_size?: number;
  append?: Array<"small_image" | "medium_image">;
  sort?: "published_at" | "-published_at";
};

export type Data = {
  content?: string | null;
  created_at?: string | null;
  deleted_at?: string | null;
  id: number;
  published_at?: string | null;
  slug?: string | null;
  title?: string | null;
  updated_at?: string | null;
  small_image: image[] | [];
  medium_image: image[] | [];
};

export type image = {
  id: number;
  mime: string | null;
  file_name: string;
  url: string;
};

export type Link = {
  first?: string | null;
  last?: string | null;
  next?: string | null;
  prev?: string | null;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    active: boolean;
    label: string | null;
    url: string | null;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Fetch<T> = {
  data: T[];
  links: Link;
  meta: Meta;
};
