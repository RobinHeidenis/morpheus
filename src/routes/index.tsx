import { TopMoviesList } from "@/components/top-movies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="mx-auto md:w-3/4 p-4 text-center">
			<h1 className="text-6xl text-peach">Movies</h1>
			<h2 className={"mt-5 text-2xl text-ctp-peach"}>Top movies</h2>
			<div className="mt-5 flex flex-wrap justify-between md:justify-center">
				<TopMoviesList />
			</div>
		</main>
	);
}
