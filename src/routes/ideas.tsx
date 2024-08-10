import Card from "@/components/card";
import { GetIdeasQuery } from "@/services/queries";
import { ApiInput } from "@/types/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export const Route = createFileRoute("/ideas")({
  component: IdeasPage,
  validateSearch: (search: Record<string, unknown>): ApiInput => {
    return {
      page: parseInt(search.page as string) || 1,
      page_size: parseInt(search.page_size as string) || 10,
      sort: (search.sort as ApiInput["sort"]) || "-published_at",
    };
  },
  loaderDeps: ({ search: { page, page_size, sort } }) => ({
    page,
    page_size,
    sort,
  }),
  loader: async ({
    context: { queryClient },
    deps: { page, page_size, sort },
  }) => {
    return await queryClient.ensureQueryData(
      GetIdeasQuery({ page, page_size, sort }),
    );
  },
});

function IdeasPage() {
  const searchParams = Route.useSearch();

  const navigate = useNavigate({ from: Route.fullPath });

  const { data } = useSuspenseQuery(GetIdeasQuery(searchParams));
  const { data: datas, meta } = data;

  return (
    <main className="min-h-screen overflow-hidden">
      {/* banner */}
      <div className="relative h-[60vh]">
        <img
          src="/bg.jpg"
          alt="bg"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-gray-900/50"></div>
        <div className="absolute bottom-0 left-0 h-40 w-[110vw] origin-bottom-right -rotate-[4deg] transform bg-white"></div>
        <div className="relative z-[1] mx-auto flex h-full w-[80%] flex-col items-center justify-center gap-4 text-white">
          <h1 className="text-5xl font-semibold">Ideas</h1>
          <h3 className="text-2xl">When all our great things begin</h3>
        </div>
      </div>
      {/* data */}
      <div className="relative mx-auto flex w-[80%] flex-col gap-10 py-20">
        <div className="relative z-20 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span>{`Showing ${meta.from}-${meta.to} of ${meta.total}`}</span>
          </div>
          <div className="relative flex w-full flex-col items-start justify-between gap-4 md:max-w-lg md:flex-row">
            <div className="flex w-full items-center justify-between gap-2 md:justify-end">
              <label htmlFor="per_page">Show per page</label>
              <select
                name="per_page"
                id="per_page"
                value={searchParams.page_size ?? 10}
                className="flex items-center rounded-full border p-1 px-8"
                onChange={(e) => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page_size: Number(e.target.value),
                      page: 1,
                    }),
                  });
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex w-full items-center justify-between gap-2 md:justify-end">
              <label htmlFor="sort_by">Sort by</label>
              <select
                name="sort_by"
                id="sort_by"
                value={searchParams.sort}
                className="flex items-center rounded-full border p-1 px-8"
                onChange={(e) => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      sort: e.target.value as ApiInput["sort"],
                      page: 1,
                    }),
                  });
                }}
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {datas && datas.map((v) => <Card data={v} key={v.id} />)}
        </div>
      </div>
      <div className="relative mx-auto flex w-[80%] flex-col items-center justify-center gap-10 overflow-hidden py-20">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 overflow-hidden font-semibold">
          <Link
            search={(prev) => ({
              ...prev,
              page: 1,
            })}
            disabled={searchParams?.page ? searchParams.page < 2 : false}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </Link>
          <Link
            search={(prev) => ({
              ...prev,
              page: searchParams?.page ? searchParams.page - 1 : 1,
            })}
            disabled={searchParams.page! < 2}
          >
            <MdOutlineKeyboardArrowLeft />
          </Link>
          {meta.links.map((v, i) => {
            if (i != 0 && i != meta.links.length - 1) {
              return (
                <Link
                  search={(prev) => ({
                    ...prev,
                    page: parseInt(v.label as string),
                  })}
                  key={i}
                  activeProps={{
                    className: "rounded-lg bg-orange-500 px-2",
                  }}
                  className={
                    meta.current_page === parseInt(v.label as string)
                      ? "rounded-lg bg-orange-500 px-2"
                      : "rounded-lg px-2 hover:bg-gray-300"
                  }
                  disabled={
                    meta.current_page === parseInt(v.label as string) ||
                    isNaN(Number(v.label))
                  }
                >
                  {v.label}
                </Link>
              );
            }
          })}
          <Link
            search={(prev) => ({
              ...prev,
              page: searchParams?.page ? searchParams.page + 1 : 1,
            })}
            disabled={meta.last_page == searchParams.page}
          >
            <MdOutlineKeyboardArrowRight />
          </Link>
          <Link
            search={(prev) => ({
              ...prev,
              page: meta.last_page,
            })}
            disabled={meta.last_page == searchParams.page}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
