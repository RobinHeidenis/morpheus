"use client";

import { useFormState } from "react-dom";
import { searchIMDB } from "~/actions/searchIMDB";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchForm = () => {
  const [state, formAction] = useFormState(searchIMDB, []);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <form action={formAction} className={"mx-5 flex flex-col items-center"}>
      <div className={"mt-5 flex w-1/2 items-center justify-center"}>
        <input
          type={"search"}
          name={"search"}
          id={"search"}
          className={
            "w-full rounded-lg border border-peach bg-transparent p-2 text-peach focus:border-transparent focus:outline-none focus:ring-2 focus:ring-peach"
          }
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set("search", e.target.value);
            } else {
              params.delete("search");
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
          defaultValue={searchParams.get("search")?.toString()}
          placeholder={"Search for details..."}
        />
        <input
          className={"ml-2 rounded-lg border border-peach p-2 text-peach"}
          type={"submit"}
          value={"submit"}
        />
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        {state.map((item) => (
          <a
            key={item.id}
            href={`/details/${item.id}`}
            className="my-5 flex w-60 flex-col items-center text-mauve"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={175}
              height={250}
              unoptimized
            />
            <span className={"mt-3"}>{item.title}</span>
          </a>
        ))}
      </div>
    </form>
  );
};
