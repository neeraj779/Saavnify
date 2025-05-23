import { decode } from 'entities';

import { createImageLinks, parseBool } from '../lib/utils';
import { MiniEntity } from '../types/common.types';
import {
	SourceArtistReco,
	SourceCityMod,
	SourceDiscover,
	SourceModules,
	SourcePromo,
	SourceTagMix,
} from '../types/external/homeModules.types';
import {
	Module,
	Modules,
	ModulesMini,
	ArtistReco,
	CityMod,
	Discover,
	Promo,
	TagMix,
} from '../types/internal/homeModules.types';
import { albumPayload } from '../payloads/album.mapper';
import { mapChart, mapRadioStation, mapTrendingContent } from './explore.mapper';
import { miniPayload } from '../payloads/misc.mapper';
import { playlistPayload } from '../payloads/playlist.mapper';
import { songPayload } from '../payloads/song.mapper';

/**
 * Maps external module data to internal module format
 * @param sourceModules - Source modules data from API
 * @param mini - Whether to return mini payload version
 * @returns Formatted modules data
 */
export function mapHomeModules(sourceModules: SourceModules, mini = false): Modules | ModulesMini {
	const {
		artist_recos: artistRecos,
		browse_discover: browseDiscover,
		charts,
		city_mod: cityMod,
		global_config: {
			random_songs_listid: randomSongsListId,
			weekly_top_songs_listid: weeklyTopSongsListId,
		},
		new_albums: newAlbums,
		new_trending: newTrending,
		radio,
		tag_mixes: tagMixes,
		top_playlists: topPlaylists,
		modules: {
			artist_recos: artistRecosModule,
			charts: chartsModule,
			city_mod: cityModModule,
			new_albums: newAlbumsModule,
			new_trending: newTrendingModule,
			radio: radioModule,
			tag_mixes: tagMixesModule,
			top_playlists: topPlaylistsModule,
		},
	} = sourceModules;

	// Process promo modules dynamically
	const promoModules = mapPromoModules(sourceModules, mini);

	return {
		trending: createStandardModule({
			title: newTrendingModule.title,
			subtitle: newTrendingModule.subtitle,
			position: newTrendingModule.position,
			source: '/explore/trending',
			featuredText: newTrendingModule.featured_text,
			data: mini ? newTrending.map(miniPayload) : mapTrendingContent(newTrending),
		}),

		charts: createStandardModule({
			title: chartsModule.title,
			subtitle: chartsModule.subtitle,
			position: chartsModule.position,
			source: '/explore/charts',
			featuredText: chartsModule.featured_text,
			data: charts.map(chart => (mini ? miniPayload(chart) : mapChart(chart))),
		}),

		albums: createStandardModule({
			title: newAlbumsModule.title,
			subtitle: newAlbumsModule.subtitle,
			position: newAlbumsModule.position,
			source: '/explore/albums',
			featuredText: newAlbumsModule.featured_text,
			data: newAlbums.map(album =>
				mini
					? miniPayload(album)
					: album.type === 'song'
						? songPayload(album)
						: albumPayload(album),
			),
		}),

		playlists: createStandardModule({
			title: topPlaylistsModule.title,
			subtitle: topPlaylistsModule.subtitle,
			position: topPlaylistsModule.position,
			source: '/explore/featured-playlists',
			featuredText: topPlaylistsModule.featured_text,
			data: topPlaylists.map(playlist =>
				mini ? miniPayload(playlist) : playlistPayload(playlist),
			),
		}),

		radio: createStandardModule({
			title: radioModule.title,
			subtitle: radioModule.subtitle,
			position: radioModule.position,
			source: '/explore/featured-stations',
			featuredText: radioModule.featured_text,
			data: radio.map(station => (mini ? miniPayload(station) : mapRadioStation(station))),
		}),

		artist_recos: createStandardModule({
			title: artistRecosModule?.title || '',
			subtitle: artistRecosModule?.subtitle || '',
			position: artistRecosModule?.position || 0,
			source: 'artist_recos|artistRecos',
			featuredText: artistRecosModule?.featured_text || '',
			data: artistRecos
				? artistRecos.map(artist => (mini ? miniPayload(artist) : mapArtistReco(artist)))
				: [],
		}),

		discover: createStandardModule({
			title: '',
			subtitle: '',
			position: 0,
			source: 'discover',
			featuredText: '',
			data: browseDiscover.map(item => (mini ? miniPayload(item) : mapDiscover(item))),
		}),

		city_mod: createStandardModule({
			title: cityModModule?.title || '',
			subtitle: cityModModule?.subtitle || '',
			position: cityModModule?.position || 0,
			source: 'city_mod|cityMod',
			featuredText: cityModModule?.featured_text || '',
			data: cityMod ? cityMod.map(city => (mini ? miniPayload(city) : mapCityMod(city))) : [],
		}),

		mixes: createStandardModule({
			title: tagMixesModule?.title || '',
			subtitle: tagMixesModule?.subtitle || '',
			position: tagMixesModule?.position || 0,
			source: 'mixes',
			featuredText: tagMixesModule?.featured_text || '',
			data: tagMixes ? tagMixes.map(mix => (mini ? miniPayload(mix) : mapTagMix(mix))) : [],
		}),

		global_config: {
			random_songs_listid: randomSongsListId,
			weekly_top_songs_listid: weeklyTopSongsListId,
		},

		...promoModules,
	};
}

/**
 * Interface for module creation parameters
 */
interface ModuleParams<T> {
	title: string | undefined;
	subtitle: string | undefined;
	position: number;
	source: string;
	featuredText?: string;
	data: T[];
}

/**
 * Creates a standardized module object
 */
function createStandardModule<T>({
	title,
	subtitle,
	position,
	source,
	featuredText = '',
	data,
}: ModuleParams<T>): Module<T> {
	return {
		title: decode(title || ''),
		subtitle: decode(subtitle || ''),
		position,
		source,
		featured_text: decode(featuredText || ''),
		data,
	};
}

/**
 * Extracts and processes promo modules
 */
function mapPromoModules(
	sourceModules: SourceModules,
	mini: boolean,
): Record<string, Module<Promo | MiniEntity>> {
	return Object.keys(sourceModules)
		.filter(key => key.includes('promo'))
		.reduce(
			(accumulator, key, index) => {
				const promoKey = `promo${index}`;
				const moduleData = sourceModules.modules[key];

				accumulator[promoKey] = createStandardModule({
					title: moduleData.title,
					subtitle: moduleData.subtitle,
					position: moduleData.position,
					source: promoKey,
					featuredText: moduleData.featured_text,
					data: sourceModules[key].map(promo => (mini ? miniPayload(promo) : mapPromo(promo))),
				});

				return accumulator;
			},
			{} as Record<string, Module<Promo | MiniEntity>>,
		);
}

/**
 * Maps source artist recommendation data to internal format
 */
function mapArtistReco(source: SourceArtistReco): ArtistReco {
	const {
		id,
		title,
		subtitle,
		type,
		image,
		perma_url: url,
		explicit_content,
		more_info: { featured_station_type, query, station_display_text },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		image: createImageLinks(image),
		explicit: parseBool(explicit_content),
		query,
		featured_station_type,
		station_display_text: decode(station_display_text),
	};
}

/**
 * Maps source discover data to internal format
 */
function mapDiscover(source: SourceDiscover): Discover {
	const {
		id,
		title,
		subtitle,
		type,
		image,
		perma_url: url,
		explicit_content,
		more_info: { badge, is_featured, sub_type, video_thumbnail, video_url, tags },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		explicit: parseBool(explicit_content),
		image,
		badge,
		is_featured: parseBool(is_featured),
		video_thumbnail,
		video_url,
		sub_type,
		tags,
	};
}

/**
 * Maps source city module data to internal format
 */
function mapCityMod(source: SourceCityMod): CityMod {
	const { id, title, subtitle, type, image, perma_url: url, explicit_content, more_info } = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		image: createImageLinks(image),
		explicit: parseBool(explicit_content),
		query: more_info?.query,
		album_id: more_info?.album_id,
		featured_station_type: more_info?.featured_station_type,
	};
}

/**
 * Maps source tag mix data to internal format
 */
function mapTagMix(source: SourceTagMix): TagMix {
	const {
		id,
		title,
		subtitle,
		type,
		perma_url: url,
		explicit_content,
		image,
		language,
		list,
		list_count,
		list_type,
		play_count,
		year,
		more_info: { firstname: first_name, lastname: last_name },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		explicit: parseBool(explicit_content),
		image: createImageLinks(image),
		first_name,
		last_name,
		language,
		list,
		list_count: Number(list_count),
		list_type,
		play_count: Number(play_count),
		year: Number(year),
	};
}

/**
 * Maps source promo data to internal format
 */
function mapPromo(source: SourcePromo): Promo {
	const {
		id,
		title,
		subtitle,
		type,
		perma_url: url,
		explicit_content,
		image,
		language,
		list,
		list_type,
		play_count,
		year,
		more_info: { editorial_language, release_year, square_image },
		list_count,
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		explicit: parseBool(explicit_content),
		image: createImageLinks(square_image ?? image),
		language,
		list,
		list_count: list_count ? Number(list_count) : undefined,
		list_type,
		play_count: play_count ? Number(play_count) : undefined,
		year: year ? Number(year) : undefined,
		editorial_language,
		release_year: release_year ? Number(release_year) : undefined,
	};
}
