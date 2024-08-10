import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: ServicePage,
});

function ServicePage() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4">
      <h1>Service page</h1>
      <Link
        to="/ideas"
        className="rounded-xl bg-orange-500 px-10 py-2 hover:bg-orange-500/80"
      >
        Go to Ideas
      </Link>
    </main>
  );
}
