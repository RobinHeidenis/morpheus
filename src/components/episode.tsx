import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { DownloadFilters } from "@/components/download-filters";
import { matchesFilter, type FilterOptions } from "@/utils/download-filters";

export const Episode = ({
	episode,
	titleId,
}: {
	episode: {
		title: string;
		torrents: { title: string; size: string; id: string }[];
	};
	titleId: string;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [filters, setFilters] = useState<FilterOptions>({
		quality: [],
		codec: [],
		hdr: [],
		audio: [],
	});

	const filteredTorrents = useMemo(() => {
		return episode.torrents.filter((torrent) =>
			matchesFilter(torrent, filters),
		);
	}, [episode.torrents, filters]);

	return (
		<div
			className={
				"mt-3 flex w-full flex-col items-start rounded-lg border border-ctp-mauve p-3"
			}
		>
			<h3
				onClick={() => setIsExpanded(!isExpanded)}
				className={`w-full text-xl text-ctp-peach cursor-pointer ${isExpanded ? "mb-3 border-b border-ctp-mauve pb-2" : ""}`}
			>
				{episode.title}
			</h3>
			{isExpanded && (
				<>
					<DownloadFilters filters={filters} onFilterChange={setFilters} />
					{filteredTorrents.length > 0 ? (
						filteredTorrents.map((torrent) => (
							<Link
								to="/details/$mediaId/download/$downloadId"
								params={{
									mediaId: titleId,
									downloadId: torrent.id,
								}}
								className={
									"m-1 flex flex-row gap-x-3 text-sm leading-relaxed underline decoration-green underline-offset-[6px] md:text-base md:text-peach"
								}
								key={torrent.id}
							>
								{torrent.title} ({torrent.size})
							</Link>
						))
					) : (
						<p className="text-ctp-subtext1 text-center w-full py-4">
							No downloads match the selected filters
						</p>
					)}
				</>
			)}
		</div>
	);
};
