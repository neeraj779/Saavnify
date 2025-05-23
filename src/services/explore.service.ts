import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { AppError } from '@/types/error.types';
import { ErrorMessages } from '@/constants/error.constant';
import { TrendingParams } from '@/types/explore.types';
import { SourceModules } from '@/types/external/homeModules.types';
import { mapHomeModules } from '@/mappers/homeModules.mapper';
import { Modules } from '@/types/internal/homeModules.types';
import { ModulesMini } from '@/types/internal/homeModules.types';
import { SourceTrending } from '@/types/external/explore.types';
import { mapTrendingContent } from '@/mappers/explore.mapper';
import {
	ExploreSourceType,
	ExploreFeaturedContentReturnType,
	TrendingResponse,
} from '@/types/internal/explore.types';
import {
	SourceFeaturedPlaylists,
	SourceChart,
	SourceTopArtists,
	SourceTopAlbums,
	SourceRadioStation,
} from '@/types/external/explore.types';
import {
	mapFeaturedPlaylists,
	mapChart,
	mapTopShows,
	mapTopArtists,
	mapTopAlbums,
	mapRadioStation,
} from '@/mappers/explore.mapper';
import { miniPayload } from '@/payloads/misc.mapper';
import { GetFeaturedContentParams } from '@/types/explore.types';

const _Paths = [
	'featured-playlists',
	'charts',
	'top-shows',
	'top-artists',
	'top-albums',
	'featured-stations',
] as const;

export class ExploreService {
	async getHomeData({
		lang = '',
		mini = false,
		raw = false,
	}): Promise<Modules | ModulesMini | SourceModules> {
		const data = await useFetch<SourceModules>({
			endpoint: Endpoints.homeModules.launch_data,
			params: {
				language: lang,
			},
		});

		if ('error' in data) throw AppError.NotFound(ErrorMessages.Discover.HOME_DATA_NOT_FOUND);
		if (raw) return data;
		return mapHomeModules(data, mini);
	}

	async getTrending({
		type,
		lang,
		page,
		limit,
		mini,
		raw,
	}: TrendingParams): Promise<TrendingResponse | SourceTrending> {
		let data = await useFetch<SourceTrending>({
			endpoint: Endpoints.explore.trending,
			params: {
				entity_type: type,
				entity_language: lang,
				p: page,
				n: limit,
			},
		});

		if (!data.length) {
			data = await useFetch<SourceTrending>({
				endpoint: Endpoints.explore.trending,
				params: {
					entity_language: lang,
					p: page,
					n: limit,
				},
			});

			data = data.filter(t => 'type' in t && t.type === type);
			if (!data.length) throw AppError.NotFound(ErrorMessages.Discover.TRENDING_NOT_FOUND);
		}

		if (raw) return data;
		return mapTrendingContent(data, mini);
	}

	async getFeaturedContent({
		path,
		page = 1,
		limit = 20,
		lang,
		raw = false,
		mini = false,
	}: GetFeaturedContentParams): Promise<ExploreFeaturedContentReturnType> {
		const _mapFeaturedPlaylists = (f: SourceFeaturedPlaylists) => mapFeaturedPlaylists(f, mini);

		const _mapChart = (c: SourceChart[]) => c.map(c => (mini ? miniPayload(c) : mapChart(c)));

		const _mapTopAlbums = (t: SourceTopAlbums) => mapTopAlbums(t, mini);

		const [endpoint, payloadFn] = (
			{
				'featured-playlists': [Endpoints.explore.featured_playlists, _mapFeaturedPlaylists],
				charts: [Endpoints.explore.charts, _mapChart],
				'top-shows': [Endpoints.explore.top_shows, mapTopShows],
				'top-artists': [Endpoints.explore.top_artists, mapTopArtists],
				'top-albums': [Endpoints.explore.top_albums, _mapTopAlbums],
				'featured-stations': [
					Endpoints.explore.featured_stations,
					(s: SourceRadioStation[]) => s.map(mapRadioStation),
				],
			} as Record<string, [string, <T, U>(a: T) => Required<U>]>
		)[path];

		const result = await useFetch<ExploreSourceType>({
			endpoint,
			params: {
				p: page,
				n: limit,
				languages: lang,
			},
		});

		const isEmpty = <T>(v: T) => (Array.isArray(v) ? !v.length : false);

		const isError =
			(['charts', 'featured-stations'].includes(path) && isEmpty(result)) ||
			(path === 'top-artists' && isEmpty((result as SourceTopArtists).top_artists)) ||
			isEmpty((result as SourceTopAlbums).data);

		const payloadName = path
			.split('-')
			.map(s => s[0].toUpperCase() + s.slice(1))
			.join(' ');

		if (isError) throw AppError.NotFound(`Failed to fetch ${payloadName}`);

		if (raw) return result;

		return payloadFn(result);
	}
}

export const exploreService = new ExploreService();
