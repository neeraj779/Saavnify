import { ArtistUrls, EntityType, ModuleBase } from '../common.types';
import { SourceAlbum } from './album.types';
import { SourcePlaylist } from './playlist.types';
import { SourceSong } from './song.types';

export type SourceArtist = {
	artistId: string;
	name: string;
	subtitle: string;
	image: string;
	follower_count: string;
	type: 'artist';
	isVerified: boolean;
	dominantLanguage: string;
	dominantType: string;
	topSongs?: SourceSong[];
	topAlbums?: SourceAlbum[];
	dedicated_artist_playlist?: SourcePlaylist[];
	featured_artist_playlist?: SourcePlaylist[];
	singles?: SourceArtistSong[];
	latest_release?: SourceArtistSong[];
	similarArtists: SourceSimilarArtist[];
	isRadioPresent: boolean;
	bio: string;
	dob: string;
	fb: string;
	twitter: string;
	wiki: string;
	urls: ArtistUrls;
	availableLanguages: string[];
	fan_count: string;
	is_followed: boolean;
	modules: Partial<{
		topSongs: ModuleBase;
		latest_release: ModuleBase;
		topAlbums: ModuleBase;
		dedicated_artist_playlist: ModuleBase;
		featured_artist_playlist: ModuleBase;
		singles: ModuleBase;
		similarArtists: ModuleBase;
	}>;
};

export type SourceSimilarArtist = {
	id: string;
	name: string;
	roles: string;
	aka: string;
	fb: string;
	twitter: string;
	wiki: string;
	similar: string;
	dob: string;
	image_url: string;
	search_keywords: string;
	primary_artist_id: string;
	combine_artist_pages: number;
	replace_with_primary_artists: number;
	languages: string;
	perma_url: string;
	type: 'artist';
	isRadioPresent: boolean;
	dominantType: string;
};

export type SourceArtistMap = {
	primary_artists: SourceArtistMini[];
	featured_artists?: SourceArtistMini[];
	artists?: SourceArtistMini[];
};

export type SourceArtistMini = {
	id: string;
	image: string;
	perma_url: string;
	type: 'artist';
	name: string;
	role: string;
};

export type SourceArtistSong = Omit<SourceSong, 'more_info'> & {
	more_info: {
		query: string;
		text: string;
		music: string;
		song_count: string;
		artistMap: SourceArtistMap;
	};
};

export type SourceArtistContent<T> = {
	total: number;
	last_page: boolean;
	songs: T[];
	albums: T[];
};

export type SourceArtistDetails = {
	artistId: string;
	name: string;
	image: string;
	follower_count: string;
	type: 'artist';
	isVerified: boolean;
	dominantLanguage: string;
	dominantType: EntityType;
	topSongs?: Omit<SourceArtistContent<SourceSong>, 'albums'>;
	topAlbums?: Omit<SourceArtistContent<SourceAlbum>, 'songs'>;
};
