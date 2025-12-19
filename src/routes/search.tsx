import { MediaLink } from "@/components/media-link";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import z from "zod";

const searchRouteSearchSchema = z.object({
  query: z.string().catch(""),
});

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: zodValidator(searchRouteSearchSchema),
});

const searchSchema = z.object({
  query: z.string(),
});

export const searchIMDB = createServerFn({ method: "GET" })
  .inputValidator(searchSchema)
  .handler(async ({ data }) => {
    const query = data.query;
    const searchTerm = query.replace(" ", "_");
    const response = await fetch(
      `https://v2.sg.media-imdb.com/suggests/t/${searchTerm}.json`,
    );
    const responseText = await response.text();
    try {
      const json = (
        JSON.parse(
          responseText
            .replace(`imdb$${encodeURIComponent(searchTerm)}(`, "")
            .slice(0, -1),
        ) as {
          d: {
            id: string;
            l: string;
            i: [string, number, number];
            y: number;
            qid: string;
          }[];
        }
      ).d;
      return json
        .filter((result) => result.qid === "movie" || result.qid === "tvSeries")
        .map((result) => ({
          id: result.id.slice(2),
          title: `${result.l} (${result.y})`,
          image: result.i[0],
        }));
    } catch (e) {
      console.error("ERROR: Could not parse JSON", e);
      return [];
    }
  });

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { query } = Route.useSearch();
  const debouncedQuery = useDebounce(query, 200);

  const getSearchResults = useServerFn(searchIMDB);
  const { data, isSuccess } = useQuery({
    enabled: !!debouncedQuery,
    queryKey: ["searchResults", debouncedQuery],
    queryFn: () => getSearchResults({ data: { query: debouncedQuery } }),
  });

  return (
    <main className="mx-auto md:w-3/4 p-4 text-center">
      <h1 className="text-6xl text-peach">Search</h1>
      <h2 className={"mt-5 text-2xl text-peach"}>Search movies and shows</h2>
      <div className={"mx-5 flex flex-col items-center"}>
        <div className={"mt-5 flex items-center justify-center xl:w-1/2"}>
          <input
            type={"search"}
            name={"search"}
            id={"search"}
            className={
              "w-full rounded-lg border border-ctp-peach bg-transparent p-2 text-ctp-peach focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ctp-peach"
            }
            onChange={(e) => {
              navigate({
                search: () => ({ query: e.target.value }),
              });
            }}
            defaultValue={query}
            placeholder={"Search for details..."}
          />
          <input
            className={
              "ml-2 rounded-lg border border-ctp-peach p-2 text-ctp-peach"
            }
            type={"submit"}
            value={"submit"}
          />
        </div>
        <div className={"mt-5 flex flex-row flex-wrap justify-center"}>
          {isSuccess && !data?.length ? <h3>No media found :(</h3> : undefined}
          {data?.map((item) => (
            <MediaLink
              title={item.title}
              image={item.image}
              link={`/details/${item.id}`}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
