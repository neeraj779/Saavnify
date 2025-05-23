import { FeaturedPath } from '@/constants/explore.constant';
import { EntityType, MediaQuality, MiniEntity } from '../common.types';
import { ApiResponse } from '../response.types';
import { Album } from './album.types';
import { Playlist } from './playlist.types';
import { Song } from './song.types';
import { SourceRadioStation } from '../external/explore.types';
import {
	SourceChart,
	SourceTopAlbums,
	SourceTopArtists,
	SourceTopShows,
} from '../external/explore.types';
import { SourceFeaturedPlaylists } from '../external/explore.types';

type PaginatedList<T> = {
	count: number;
	last_page: boolean;
	data: T[];
};

type ActionItem = {
	id: string;
	name: string;
	action: string;
};

export type FooterDetails = {
	playlist: ActionItem[];
	artist: ActionItem[];
	album: ActionItem[];
	actor: ActionItem[];
};

export type Lyrics = {
	lyrics: string;
	script_tracking_url: string;
	lyrics_copyright: string;
	snippet: string;
};

export type Trending = (Album | Song | Playlist | MiniEntity)[];

export type FeaturedPlaylists = PaginatedList<Playlist | MiniEntity>;

export type Chart = {
	id: string;
	name: string;
	subtitle?: string;
	type: 'playlist';
	image: MediaQuality;
	url: string;
	explicit?: boolean;
	count?: number;
	first_name?: string;
	language?: string;
	listname?: string;
};

export type TopShow = {
	id: string;
	name: string;
	subtitle: string;
	type: 'show';
	image: MediaQuality;
	banner_image: MediaQuality;
	url: string;
	explicit: boolean;
	season_number: number;
	release_date: string;
	badge: string;
};

export type TopShows = PaginatedList<TopShow> & {
	trending_podcasts: {
		title: string;
		subtitle: string;
		source: string;
		data: {
			id: string;
			name: string;
			subtitle: string;
			type: 'show';
			image: MediaQuality;
			url: string;
			explicit: boolean;
		}[];
	};
};

export type TopArtist = {
	id: string;
	name: string;
	image: MediaQuality;
	url: string;
	follower_count: number;
	is_followed: boolean;
};

export type TopAlbums = PaginatedList<Song | Album | MiniEntity>;

export type RadioStation = {
	id: string;
	name: string;
	subtitle: string;
	type: 'radio_station';
	image: MediaQuality;
	url: string;
	explicit: boolean;
	color?: string;
	description?: string;
	featured_station_type: EntityType;
	language: string;
	query?: string;
	station_display_text: string;
};

export type Mix = {
	id: string;
	name: string;
	subtitle: string;
	header_desc: string;
	type: 'mix';
	url: string;
	image: MediaQuality;
	language: string;
	year: number;
	play_count: number;
	explicit: boolean;
	list_count: number;
	list_type: string;
	songs: (Song | MiniEntity)[];
	user_id: string;
	last_updated: string;
	username: string;
	firstname: string;
	lastname: string;
	is_followed: boolean;
	share: number;
};

export type Label = {
	id: string;
	name: string;
	image: MediaQuality;
	type: 'label';
	top_songs: {
		songs: (Song | MiniEntity)[];
		total: number;
	};
	top_albums: {
		albums: (Album | MiniEntity)[];
		total: number;
	};
	urls: {
		albums: string;
		songs: string;
	};
	available_languages: string[];
};

export type MenuItem = {
	name: string;
	url: string;
};

export type MegaMenu = {
	top_artists: MenuItem[];
	top_playlists: MenuItem[];
	new_releases: MenuItem[];
};

export type GetFeaturedContentParams = {
	path: FeaturedPath;
	page?: string;
	limit?: string;
	lang?: string;
	raw?: boolean;
	mini?: boolean;
};

export type ExploreFeaturedContentReturnType =
	| FeaturedPlaylists
	| Chart[]
	| TopShows
	| TopArtist[]
	| TopAlbums
	| RadioStation[]
	| SourceFeaturedPlaylists
	| SourceChart[]
	| SourceTopShows
	| SourceTopArtists
	| SourceTopAlbums
	| SourceRadioStation[];

export type ExploreSourceType =
	| SourceFeaturedPlaylists
	| SourceChart[]
	| SourceTopShows
	| SourceTopArtists
	| SourceTopAlbums
	| SourceRadioStation[];

export type TrendingResponse = Trending;
export type FeaturedPlaylistsResponse = ApiResponse<FeaturedPlaylists>;
export type ChartResponse = ApiResponse<Chart[]>;
export type TopShowsResponse = ApiResponse<TopShows>;
export type TopArtistsResponse = ApiResponse<TopArtist[]>;
export type TopAlbumsResponse = ApiResponse<TopAlbums>;
export type RadioStationsResponse = ApiResponse<RadioStation[]>;
export type MixResponse = ApiResponse<Mix>;
export type LabelResponse = ApiResponse<Label>;
export type MegaMenuResponse = ApiResponse<MegaMenu>;
export type FooterDetailsResponse = ApiResponse<FooterDetails>;
export type LyricsResponse = Lyrics;
