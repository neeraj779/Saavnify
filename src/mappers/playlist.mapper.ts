import { createImageLinks } from '@/utils/link.util';
import { mapArtistMapResponse } from './artist.mapper';
import { mapSongResponse } from './song.mapper';
import type { Playlist, PlaylistAPIResponse } from '@/schemas/playlist.schema';

export const mapPlaylistResponse = (playlist: PlaylistAPIResponse): Playlist => ({
	id: playlist.id,
	name: playlist.title,
	description: playlist.header_desc,
	type: playlist.type,
	year: playlist.year ? Number(playlist.year) : null,
	playCount: playlist.play_count ? Number(playlist.play_count) : null,
	language: playlist.language,
	explicitContent: playlist.explicit_content === '1',
	url: playlist.perma_url,
	songCount: playlist.list_count ? Number(playlist.list_count) : null,
	artists: playlist.more_info.artists?.map(mapArtistMapResponse) || null,
	image: createImageLinks(playlist.image),
	songs: (playlist.list && playlist.list?.map(mapSongResponse)) || null,
});
