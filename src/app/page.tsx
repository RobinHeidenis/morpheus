import TopMovies from "~/components/TopMovies";

export default function HomePage() {
  return (
    <main className="mx-auto w-3/4 p-4 text-center">
      <h1 className="text-6xl text-peach">Movies</h1>
      <h2 className={"mt-5 text-2xl text-peach"}>Top movies</h2>
      <div className="mt-5 flex flex-wrap justify-center">
        <TopMovies />
      </div>
    </main>
  );
}
