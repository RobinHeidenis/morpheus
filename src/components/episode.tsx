import { Link } from "@tanstack/react-router";
import { useState } from "react";

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
        "mt-3 flex w-full flex-col items-start rounded-lg border border-ctp-mauve p-3"
      }
    >
      <h3
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-xl text-ctp-peach ${isExpanded ? "mb-3 border-b border-ctp-mauve" : ""}`}
      >
        {episode.title}
      </h3>
      {isExpanded &&
        episode.torrents.map((torrent) => (
          <Link
            to="/details/$mediaId/download/$downloadId"
            params={{
              mediaId: titleId,
              downloadId: torrent.id,
            }}
            className={
              "m-1 flex flex-row gap-x-3 text-sm leading-relaxed underline decoration-green underline-offset-[6px] md:text-base md:text-peach"
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
