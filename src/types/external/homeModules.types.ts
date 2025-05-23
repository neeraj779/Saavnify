import { EntityType } from '../common.types';
import { SourceAlbum } from './album.types';
import { SourceSong } from './song.types';
import { SourcePlaylist } from './playlist.types';
import { SourceChart, SourceRadioStation } from './explore.types';

export type SourceGlobalConfig = {
	random_songs_listid: SourceGlobalConfigItem;
	weekly_top_songs_listid: SourceGlobalConfigItem;
};

type SourceGlobalConfigItem = Record<string, SourceGlobalConfigItemLang>;

type SourceGlobalConfigItemLang = {
	count: number;
	image: string;
	listid: string;
	title?: string;
};

export type SourceModules = {
	new_albums: (SourceAlbum | SourceSong)[];
	artist_recos?: SourceArtistReco[];
	browse_discover: SourceDiscover[];
	charts: SourceChart[];
	city_mod?: SourceCityMod[];
	global_config: SourceGlobalConfig;
	modules: SourceModule;
	new_trending: (SourceAlbum | SourceSong | SourcePlaylist)[];
	radio: SourceRadioStation[];
	tag_mixes?: SourceTagMix[];
	top_playlists: SourcePlaylist[];
} & Record<string, SourcePromo[]>;

export type SourceArtistReco = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: EntityType;
	more_info: {
		featured_station_type: EntityType;
		query: string;
		station_display_text: string;
	};
};

export type SourceDiscover = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: 'channel';
	more_info: {
		available: string;
		badge: string;
		tags: Record<string, string[]>;
		is_featured: string;
		sub_type: EntityType;
		video_thumbnail: string;
		video_url: string;
	};
};

export type SourceCityMod = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: EntityType;
	more_info: Partial<{
		album_id: string;
		featured_station_type: string;
		query: string;
		multiple_tunes: {
			id: string;
			subtype: EntityType;
			title: string;
			type: EntityType;
		}[];
	}>;
};

export type SourceTagMix = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: EntityType;
	language: string;
	list_count: string;
	list_type: EntityType;
	list: string;
	more_info: {
		firstname: string;
		lastname: string;
	};
	play_count: string;
	year: string;
};

export type SourcePromo = {
	explicit_content: string;
	id: string;
	image: string;
	perma_url: string;
	subtitle: string;
	title: string;
	type: EntityType;
	language?: string;
	list_count?: string;
	list_type?: string;
	list?: string;
	play_count?: string;
	year?: string;
	more_info: Partial<{
		editorial_language: string;
		position: string;
		release_year: number;
		square_image: string;
	}>;
};

export type SourceModule = {
	artist_recos?: SourceModuleItem;
	charts: SourceModuleItem;
	city_mod?: SourceModuleItem;
	new_albums: SourceModuleItem;
	new_trending: SourceModuleItem;
	radio: SourceModuleItem;
	tag_mixes?: SourceModuleItem;
	top_playlists: SourceModuleItem;
} & Record<string, SourceModuleItem>;

export type SourceModuleItem = {
	title: string;
	subtitle: string;
	position: number;
	featured_text?: string;
};
