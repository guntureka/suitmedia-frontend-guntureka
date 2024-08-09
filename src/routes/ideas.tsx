import Card from "@/components/card";
import { useIdeasQuery } from "@/services/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas")({
  component: IdeasPage,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(useIdeasQuery({}));
  },
});

function IdeasPage() {
  const { data } = useSuspenseQuery(useIdeasQuery({}));
  const { data: datas, meta } = data;
  return (
    <main className="min-h-screen w-screen">
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
        <div className="flex items-center justify-between">
          <div>
            <span>{`Showing ${meta.from}-${meta.to} of ${meta.total}`}</span>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="page">10</label>
            <label htmlFor="page">newest</label>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {datas && datas.map((v) => <Card data={v} key={v.id} />)}
        </div>
      </div>
    </main>
  );
}
