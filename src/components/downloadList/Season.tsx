import { useState } from "react";
import { Episode } from "./Episode";

export const Season = ({
  season,
  titleId,
}: {
  season: {
    title: string;
    episodes: {
      title: string;
      torrents: { title: string; size: string; id: string }[];
    }[];
  };
  titleId: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={
        "flex flex-col justify-start rounded-lg border border-peach p-3"
      }
    >
      <h2
        className={"w-full text-2xl text-peach"}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {season.title}
      </h2>
      {isExpanded &&
        season.episodes.map((episode) => (
          <Episode episode={episode} key={episode.title} titleId={titleId} />
        ))}
    </div>
  );
};
