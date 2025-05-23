import { SourceAlbum } from './album.types';
import { SourceArtistMap, SourceArtistMini } from './artist.types';
import { EntityType } from '../common.types';
import { SourcePlaylist } from './playlist.types';
import { SourceSong } from './song.types';

type SourceSearchPaginated<T> = {
	position: number;
	data: T[];
};

export type SourceSearch<T> = {
	total: number;
	start: number;
	results: T[];
};

export type SourceTopSearch = {
	id: string;
	title: string;
	subtitle: string;
	type: EntityType;
	image: string;
	perma_url: string;
	explicit_content: string;
	more_info: {
		album: string;
		artistMap: SourceArtistMap[];
	};
};

export type SourceAllSearch = {
	albums: SourceSearchPaginated<{
		id: string;
		title: string;
		image: string;
		music: string;
		url: string;
		type: string;
		description: string;
		ctr: number;
		position: number;
		more_info: {
			year: string;
			is_movie: string;
			language: string;
			song_pids: string;
		};
	}>;
	songs: SourceSearchPaginated<{
		id: string;
		title: string;
		image: string;
		album: string;
		url: string;
		type: string;
		description: string;
		ctr: number;
		position: number;
		more_info: {
			vcode?: string;
			vlink?: string;
			primary_artists: string;
			singers: string;
			video_available: boolean;
			triller_available: boolean;
			language: string;
		} | null;
	}>;
	playlists: SourceSearchPaginated<{
		id: string;
		title: string;
		image: string;
		extra: string;
		url: string;
		language: string;
		type: string;
		description: string;
		position: number;
		more_info: {
			firstname: string;
			artist_name: string;
			entity_type: string;
			entity_sub_type: string;
			video_available: boolean;
			is_dolby_content: boolean;
			sub_types: string;
			lastname: string;
			language: string;
		} | null;
	}>;
	artists: SourceSearchPaginated<{
		id: string;
		title: string;
		image: string;
		extra: string;
		url: string;
		type: string;
		description: string;
		ctr: number;
		entity: number;
		position: number;
	}>;
	topquery: SourceSearchPaginated<SourceAllSearch['songs']['data'][0]>;
	shows: SourceSearchPaginated<{
		id: string;
		title: string;
		image: string;
		type: string;
		season_number: number;
		description: string;
		url: string;
		position: number;
	}>;
	episodes: SourceSearchPaginated<unknown>;
};

export type SourceSongSearch = SourceSearch<SourceSong>;

export type SourceAlbumSearch = SourceSearch<SourceAlbum>;

export type SourcePlaylistSearch = SourceSearch<SourcePlaylist>;

export type SourceArtistSearch = SourceSearch<{
	name: string;
	id: string;
	ctr: number;
	entity: number;
	image: string;
	role: string;
	perma_url: string;
	type: string;
	mini_obj: boolean;
	isRadioPresent: boolean;
	is_followed: boolean;
}>;

export type SourcePodcastSearch = SourceSearch<{
	id: string;
	type: string;
	title: string;
	image_file_url: string;
	partner_name: string;
	label_name: string;
	explicit_content: number;
	song_info: string;
	latest_season_sequence: number;
	square_image_url: string;
	artists: SourceArtistMini[];
	featured_artists: SourceArtistMini[];
	primary_artists: SourceArtistMini[];
	perma_url: string;
	subtitle: string;
}>;
