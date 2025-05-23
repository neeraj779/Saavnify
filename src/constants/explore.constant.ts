export const FeaturedPaths = [
	'featured-playlists',
	'charts',
	'top-shows',
	'top-artists',
	'top-albums',
	'featured-stations',
] as const;

export type FeaturedPath = (typeof FeaturedPaths)[number];
