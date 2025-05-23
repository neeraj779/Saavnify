import { EntityType, ModuleBase } from '../common.types';
import { SourceArtistMini } from './artist.types';
import { SourceSong } from './song.types';

export type SourcePlaylist = {
	id: string;
	title: string;
	subtitle: string;
	type: 'playlist';
	image: string;
	perma_url: string;
	header_desc: string;
	explicit_content: string;
	language: string;
	year: string;
	play_count: string;
	list_count: string;
	list_type: EntityType;
	list?: string | SourceSong[];
	more_info: {
		uid: string;
		last_updated: string;
		username: string;
		firstname: string;
		lastname: string;
		is_followed: string;
		share: string;
		fan_count: string;
		follower_count: string;
		playlist_type: string;
		last_updated_epoch: number;
		artists?: SourceArtistMini[];
	};
	modules?: SourcePlaylistModules;
};

export type SourcePlaylistModules = {
	relatedPlaylist: PlaylistModuleBase & {
		source_params: { listid: string };
	};
	currentlyTrendingPlaylists: PlaylistModuleBase & {
		source_params: { entity_type: string; entity_language: string };
	};
	artists: ModuleBase;
};

type PlaylistModuleBase = ModuleBase & {
	source_params: Record<string, string>;
};
