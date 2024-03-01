"use client";
import { usePathname } from "next/navigation";

const useActive = () => {
  const pathname = usePathname();
  return (path: string) => {
    return pathname === path
      ? "border-peach text-peach"
      : "text-peach border-transparent";
  };
};

export const NavigationLinks = () => {
  const active = useActive();

  return (
    <>
      <li className={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
        <a href="/">Home</a>
      </li>
      <li className={`border-b-2 ${active("/search")} mx-1.5 sm:mx-6`}>
        <a href="/search">Search</a>
      </li>
      <li className={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
        <a href="/about">About</a>
      </li>
    </>
  );
};
