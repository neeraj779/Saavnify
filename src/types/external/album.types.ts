import { EntityType, ModuleBase } from '../common.types';
import { SourceArtistMap } from './artist.types';
import { SourceSong } from './song.types';

export type SourceAlbum = {
	id: string;
	title: string;
	subtitle: string;
	type: 'album';
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
	more_info: Partial<{
		artistMap: SourceArtistMap;
		song_count: string;
		copyright_text: string;
		is_dolby_content: boolean;
		label_url: string;
	}>;
	modules?: SourceAlbumModules;
};

export type SourceAlbumModules = {
	reco: AlbumModuleBase & {
		source_params: { albumid: string };
	};
	currentlyTrending: AlbumModuleBase & {
		source_params: { entity_type: string; entity_language: string };
	};
	topAlbumsFromSameYear: AlbumModuleBase & {
		source_params: { album_year: string; album_lang: string };
	};
	artists: ModuleBase;
};

type AlbumModuleBase = ModuleBase & {
	source_params: Record<string, string>;
};
