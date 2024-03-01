"use client";

import { Season } from "~/components/downloadList/Season";
import type { getMediaDetails } from "~/actions/getMediaDetails";
import { useParams } from "next/navigation";

export const MediaDetails = ({
  details,
}: {
  details: Awaited<ReturnType<typeof getMediaDetails>>;
}) => {
  const params = useParams();

  return (
    <>
      <h1 className="text-center text-6xl text-peach">
        {details.imdbData.title ?? "Details"} (
        {details?.imdbData.year ?? "Year unknown"})
      </h1>
      <p className="mb-8 mt-4 text-center text-2xl">
        Torrents for {details?.imdbData?.title}
      </p>
      <div className={"flex flex-col gap-y-5 justify-self-start"}>
        {details.seasons.map((season) => (
          <Season
            season={season}
            key={season.title}
            titleId={params.id as string}
          />
        ))}
      </div>
    </>
  );
};
