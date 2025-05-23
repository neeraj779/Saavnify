import {
	SourceArtistReco,
	SourceCityMod,
	SourceDiscover,
	SourcePromo,
	SourceTagMix,
} from '../types/external/homeModules.types';
import { SourcePlaylist } from '../types/external/playlist.types';
import { SourceSong } from '../types/external/song.types';
import { SourceAlbum } from '../types/external/album.types';
import { SourceChart, SourceRadioStation } from '../types/external/explore.types';

export type EntityType =
	| 'artist'
	| 'album'
	| 'playlist'
	| 'radio'
	| 'radio_station'
	| 'song'
	| 'channel'
	| 'mix'
	| 'show'
	| 'episode'
	| 'season'
	| 'label';

export type MediaQuality = string | { quality: string; link: string }[];

export type MediaRights = {
	code: unknown;
	cacheable: unknown;
	delete_cached_object: unknown;
	reason: unknown;
};

export type MiniEntity = {
	id: string;
	name: string;
	subtitle?: string;
	header_desc?: string;
	type: EntityType;
	url: string;
	image: MediaQuality;
	color?: string;
	duration?: number;
	album?: string;
	album_id?: string;
	album_url?: string;
	download_url?: MediaQuality;
	artist_map?: ArtistMap;
	explicit?: boolean;
	list?: string;
};

export type ModuleBase = {
	title: string;
	subtitle: string;
	source: string;
	position: number;
};

export type ArtistUrls = {
	albums: string;
	bio: string;
	comments: string;
	songs: string;
};

export type ArtistMap = {
	primary_artists: ArtistMini[];
	featured_artists: ArtistMini[];
	artists: ArtistMini[];
};

export type ArtistMini = {
	id: string;
	image: MediaQuality;
	url: string;
	name: string;
	type: 'artist';
	role: string;
};

export type MiniPayloadSource =
	| SourceSong
	| SourceAlbum
	| SourcePlaylist
	| SourcePromo
	| SourceRadioStation
	| SourceDiscover
	| SourceCityMod
	| SourceTagMix
	| SourceArtistReco
	| SourceChart;
