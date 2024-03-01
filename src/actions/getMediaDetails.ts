"use server";
import * as cheerio from "cheerio";

export const getMediaDetails = async (id: string) => {
  "use server";
  const imdbData = await fetch(
    `https://v2.sg.media-imdb.com/suggests/t/tt${id}.json`,
  );
  const imdbDataText = await imdbData.text();
  const imdbDataJSON = (
    JSON.parse(imdbDataText.replace(`imdb$tt${id}(`, "").slice(0, -1)) as {
      d: { l: string; y: number; id: string; qid: "tvSeries" | "movie" }[];
    }
  ).d;
  const mediaData = imdbDataJSON.find((i) => i.id === `tt${id}`);
  const response = await fetch(
    `https://watchsomuch.to/Movies/ajTVTorrents.aspx?mid=${id}`,
    { cache: "no-store" },
  );

  const responseText = await response.text();
  const $ = cheerio.load(responseText);
  const seasonWrappers = $("[data-season]");
  const seasons = Array.from(seasonWrappers).map((season) => {
    return {
      title: $(season).children().first().text() ?? "Unknown Season",
      episodes: Array.from($(season).find(".episode")).map((episode) => {
        return {
          title:
            $(episode).children().first().children().first().text() ??
            "Unknown Episode",
          torrents: Array.from($(episode).find("a.torrent"))
            .map((torrent) => {
              const title =
                $(torrent).children().first().text() ?? "Unknown Torrent";
              if (title.includes("VIP  Direct Download")) return null;
              return {
                title,
                size:
                  $(torrent).find(".size").text().replace("\n", "").trim() ??
                  "Unknown",
                id: $(torrent).attr("data-torrent"),
              };
            })
            .filter((item) => item !== null) as {
            title: string;
            size: string;
            id: string;
          }[],
        };
      }),
    };
  });

  return {
    seasons,
    imdbData: {
      id: mediaData?.id,
      title: mediaData?.l,
      year: mediaData?.y,
      type: mediaData?.qid,
    },
  };
};
