import { MediaRights, ModuleBase } from '../common.types';
import { SourceArtistMap } from './artist.types';

export type SourceSongObject = {
	songs: SourceSong[];
	modules?: SourceSongModules;
};

export type SourceSong = {
	id: string;
	title: string;
	subtitle: string;
	header_desc: string;
	type: 'song';
	perma_url: string;
	image: string;
	language: string;
	year: string;
	play_count: string | number;
	explicit_content: string;
	list_count: string;
	list_type: string;
	list: string;
	more_info: {
		music: string;
		song?: string;
		album_id: string;
		album: string;
		label: string;
		origin: string;
		is_dolby_content: boolean;
		'320kbps': string;
		encrypted_media_url: string;
		encrypted_cache_url: string;
		album_url: string;
		duration: string;
		rights: MediaRights;
		cache_state: string;
		has_lyrics: string;
		lyrics_snippet: string;
		starred: string;
		copyright_text: string;
		artistMap: SourceArtistMap;
		release_date?: string;
		label_url: string;
		vcode: string;
		vlink: string;
		triller_available: boolean;
		request_jiotune_flag: boolean;
		webp: string;
		lyrics_id: string;
	};
};

export type SourceSongModules = {
	reco: SongModuleBase & {
		source_params: {
			pid: string;
			language: string;
		};
	};
	currentlyTrending: SongModuleBase & {
		source_params: {
			entity_type: string;
			entity_language: string;
		};
	};
	songsBysameArtists: SongModuleBase & {
		source_params: {
			artist_ids: string;
			song_id: string;
			language: string;
		};
	};
	songsBysameActors: SongModuleBase & {
		source_params: {
			actor_ids: string;
			song_id: string;
			language: string;
		};
	};
	artists: ModuleBase;
};

type SongModuleBase = ModuleBase & {
	source_params: Record<string, string>;
};
