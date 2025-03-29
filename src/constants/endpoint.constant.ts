export const Endpoints = {
	search: {
		all: 'autocomplete.get',
		songs: 'search.getResults',
		albums: 'search.getAlbumResults',
		artists: 'search.getArtistResults',
		playlists: 'search.getPlaylistResults',
	},
	songs: {
		id: 'song.getDetails',
		link: 'webapi.get',
		suggestions: 'webradio.getSong',
		lyrics: 'lyrics.getLyrics',
		station: 'webradio.createEntityStation',
	},
	albums: {
		id: 'content.getAlbumDetails',
		link: 'webapi.get',
	},
	artists: {
		id: 'artist.getArtistPageDetails',
		link: 'webapi.get',
		songs: 'artist.getArtistMoreSong',
		albums: 'artist.getArtistMoreAlbum',
	},
	playlists: {
		id: 'playlist.getDetails',
		link: 'webapi.get',
	},
	discover: {
		homeData: 'webapi.getLaunchData',
		topCharts: 'content.getCharts',
		trending: 'content.getTrending',
		topAlbums: 'content.getAlbums',
		topPlaylists: 'content.getFeaturedPlaylists',
		topArtists: 'social.getTopArtists',
	},
	modules: 'webapi.getModules',
};
