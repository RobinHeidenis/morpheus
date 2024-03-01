import { NavigationLinks } from "~/components/navigation/NavigationLinks";

export const Navigation = () => {
  return (
    <nav className="flex justify-center">
      <ul className="flex p-5">
        <NavigationLinks />
      </ul>
    </nav>
  );
};
