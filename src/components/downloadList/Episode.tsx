import { useState } from "react";
import Link from "next/link";

export const Episode = ({
  episode,
  titleId,
}: {
  episode: {
    title: string;
    torrents: { title: string; size: string; id: string }[];
  };
  titleId: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={
        "mt-3 flex w-full flex-col items-start rounded-lg border border-mauve p-3"
      }
    >
      <h3
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-xl text-peach ${isExpanded ? "mb-3 border-b border-mauve" : ""}`}
      >
        {episode.title}
      </h3>
      {isExpanded &&
        episode.torrents.map((torrent) => (
          <Link
            href={`/details/${titleId}/download/${torrent.id}`}
            className={
              "m-1 flex flex-row gap-x-3 leading-relaxed underline decoration-green underline-offset-[6px]"
            }
            onClick={() => setIsExpanded(!isExpanded)}
            key={torrent.id}
          >
            {torrent.title} ({torrent.size})
          </Link>
        ))}
    </div>
  );
};
