import { decode } from 'entities';

import { createImageLinks, parseBool } from '../lib/utils';
import { SourceAlbum } from '../types/external/album.types';
import {
	SourceChart,
	SourceFeaturedPlaylists,
	SourceLabel,
	SourceMenuItem,
	SourceMegaMenu,
	SourceMix,
	SourceRadioStation,
	SourceTopAlbums,
	SourceTopArtists,
	SourceTopShow,
	SourceTopShows,
} from '../types/external/explore.types';
import { SourcePlaylist } from '../types/external/playlist.types';
import { SourceSong } from '../types/external/song.types';
import { MiniEntity } from '../types/common.types';
import {
	Chart,
	FeaturedPlaylists,
	Label,
	MegaMenu,
	MenuItem,
	Mix,
	RadioStation,
	TopAlbums,
	TopArtist,
	TopShow,
	TopShows,
} from '../types/internal/explore.types';
import { albumPayload } from '../payloads/album.mapper';
import { miniPayload } from '../payloads/misc.mapper';
import { playlistPayload } from '../payloads/playlist.mapper';
import { songPayload } from '../payloads/song.mapper';

/**
 * Maps trending content items to appropriate payload types
 * @param sources - Array of source entities
 * @param mini - Whether to return mini payload version
 * @returns Array of mapped entities
 */
export function mapTrendingContent(
	sources: (SourceAlbum | SourceSong | SourcePlaylist)[],
	mini = false,
) {
	return sources.map(item => {
		if (mini) {
			return miniPayload(item);
		}

		switch (item.type) {
			case 'song':
				return songPayload(item);
			case 'album':
				return albumPayload(item);
			default:
				return playlistPayload(item);
		}
	});
}

/**
 * Maps featured playlists data to internal format
 * @param source - Source featured playlists data
 * @param mini - Whether to return mini payload version
 * @returns Formatted featured playlists data
 */
export function mapFeaturedPlaylists(
	source: SourceFeaturedPlaylists,
	mini = false,
): FeaturedPlaylists {
	return {
		count: source.count,
		last_page: source.last_page,
		data: source.data.map(playlist => (mini ? miniPayload(playlist) : playlistPayload(playlist))),
	};
}

/**
 * Maps chart data to internal format
 * @param source - Source chart data
 * @returns Formatted chart data
 */
export function mapChart(source: SourceChart): Chart {
	const {
		id,
		title,
		type,
		image,
		perma_url: url,
		explicit_content,
		listname,
		language,
		more_info,
	} = source;

	return {
		id,
		name: decode(title),
		listname,
		subtitle: type,
		type,
		url,
		explicit: explicit_content ? parseBool(explicit_content) : false,
		image: createImageLinks(image),
		first_name: decode(more_info?.firstname ?? ''),
		language: language,
		count: source.count ?? more_info?.song_count,
	};
}

/**
 * Maps top show data to internal format
 * @param source - Source top show data
 * @returns Formatted top show data
 */
function mapTopShow(source: SourceTopShow): TopShow {
	const {
		id,
		title,
		subtitle,
		type,
		image,
		perma_url: url,
		explicit_content,
		more_info: { badge, release_date, square_image, season_number },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		image: createImageLinks(square_image),
		banner_image: createImageLinks(image),
		url,
		explicit: parseBool(explicit_content),
		badge,
		release_date,
		season_number: Number(season_number),
	};
}

/**
 * Maps top shows data to internal format
 * @param source - Source top shows data
 * @returns Formatted top shows data
 */
export function mapTopShows(source: SourceTopShows): TopShows {
	const { last_page, data, trendingPodcasts } = source;

	const trendingPodcastsData = trendingPodcasts[0];

	return {
		count: data.length,
		last_page,
		data: data.map(mapTopShow),
		trending_podcasts: {
			title: trendingPodcastsData.module.title,
			subtitle: trendingPodcastsData.module.subtitle,
			source: 'trending_podcasts|trendingPodcasts',
			data: trendingPodcastsData.items.map(item => ({
				id: item.id,
				name: decode(item.title),
				subtitle: decode(item.subtitle),
				type: item.type,
				image: createImageLinks(item.image),
				url: item.perma_url,
				explicit: parseBool(item.explicit_content),
			})),
		},
	};
}

/**
 * Maps top artists data to internal format
 * @param source - Source top artists data
 * @returns Array of formatted top artists
 */
export function mapTopArtists(source: SourceTopArtists): TopArtist[] {
	return source.top_artists.map(artist => {
		const { artistid: id, name, image, perma_url: url, is_followed, follower_count } = artist;

		return {
			id,
			name: decode(name),
			image: createImageLinks(image),
			url,
			is_followed,
			follower_count,
		};
	});
}

/**
 * Maps top albums data to internal format
 * @param source - Source top albums data
 * @param mini - Whether to return mini payload version
 * @returns Formatted top albums data or array of mini entities
 */
export function mapTopAlbums(source: SourceTopAlbums, mini = false): TopAlbums | MiniEntity[] {
	const { count, last_page, data } = source;

	return {
		count,
		last_page,
		data: data.map(album => {
			if (mini) {
				return miniPayload(album);
			}
			return album.type === 'song' ? songPayload(album) : albumPayload(album);
		}),
	};
}

/**
 * Maps radio station data to internal format
 * @param source - Source radio station data
 * @returns Formatted radio station data
 */
export function mapRadioStation(source: SourceRadioStation): RadioStation {
	const {
		id,
		title,
		subtitle,
		type,
		perma_url: url,
		explicit_content,
		image,
		more_info: { featured_station_type, language, station_display_text, color, description, query },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		url,
		explicit: parseBool(explicit_content),
		image: createImageLinks(image),
		featured_station_type,
		language,
		station_display_text,
		color,
		description,
		query,
	};
}

/**
 * Maps mix data to internal format
 * @param source - Source mix data
 * @param mini - Whether to use mini payload for songs in the mix
 * @returns Formatted mix data
 */
export function mapMix(source: SourceMix, mini = false): Mix {
	const {
		id,
		title,
		subtitle,
		header_desc,
		type,
		perma_url: url,
		image,
		language,
		year,
		play_count,
		explicit_content,
		list_count,
		list_type,
		list,
		more_info: { uid: user_id, last_updated, username, firstname, lastname, is_followed, share },
	} = source;

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		header_desc: decode(header_desc),
		type,
		url,
		image: createImageLinks(image),
		language,
		year: Number(year),
		play_count: Number(play_count),
		explicit: parseBool(explicit_content),
		list_count: Number(list_count),
		list_type,
		songs: list.map(song => songPayload(song, mini)),
		user_id,
		last_updated,
		username,
		firstname,
		lastname,
		is_followed: parseBool(is_followed),
		share: Number(share),
	};
}

/**
 * Maps label data to internal format
 * @param source - Source label data
 * @param mini - Whether to return mini payload versions for albums
 * @returns Formatted label data
 */
export function mapLabel(source: SourceLabel, mini = false): Label {
	const {
		labelId: id,
		name,
		image,
		topSongs: { songs, total: songsTotal },
		topAlbums: { albums, total: albumsTotal },
		urls,
		availableLanguages: available_languages,
	} = source;

	return {
		id,
		name: decode(name),
		type: 'label',
		image: createImageLinks(image),
		top_songs: {
			songs: songs.map(song => songPayload(song, mini)),
			total: songsTotal,
		},
		top_albums: {
			albums: albums.map(album => (mini ? miniPayload(album) : albumPayload(album))),
			total: albumsTotal,
		},
		urls,
		available_languages,
	};
}

/**
 * Maps mega menu data to internal format
 * @param source - Source mega menu data
 * @returns Formatted mega menu data
 */
export function mapMegaMenu(source: SourceMegaMenu): MegaMenu {
	const {
		mega_menu: { new_releases, top_artists, top_playlists },
	} = source;

	return {
		new_releases: mapMenuItems(new_releases),
		top_artists: mapMenuItems(top_artists),
		top_playlists: mapMenuItems(top_playlists),
	};
}

/**
 * Maps menu items to internal format
 * @param items - Source menu items
 * @returns Array of formatted menu items
 */
function mapMenuItems(items: SourceMenuItem[]): MenuItem[] {
	return items.map(({ title, perma_url: url }) => ({
		name: decode(title),
		url,
	}));
}
