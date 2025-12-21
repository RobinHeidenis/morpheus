import * as cheerio from "cheerio";
import { MediaLink } from "./media-link";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

const getTopMoviesHTML = createServerFn().handler(async () => {
	const response = await fetch("https://watchsomuch.to");
	const text = await response.text();
	const $ = cheerio.load(text);
	const movieElements = $(".item");
	return Array.from(movieElements).map((movie) => {
		const imageURL = $(movie).find("img").attr("src");
		const highResImageURL = imageURL
			?.replace("PosterS", "PosterL")
			.replace("http", "https")
			.replace("_Small.jpg", "_Full.jpg");
		return {
			title: $($(movie).children()[1]).text() ?? "Unknown Movie",
			image: imageURL?.includes("http")
				? highResImageURL
				: "https://media.watchsomuch.to" +
					highResImageURL?.replace("/Media", ""),
			link:
				"/details/" +
				($(movie).attr("href")?.split("/")?.[2]?.split("-")[0] ?? ""),
		};
	}) as { title: string; image: string; link: string }[];
});

export const TopMoviesList = () => {
	const getTopMovies = useServerFn(getTopMoviesHTML);
	const { data } = useQuery({
		queryKey: ["movies"],
		queryFn: () => getTopMovies(),
	});

	return (
		<>
			{data?.map((movie) => (
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
