import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { mapSongResponse } from '@/mappers/song.mapper';
import { mapArtistMapResponse } from '@/mappers/artist.mapper';
import {
	mapSearchAlbumResponse,
	mapSearchPlaylistResponse,
	mapSearchResponse,
} from '@/mappers/search.mapper';
import { SearchParams } from '@/types/search.types';
import { Search, SearchAPIResponse } from '@/schemas/search/search.schema';
import { SearchSong, SearchSongAPIResponse } from '@/schemas/search/search-song.schema';
import { SearchArtist, SearchArtistAPIResponse } from '@/schemas/search/search-artist.schema';
import { SearchAlbum, SearchAlbumAPIResponse } from '@/schemas/search/search-album.schema';
import { SearchPlaylist, SearchPlaylistAPIResponse } from '@/schemas/search/search-playlist.schema';

export class SearchService {
	async searchAll(query: string): Promise<Search> {
		const { data } = await useFetch<SearchAPIResponse>({
			endpoint: Endpoints.search.all,
			params: { query },
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return mapSearchResponse(data);
	}

	async searchSongs({ query, page, limit }: SearchParams): Promise<SearchSong> {
		const { data } = await useFetch<SearchSongAPIResponse>({
			endpoint: Endpoints.search.songs,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return {
			total: data.total,
			start: data.start,
			results: data.results?.map(mapSongResponse).slice(0, limit) || [],
		};
	}

	async searchAlbums({ query, page, limit }: SearchParams): Promise<SearchAlbum> {
		const { data } = await useFetch<SearchAlbumAPIResponse>({
			endpoint: Endpoints.search.albums,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return mapSearchAlbumResponse(data);
	}

	async searchArtists({ query, page, limit }: SearchParams): Promise<SearchArtist> {
		const { data } = await useFetch<SearchArtistAPIResponse>({
			endpoint: Endpoints.search.artists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return {
			total: data.total,
			start: data.start,
			results: data.results?.map(mapArtistMapResponse).slice(0, limit) || [],
		};
	}

	async searchPlaylists({ query, page, limit }: SearchParams): Promise<SearchPlaylist> {
		const { data } = await useFetch<SearchPlaylistAPIResponse>({
			endpoint: Endpoints.search.playlists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return mapSearchPlaylistResponse(data);
	}
}

export const searchService = new SearchService();
