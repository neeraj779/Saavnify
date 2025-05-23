export const SearchPaths = ['songs', 'albums', 'playlists', 'artists'] as const;

export type SearchPath = (typeof SearchPaths)[number];
