import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { AppError } from '@/types/error.types';
import { ErrorMessages } from '@/constants/error.constant';
import { PaginationParams, PlaylistParams, TrendingParams } from '@/types/discover.types';
import { TopArtists, TopArtistsAPIResponse } from '@/schemas/discover/top-artist.schema';
import { NewReleaseAPIResponse } from '@/schemas/discover/new-release.schema';
import { NewReleaseSchemaDto } from '@/schemas/discover/new-release.schema';
import { mapNewReleaseResponse, mapTopPlaylistResponse } from '@/mappers/discover.mapper';
import { TopChart, TopChartAPIResponse } from '@/schemas/discover/top-chart.schema';
import { mapTopChartResponse } from '@/mappers/discover.mapper';
import { mapTopArtistsResponse } from '@/mappers/discover.mapper';
import { TopPlaylist, TopPlaylistAPIResponse } from '@/schemas/discover/top-playlist.schema';
import { TrendingAPIResponse } from '@/schemas/discover/trending.schema';
import { TrendingSchema } from '@/schemas/discover/trending.schema';
import { mapTrendingResponse } from '@/mappers/discover.mapper';
import { HomeData, HomeDataAPIResponse } from '@/schemas/discover/home-data.schema';
import { mapHomeDataResponse } from '@/mappers/discover.mapper';

export class DiscoverService {
	async getHomeData(): Promise<HomeData> {
		const { data } = await useFetch<HomeDataAPIResponse>({
			endpoint: Endpoints.discover.homeData,
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.HOME_DATA_NOT_FOUND);
		return mapHomeDataResponse(data);
	}

	async getTopCharts({ page, limit }: PaginationParams): Promise<TopChart> {
		const { data } = await useFetch<TopChartAPIResponse>({
			endpoint: Endpoints.discover.topCharts,
			params: {
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.TOP_CHARTS_NOT_FOUND);
		return mapTopChartResponse(data);
	}

	async getTrending({ page, limit, type, language }: TrendingParams): Promise<TrendingSchema> {
		const { data } = await useFetch<TrendingAPIResponse>({
			endpoint: Endpoints.discover.trending,
			params: {
				p: page,
				n: limit,
				entity_type: type,
				entity_language: language,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.TRENDING_NOT_FOUND);
		return mapTrendingResponse(data);
	}

	async getNewReleases({ page, limit }: PaginationParams): Promise<NewReleaseSchemaDto> {
		const { data } = await useFetch<NewReleaseAPIResponse>({
			endpoint: Endpoints.discover.topAlbums,
			params: {
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.TOP_ALBUMS_NOT_FOUND);
		return mapNewReleaseResponse(data);
	}

	async getTopPlaylists({ page, limit, language }: PlaylistParams): Promise<TopPlaylist> {
		const { data } = await useFetch<TopPlaylistAPIResponse>({
			endpoint: Endpoints.discover.topPlaylists,
			params: {
				p: page,
				n: limit,
				languages: language,
				fetch_from_serialized_files: true,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.TOP_PLAYLISTS_NOT_FOUND);
		return mapTopPlaylistResponse(data);
	}

	async getTopArtists(): Promise<TopArtists> {
		const { data } = await useFetch<TopArtistsAPIResponse>({
			endpoint: Endpoints.discover.topArtists,
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Discover.TOP_ARTISTS_NOT_FOUND);
		return mapTopArtistsResponse(data);
	}
}

export const discoverService = new DiscoverService();
