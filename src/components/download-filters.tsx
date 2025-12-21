import {
	AVAILABLE_FILTERS,
	type FilterOptions,
} from "@/utils/download-filters";

type DownloadFiltersProps = {
	filters: FilterOptions;
	onFilterChange: (filters: FilterOptions) => void;
};

type FilterCheckboxProps = {
	category: keyof FilterOptions;
	value: string;
	label: string;
	filters: FilterOptions;
	toggleFilter: (category: keyof FilterOptions, value: string) => void;
};

const FilterCheckbox = ({
	category,
	value,
	label,
	filters,
	toggleFilter,
}: FilterCheckboxProps) => (
	<label className="flex items-center gap-2 cursor-pointer">
		<input
			type="checkbox"
			checked={filters[category].includes(value)}
			onChange={() => toggleFilter(category, value)}
			className="w-4 h-4 rounded border-ctp-surface1 bg-ctp-surface0 text-ctp-green focus:ring-2 focus:ring-ctp-green cursor-pointer"
		/>
		<span className="text-sm text-ctp-text">{label}</span>
	</label>
);

export const DownloadFilters = ({
	filters,
	onFilterChange,
}: DownloadFiltersProps) => {
	const toggleFilter = (category: keyof FilterOptions, value: string) => {
		const currentFilters = filters[category];
		const newFilters = currentFilters.includes(value)
			? currentFilters.filter((f) => f !== value)
			: [...currentFilters, value];

		onFilterChange({
			...filters,
			[category]: newFilters,
		});
	};

	return (
		<div className="mb-5 rounded-lg border border-ctp-mauve p-4">
			<h3 className="mb-3 text-lg font-semibold text-ctp-peach">Filters</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div>
					<h4 className="mb-2 text-sm font-medium text-ctp-subtext1">
						Quality
					</h4>
					<div className="flex flex-col gap-2">
						{AVAILABLE_FILTERS.quality.map((quality) => (
							<FilterCheckbox
								key={quality}
								category="quality"
								value={quality}
								label={quality}
								filters={filters}
								toggleFilter={toggleFilter}
							/>
						))}
					</div>
				</div>
				<div>
					<h4 className="mb-2 text-sm font-medium text-ctp-subtext1">Codec</h4>
					<div className="flex flex-col gap-2">
						{AVAILABLE_FILTERS.codec.map((codec) => (
							<FilterCheckbox
								key={codec}
								category="codec"
								value={codec}
								label={codec}
								filters={filters}
								toggleFilter={toggleFilter}
							/>
						))}
					</div>
				</div>
				<div>
					<h4 className="mb-2 text-sm font-medium text-ctp-subtext1">HDR</h4>
					<div className="flex flex-col gap-2">
						{AVAILABLE_FILTERS.hdr.map((hdr) => (
							<FilterCheckbox
								key={hdr}
								category="hdr"
								value={hdr}
								label={hdr}
								filters={filters}
								toggleFilter={toggleFilter}
							/>
						))}
					</div>
				</div>
				<div>
					<h4 className="mb-2 text-sm font-medium text-ctp-subtext1">Audio</h4>
					<div className="flex flex-col gap-2">
						{AVAILABLE_FILTERS.audio.map((audio) => (
							<FilterCheckbox
								key={audio}
								category="audio"
								value={audio}
								label={audio}
								filters={filters}
								toggleFilter={toggleFilter}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
