import { NavigationLinks } from "./navigation-links";

export default function Header() {
  return (
    <nav className="flex justify-center">
      <ul className="flex p-5">
        <NavigationLinks />
      </ul>
    </nav>
  );
}
