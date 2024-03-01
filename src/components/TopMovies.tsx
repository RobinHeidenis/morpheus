import * as cheerio from "cheerio";
import { MediaLink } from "~/components/MediaLink";

const getTopMoviesHTML = async () => {
  "use server";
  const response = await fetch("https://watchsomuch.to");
  const text = await response.text();
  const $ = cheerio.load(text);
  const movieElements = $(".item");
  return Array.from(movieElements).map((movie) => {
    const imageURL = $(movie).find("img").attr("src");
    return {
      title: $($(movie).children()[1]).text() ?? "Unknown Movie",
      images: {
        small: imageURL?.replace("http", "https") ?? "",
        large:
          imageURL
            ?.replace("PosterS", "PosterL")
            ?.replace("http", "https")
            ?.replace("_Small.jpg", "_Full.jpg") ?? "",
      },
      image:
        $(movie)
          .find("img")
          .attr("src")
          ?.replace("PosterS", "PosterL")
          .replace("http", "https")
          .replace("_Small.jpg", "_Full.jpg") ?? "",
      link:
        "/details/" + $(movie).attr("href")?.split("/")?.[2]?.split("-")[0] ??
        "",
    };
  }) as { title: string; image: string; link: string }[];
};

export const TopMoviesList = async () => {
  const movies = await getTopMoviesHTML();

  return (
    <>
      {movies.map((movie) => (
        <MediaLink
          title={movie.title}
          image={movie.image}
          link={movie.link}
          key={movie.title}
        />
      ))}
    </>
  );
};

export default TopMoviesList;
