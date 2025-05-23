import type { GetSongById, GetSongSuggestions } from '@/types/song.types';
import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { SongObject, SongsResponse } from '@/types/internal/song.types';
import { SourceSong, SourceSongObject } from '@/types/external/song.types';
import { songObjPayload, songPayload } from '@/payloads/song.mapper';
import { SourceLyrics } from '@/types/external/explore.types';
import { LyricsResponse } from '@/types/internal/explore.types';

export class SongService {
	async getSongByIdsOrLink({
		songIds,
		link,
		token,
		mini = false,
		raw = false,
	}: GetSongById): Promise<SongObject | SourceSongObject> {
		const data = await useFetch<SourceSongObject>({
			endpoint: songIds ? Endpoints.song.id : Endpoints.song.link,
			params: {
				pids: songIds,
				token: token ? token : link,
				type: 'song',
			},
		});

		if (!('songs' in data)) throw AppError.NotFound(ErrorMessages.Song.NOT_FOUND);

		if (raw) return data;
		return songObjPayload(data, mini);
	}

	async getSongLyrics(songId: string, raw = false): Promise<LyricsResponse | SourceLyrics> {
		const data = await useFetch<SourceLyrics>({
			endpoint: Endpoints.song.lyrics,
			params: {
				lyrics_id: songId,
			},
		});

		if (!data.lyrics) throw AppError.NotFound(ErrorMessages.Song.LYRICS_NOT_FOUND);

		if (raw) return data;

		return data;
	}

	async getSongSuggestions({
		id: pid,
		lang = '',
		raw = false,
		mini = false,
	}: GetSongSuggestions): Promise<SongsResponse | SourceSong[]> {
		const data = await useFetch<SourceSong[]>({
			endpoint: Endpoints.song.recommend,
			params: {
				pid,
				language: lang,
			},
		});

		if (!data) {
			throw AppError.NotFound(ErrorMessages.Song.SUGGESTIONS_NOT_FOUND);
		}

		if (raw) return data;
		return data.map(s => songPayload(s, mini));
	}
}

export const songService = new SongService();
