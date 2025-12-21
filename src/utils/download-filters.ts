export type DownloadItem = {
	title: string;
	size: string;
	id: string;
};

export type FilterOptions = {
	quality: string[];
	codec: string[];
	hdr: string[];
	audio: string[];
};

const FILTER_PATTERNS = {
	quality: {
		"1080p": /1080p/i,
		"2160p": /2160p/i,
		"4K": /4k|uhd/i,
	},
	codec: {
		x264: /x264|h\.?264/i,
		x265: /x265|h\.?265|hevc/i,
	},
	hdr: {
		"HDR10+": /hdr10\+|hdr10plus/i,
		HDR10: /hdr10(?![\+p])/i,
		HDR: /\bhdr\b(?!10)/i,
	},
	audio: {
		Atmos: /atmos/i,
		"10bit": /10bit/i,
	},
} as const;

export function matchesFilter(
	download: DownloadItem,
	filters: FilterOptions,
): boolean {
	const title = download.title;

	// If no filters are selected, show all
	const hasAnyFilter =
		filters.quality.length > 0 ||
		filters.codec.length > 0 ||
		filters.hdr.length > 0 ||
		filters.audio.length > 0;

	if (!hasAnyFilter) {
		return true;
	}

	// Check quality filters
	if (filters.quality.length > 0) {
		const matchesQuality = filters.quality.some((quality) =>
			FILTER_PATTERNS.quality[
				quality as keyof typeof FILTER_PATTERNS.quality
			]?.test(title),
		);
		if (!matchesQuality) {
			return false;
		}
	}

	// Check codec filters
	if (filters.codec.length > 0) {
		const matchesCodec = filters.codec.some((codec) =>
			FILTER_PATTERNS.codec[codec as keyof typeof FILTER_PATTERNS.codec]?.test(
				title,
			),
		);
		if (!matchesCodec) {
			return false;
		}
	}

	// Check HDR filters
	if (filters.hdr.length > 0) {
		const matchesHdr = filters.hdr.some((hdr) =>
			FILTER_PATTERNS.hdr[hdr as keyof typeof FILTER_PATTERNS.hdr]?.test(title),
		);
		if (!matchesHdr) {
			return false;
		}
	}

	// Check audio filters
	if (filters.audio.length > 0) {
		const matchesAudio = filters.audio.some((audio) =>
			FILTER_PATTERNS.audio[audio as keyof typeof FILTER_PATTERNS.audio]?.test(
				title,
			),
		);
		if (!matchesAudio) {
			return false;
		}
	}

	return true;
}

export const AVAILABLE_FILTERS = {
	quality: ["1080p", "2160p", "4K"],
	codec: ["x264", "x265"],
	hdr: ["HDR", "HDR10", "HDR10+"],
	audio: ["Atmos", "10bit"],
} as const;
