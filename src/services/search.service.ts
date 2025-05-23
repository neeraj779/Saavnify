import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { SearchPath } from '@/constants/search.constant';
import { AllSearch, TopSearch, PodcastSearch } from '@/types/internal/search.types';
import {
	SourceAllSearch,
	SourceTopSearch,
	SourceSongSearch,
	SourceAlbumSearch,
	SourcePlaylistSearch,
	SourceArtistSearch,
	SourcePodcastSearch,
} from '@/types/external/search.types';
import {
	allSearchPayload,
	topSearchesPayload,
	songSearchPayload,
	albumSearchPayload,
	playlistSearchPayload,
	artistSearchPayload,
	podcastsSearchPayload,
} from '@/payloads/search.mapper';

export class SearchService {
	async searchAll(query: string, raw = false): Promise<AllSearch | SourceAllSearch> {
		const data = await useFetch<SourceAllSearch>({
			endpoint: Endpoints.search.all,
			params: { query },
			isVersion4: false,
		});

		if (!data.albums) {
			throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);
		}

		if (raw) return data;

		return allSearchPayload(data);
	}

	async getTopSearches(raw = false): Promise<TopSearch[] | SourceTopSearch[]> {
		const data = await useFetch<SourceTopSearch[]>({
			endpoint: Endpoints.search.top_search,
		});

		if (!data.length) {
			throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);
		}

		if (raw) return data;

		return data.map(topSearchesPayload);
	}

	async searchByType(
		path: SearchPath,
		query: string,
		page = 1,
		limit = 50,
		raw = false,
		mini = false,
	) {
		// Define result types
		type SourceType =
			| SourceSongSearch
			| SourceAlbumSearch
			| SourcePlaylistSearch
			| SourceArtistSearch;

		// Define payload function type
		type PayloadFunction = <T, U>(data: T, mini?: boolean) => Required<U>;

		// Define search configuration map
		const searchConfig: Record<
			SearchPath,
			{
				endpoint: string;
				payloadFn: PayloadFunction;
			}
		> = {
			songs: {
				endpoint: Endpoints.search.songs,
				payloadFn: songSearchPayload as PayloadFunction,
			},
			albums: {
				endpoint: Endpoints.search.albums,
				payloadFn: albumSearchPayload as PayloadFunction,
			},
			playlists: {
				endpoint: Endpoints.search.playlists,
				payloadFn: playlistSearchPayload as PayloadFunction,
			},
			artists: {
				endpoint: Endpoints.search.artists,
				payloadFn: artistSearchPayload as PayloadFunction,
			},
		};

		// Get config based on path
		const config = searchConfig[path];

		// Fetch data with proper typing
		const data = await useFetch<SourceType>({
			endpoint: config.endpoint,
			params: { q: query, p: page, n: limit },
		});

		// Check if results exist
		if (!data.results?.length) {
			throw new AppError(ErrorMessages.Search.NO_RESULTS);
		}

		// Return raw data if requested
		if (raw) {
			return data;
		}

		// Process and return the payload
		return config.payloadFn(data, mini);
	}

	async searchPodcasts(
		query: string,
		page = 1,
		limit = 50,
		raw = false,
	): Promise<PodcastSearch | SourcePodcastSearch> {
		const data = await useFetch<SourcePodcastSearch>({
			endpoint: Endpoints.search.more,
			params: {
				query,
				p: page,
				n: limit,
				params: '{ "type": "podcasts" }',
			},
		});

		if (!data.results.length) {
			throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);
		}

		if (raw) return data;

		return podcastsSearchPayload(data);
	}
}

export const searchService = new SearchService();
