import { createImageLinks } from '@/utils/link.util';
import { mapSongResponse } from './song.mapper';
import type { Album, AlbumAPIResponse } from '@/schemas/album.schema';
import { mapArtistMapResponse } from './artist.mapper';

export const mapAlbumResponse = (album: AlbumAPIResponse): Album => ({
	id: album.id,
	name: album.title,
	description: album.header_desc,
	type: album.type,
	year: album.year ? Number(album.year) : null,
	playCount: album.play_count ? Number(album.play_count) : null,
	language: album.language,
	explicitContent: album.explicit_content === '1',
	url: album.perma_url,
	songCount: album.more_info.song_count ? Number(album.more_info.song_count) : null,
	artists: {
		primary: album.more_info?.artistMap?.primary_artists?.map(mapArtistMapResponse),
		featured: album.more_info?.artistMap?.featured_artists?.map(mapArtistMapResponse),
		all: album.more_info?.artistMap?.artists?.map(mapArtistMapResponse),
	},
	image: createImageLinks(album.image),
	songs: (album.list && album.list?.map(mapSongResponse)) || null,
});
