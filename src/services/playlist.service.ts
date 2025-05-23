import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { Playlist } from '@/types/internal/playlist.types';
import { SourcePlaylist } from '@/types/external/playlist.types';
import { playlistPayload } from '@/payloads/playlist.mapper';

export class PlaylistService {
	async getPlaylistByIdOrLink({
		id = '',
		link = '',
		token = '',
		raw = false,
		mini = false,
	}): Promise<Playlist | SourcePlaylist> {
		const data = await useFetch<SourcePlaylist>({
			endpoint: id ? Endpoints.playlist.id : Endpoints.playlist.link,
			params: {
				listid: id,
				token: token ? token : link,
				type: 'playlist',
				p: '1',
				n: '50',
			},
		});

		if (!data.id) throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);

		if (raw) return data;

		return playlistPayload(data, mini);
	}

	async getRecommendations(
		id: string,
		lang = '',
		raw = false,
		mini = false,
	): Promise<Playlist[] | SourcePlaylist[]> {
		const data = await useFetch<SourcePlaylist[]>({
			endpoint: Endpoints.playlist.recommend,
			params: { listid: id, language: lang },
		});

		if (!data.length) {
			throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);
		}

		if (raw) return data;

		return data.map(playlist => playlistPayload(playlist, mini));
	}
}

export const playlistService = new PlaylistService();
