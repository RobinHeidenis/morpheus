import Image from "next/image";
import * as cheerio from "cheerio";

const getTopMoviesHTML = async () => {
  "use server";
  const response = await fetch("https://watchsomuch.to");
  const text = await response.text();
  const $ = cheerio.load(text);
  const movieElements = $(".item");
  return Array.from(movieElements).map((movie) => {
    return {
      title: $($(movie).children()[1]).text() ?? "Unknown Movie",
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
        <a
          key={movie.title}
          href={movie.link}
          className="my-5 flex w-60 flex-col items-center text-mauve"
        >
          <Image
            src={movie.image ?? ""}
            alt={movie.title}
            width={175}
            height={250}
            unoptimized
          />
          <span className={"mt-3"}>{movie.title}</span>
        </a>
      ))}
    </>
  );
};

export default TopMoviesList;
