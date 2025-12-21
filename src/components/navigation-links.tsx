import { Link, useRouterState } from "@tanstack/react-router";

const useActive = () => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return (path: string) => {
		return pathname === path
			? "border-ctp-peach text-ctp-peach"
			: "text-ctp-peach border-transparent";
	};
};

export const NavigationLinks = () => {
	const active = useActive();

	return (
		<>
			<li className={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
				<Link to="/">Home</Link>
			</li>
			<li className={`border-b-2 ${active("/search")} mx-1.5 sm:mx-6`}>
				<Link to="/search" search={{ query: "" }}>
					Search
				</Link>
			</li>
			<li className={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
				<Link to="/about">About</Link>
			</li>
		</>
	);
};
