export function extractPlaylistId(value?: string): string | undefined {
	if (!value) return undefined;

	const matches = value.match(
		/(?:jiosaavn\.com|saavn\.com)\/(?:featured|s\/playlist)\/[^/]+\/([^/]+)$|\/([^/]+)$/,
	);
	const filteredMatches = matches?.filter(each => each !== undefined);
	return (filteredMatches && filteredMatches[filteredMatches.length - 1 || 0]) || undefined;
}

export function extractAlbumId(value?: string): string | undefined {
	if (!value) return undefined;
	return value.match(/jiosaavn\.com\/album\/[^/]+\/([^/]+)$/)?.[1];
}

export function extractArtistId(value?: string): string | undefined {
	if (!value) return undefined;
	return value.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1];
}
