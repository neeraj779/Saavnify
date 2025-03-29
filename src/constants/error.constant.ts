export const ErrorMessages = {
	Artist: {
		NOT_FOUND: 'The requested artist could not be found',
		SONGS_NOT_FOUND: 'No songs found for this artist',
		ALBUMS_NOT_FOUND: 'No albums found for this artist',
	},
	Album: {
		NOT_FOUND: 'The requested album could not be found',
	},
	Song: {
		NOT_FOUND: 'The requested song could not be found',
		LYRICS_NOT_FOUND: 'No lyrics found for this song',
		SUGGESTIONS_NOT_FOUND: 'No song suggestions available',
		STATION_CREATION_FAILED: 'Unable to create song station',
	},
	Playlist: {
		NOT_FOUND: 'The requested playlist could not be found',
	},
	Search: {
		NO_RESULTS: 'No results found for your search',
	},
	Discover: {
		HOME_DATA_NOT_FOUND: 'Home data could not be found',
		TOP_SEARCHES_NOT_FOUND: 'Top searches data could not be found',
		TOP_CHARTS_NOT_FOUND: 'Top charts data could not be found',
		TRENDING_NOT_FOUND: 'Trending data could not be found',
		TOP_ALBUMS_NOT_FOUND: 'Top albums data could not be found',
		TOP_PLAYLISTS_NOT_FOUND: 'Top playlists data could not be found',
		TOP_ARTISTS_NOT_FOUND: 'Top artists data could not be found',
	},
	System: {
		GENERIC_JSON_ERROR: 'Unexpected end of JSON input',
		UNKNOWN_ERROR: 'An unknown error occurred',
	},
} as const;
