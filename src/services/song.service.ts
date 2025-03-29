import type { GetSongById, GetSongSuggestions } from '@/types/song.types';
import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { mapSongLyricsResponse, mapSongResponse } from '@/mappers/song.mapper';
import { Song, SongAPIResponse } from '@/schemas/song/song.schema';
import { Lyrics, LyricsAPIResponse } from '@/schemas/song/song-lyrics.schema';
import { SongSuggestionAPIResponse } from '@/schemas/song/song-suggestion.schema';

export class SongService {
	async getSongByIds({ songIds, includeLyrics = false }: GetSongById): Promise<Song[]> {
		const { data } = await useFetch<{ songs: SongAPIResponse[] }>({
			endpoint: Endpoints.songs.id,
			params: {
				pids: songIds,
			},
		});

		if (!data.songs?.length) throw AppError.NotFound(ErrorMessages.Song.NOT_FOUND);

		const songs = data.songs.map(song => mapSongResponse(song));

		if (includeLyrics) {
			await Promise.all(
				songs.map(async song => {
					song.lyrics = await this.getSongLyrics(song.id);
				}),
			);
		}

		return songs;
	}

	async getSongByLink(token: string): Promise<Song[]> {
		const { data } = await useFetch<{ songs: SongAPIResponse[] }>({
			endpoint: Endpoints.songs.link,
			params: {
				token,
				type: 'song',
			},
		});

		if (!data.songs?.length) throw AppError.NotFound(ErrorMessages.Song.NOT_FOUND);

		return data.songs.map(song => mapSongResponse(song));
	}

	async getSongLyrics(songId: string): Promise<Lyrics> {
		const { data } = await useFetch<LyricsAPIResponse>({
			endpoint: Endpoints.songs.lyrics,
			params: {
				lyrics_id: songId,
			},
		});

		if (!data.lyrics) throw AppError.NotFound(ErrorMessages.Song.LYRICS_NOT_FOUND);

		return mapSongLyricsResponse(data);
	}

	async getSongSuggestions({ songId, limit }: GetSongSuggestions): Promise<Song[]> {
		const stationId = await this.createSongStation(songId);

		const { data, ok } = await useFetch<SongSuggestionAPIResponse>({
			endpoint: Endpoints.songs.suggestions,
			params: {
				stationid: stationId,
				k: limit,
			},
			context: 'android',
		});

		if (!data || !ok) {
			throw AppError.NotFound(ErrorMessages.Song.SUGGESTIONS_NOT_FOUND);
		}

		const { stationid: _stationid, ...suggestions } = data;

		return (
			Object.values(suggestions)
				.map(element => element && mapSongResponse(element.song))
				.filter(Boolean)
				.slice(0, limit) || []
		);
	}

	private async createSongStation(songId: string): Promise<string> {
		const encodedSongId = JSON.stringify([encodeURIComponent(songId)]);

		const { data, ok } = await useFetch<{ stationid: string }>({
			endpoint: Endpoints.songs.station,
			params: {
				entity_id: encodedSongId,
				entity_type: 'queue',
			},
			context: 'android',
		});

		if (!data || !ok || !data.stationid)
			throw AppError.InternalError(ErrorMessages.Song.STATION_CREATION_FAILED);

		return data.stationid;
	}
}

export const songService = new SongService();
