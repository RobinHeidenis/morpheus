import { Season } from "@/components/season";
import { DownloadFilters } from "@/components/download-filters";
import { getMediaDetails } from "@/data/media-details";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { matchesFilter, type FilterOptions } from "@/utils/download-filters";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const mediaDetailsSearchSchema = z.object({
	quality: z.array(z.string()).catch([]),
	codec: z.array(z.string()).catch([]),
	hdr: z.array(z.string()).catch([]),
	audio: z.array(z.string()).catch([]),
});

export const Route = createFileRoute("/details/$mediaId/")({
	component: RouteComponent,
	loader: ({ params }) => getMediaDetails({ data: { id: params.mediaId } }),
	validateSearch: zodValidator(mediaDetailsSearchSchema),
});

function RouteComponent() {
	const details = Route.useLoaderData();
	const params = Route.useParams();
	const navigate = useNavigate({ from: Route.fullPath });
	const filters = Route.useSearch();

	const handleFilterChange = (newFilters: FilterOptions) => {
		navigate({
			search: () => newFilters,
		});
	};

	const filteredDownloads = useMemo(() => {
		if (details.type !== "movie") return [];
		return details.downloads.filter((download) =>
			matchesFilter(download, filters),
		);
	}, [details, filters]);

	return (
		<main className="mx-auto p-4 text-ctp-peach lg:w-3/4 xl:w-1/2">
			<h1 className="text-center text-6xl text-ctp-peach">
				{details.imdbData.title ?? "Details"} (
				{details?.imdbData.year ?? "Year unknown"})
			</h1>
			<p className="mb-8 mt-4 text-center text-2xl">
				Downloads for {details?.imdbData?.title}
			</p>
			{details.type === "movie" ? (
				<>
					<DownloadFilters
						filters={filters}
						onFilterChange={handleFilterChange}
					/>
					<div
						className={
							"mt-3 flex w-full flex-col items-start rounded-lg border border-ctp-mauve p-3"
						}
					>
						{filteredDownloads.length > 0 ? (
							filteredDownloads.map((download) => (
								<Link
									to="/details/$mediaId/download/$downloadId"
									params={{
										mediaId: params.mediaId,
										downloadId: download.id,
									}}
									className={
										"m-1 flex flex-row gap-x-3 text-sm leading-relaxed underline decoration-ctp-green underline-offset-[6px] md:text-base md:text-ctp-peach"
									}
									key={download.id}
								>
									{download.title} ({download.size})
								</Link>
							))
						) : (
							<p className="text-ctp-subtext1 text-center w-full py-4">
								No downloads match the selected filters
							</p>
						)}
					</div>
				</>
			) : (
				<div className={"flex flex-col gap-y-5 justify-self-start"}>
					{details.seasons.map((season) => (
						<Season
							season={season}
							key={season.title}
							titleId={params.mediaId}
						/>
					))}
				</div>
			)}
		</main>
	);
}
