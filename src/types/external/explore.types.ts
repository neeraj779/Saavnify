import { EntityType } from '../common.types';
import { SourceAlbum } from './album.types';
import { SourcePlaylist } from './playlist.types';
import { SourceSong } from './song.types';

type SourcePaginatedList<T> = {
	count: number;
	last_page: boolean;
	data: T[];
};

type SourceActionItem = {
	id: string;
	title: string;
	action: string;
};

export type SourceFooterDetails = {
	playlist: SourceActionItem[];
	artist: SourceActionItem[];
	album: SourceActionItem[];
	actor: SourceActionItem[];
};

export type SourceLyrics = {
	lyrics: string;
	script_tracking_url: string;
	lyrics_copyright: string;
	snippet: string;
};

export type SourceTrending = (SourceAlbum | SourceSong | SourcePlaylist)[];

export type SourceFeaturedPlaylists = SourcePaginatedList<SourcePlaylist>;

export type SourceChart = {
	id: string;
	title: string;
	subtitle?: string;
	type: 'playlist';
	image: string;
	count?: number;
	language?: string;
	listname?: string;
	perma_url: string;
	explicit_content?: string;
	more_info?: Partial<{
		firstname: string;
		song_count: number;
	}>;
};

export type SourceTopShow = {
	id: string;
	title: string;
	subtitle: string;
	type: 'show';
	image: string;
	perma_url: string;
	explicit_content: string;
	more_info: {
		season_number: string;
		release_date: string;
		year: string;
		badge: string;
		square_image: string;
	};
};

export type SourceTopShows = SourcePaginatedList<SourceTopShow> & {
	trendingPodcasts: {
		items: {
			id: string;
			title: string;
			subtitle: string;
			type: 'show';
			image: string;
			perma_url: string;
			explicit_content: string;
			more_info: { square_image: string };
		}[];
		module: {
			source: string;
			title: string;
			subtitle: string;
		};
	}[];
};

export type SourceTopArtists = {
	top_artists: {
		artistid: string;
		name: string;
		image: string;
		follower_count: number;
		is_followed: boolean;
		perma_url: string;
	}[];
};

export type SourceTopAlbums = SourcePaginatedList<SourceSong | SourceAlbum>;

export type SourceRadioStation = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: 'radio_station';
	more_info: {
		color?: string;
		description?: string;
		featured_station_type: EntityType;
		language: string;
		query?: string;
		station_display_text: string;
	};
};

export type SourceMix = {
	id: string;
	title: string;
	subtitle: string;
	header_desc: string;
	type: 'mix';
	perma_url: string;
	image: string;
	language: string;
	year: string;
	play_count: string;
	explicit_content: string;
	list_count: string;
	list_type: string;
	list: SourceSong[];
	more_info: {
		uid: string;
		last_updated: string;
		username: string;
		firstname: string;
		lastname: string;
		is_followed: string;
		playlist_type: string;
		share: string;
	};
	modules: {
		list: {
			source: string;
			position: number;
			score: string;
			bucket: string;
			scroll_type: string;
			title: string;
			subtitle: string;
			highlight: string;
			simpleHeader: boolean;
			noHeader: boolean;
			view_more: unknown[];
		};
	};
};

export type SourceLabel = {
	labelId: string;
	name: string;
	image: string;
	topSongs: {
		songs: SourceSong[];
		total: number;
	};
	topAlbums: {
		albums: SourceAlbum[];
		total: number;
	};
	urls: {
		albums: string;
		songs: string;
	};
	availableLanguages: string[];
};

export type SourceMenuItem = {
	title: string;
	perma_url: string;
};

export type SourceMegaMenu = {
	mega_menu: {
		top_artists: SourceMenuItem[];
		top_playlists: SourceMenuItem[];
		new_releases: SourceMenuItem[];
	};
};
