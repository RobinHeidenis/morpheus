import {SearchForm} from "~/components/SearchForm";
import {Suspense} from "react";

export default function SearchPage() {
  return (
    <main className="mx-auto md:w-3/4 p-4 text-center">
      <h1 className="text-6xl text-peach">Search</h1>
      <h2 className={"mt-5 text-2xl text-peach"}>Search movies and shows</h2>
      <Suspense>
        <SearchForm />
      </Suspense>
    </main>
  );
}
