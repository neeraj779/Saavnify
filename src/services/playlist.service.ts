import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { Playlist, PlaylistAPIResponse } from '@/schemas/playlist.schema';
import { GetPlaylistById, GetPlaylistByLink } from '@/types/playlist.types';
import { mapPlaylistResponse } from '@/mappers/playlist.mapper';

export class PlaylistService {
	async getPlaylistById({ id, page = 0, limit = 10 }: GetPlaylistById): Promise<Playlist> {
		const { data } = await useFetch<PlaylistAPIResponse>({
			endpoint: Endpoints.playlists.id,
			params: {
				listid: id,
				n: limit,
				p: page,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);

		const playlist = mapPlaylistResponse(data);
		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, limit) || [],
		};
	}

	async getPlaylistByLink({ token, page = 0, limit = 10 }: GetPlaylistByLink): Promise<Playlist> {
		const { data } = await useFetch<PlaylistAPIResponse>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				n: limit,
				p: page,
				type: 'playlist',
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);

		const playlist = mapPlaylistResponse(data);

		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, limit) || [],
		};
	}
}

export const playlistService = new PlaylistService();
