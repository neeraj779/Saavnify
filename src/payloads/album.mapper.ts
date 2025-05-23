import { decode } from 'entities';

import { createImageLinks, parseBool } from '../lib/utils';
import { SourceAlbum, SourceAlbumModules } from '../types/external/album.types';
import { Album, AlbumModules } from '../types/internal/album.types';
import { artistMapPayload } from './artist.mapper';
import { songPayload } from './song.mapper';

export function albumPayload(sourceAlbum: SourceAlbum, isMini: boolean = false): Album {
	const {
		id,
		title,
		type,
		subtitle,
		language,
		play_count,
		explicit_content,
		year,
		perma_url: url,
		header_desc,
		list_count,
		list_type,
		image,
		more_info,
		list,
		modules,
	} = sourceAlbum;

	const songs = parseSongs(list);
	const totalDuration = songs.reduce((sum, song) => sum + +song.more_info.duration, 0);
	const resolvedPlayCount = +play_count || calculatePlayCountFromSongs(songs);

	const resolvedSubtitle = subtitle
		? decode(subtitle)
		: decode(artistMapToSubtitle(more_info.artistMap));

	return {
		id,
		name: decode(title),
		subtitle: resolvedSubtitle,
		type,
		language,
		play_count: resolvedPlayCount,
		duration: totalDuration,
		explicit: parseBool(explicit_content),
		year: +year,
		url,
		header_desc: decode(header_desc),
		list_count: +list_count,
		list_type,
		image: createImageLinks(image),
		artist_map: more_info.artistMap ? artistMapPayload(more_info.artistMap) : undefined,
		song_count: more_info.song_count ? +more_info.song_count : undefined,
		is_dolby_content: more_info.is_dolby_content,
		copyright_text: more_info.copyright_text,
		label_url: more_info.label_url,
		songs: songs.map(song => songPayload(song, isMini)),
		modules: modules ? albumModulesPayload(modules) : undefined,
	};
}

// Helpers
function parseSongs(list: SourceAlbum['list']) {
	return !list || typeof list === 'string' ? [] : list;
}

function calculatePlayCountFromSongs(songs: NonNullable<ReturnType<typeof parseSongs>>) {
	return songs.reduce((sum, song) => sum + +song.play_count, 0);
}

function artistMapToSubtitle(artistMap?: SourceAlbum['more_info']['artistMap']): string {
	if (!artistMap?.artists?.length) return '';
	return artistMap.artists.map(artist => artist.name.trim()).join(', ');
}

export function albumModulesPayload(sourceModules: SourceAlbumModules): AlbumModules {
	const { reco, currentlyTrending, topAlbumsFromSameYear, artists } = sourceModules;

	return {
		recommend: {
			title: reco.title,
			subtitle: reco.subtitle,
			position: reco.position,
			source: '/album/recommend',
			params: {
				id: reco.source_params.albumid,
			},
		},
		currently_trending: {
			title: currentlyTrending.title,
			subtitle: currentlyTrending.subtitle,
			position: currentlyTrending.position,
			source: '/get/trending',
			params: {
				type: currentlyTrending.source_params.entity_type,
				lang: currentlyTrending.source_params.entity_language,
			},
		},
		top_albums_from_same_year: {
			title: topAlbumsFromSameYear.title,
			subtitle: topAlbumsFromSameYear.subtitle,
			position: topAlbumsFromSameYear.position,
			source: '/album/same-year',
			params: {
				year: topAlbumsFromSameYear.source_params.album_year,
				lang: topAlbumsFromSameYear.source_params.album_lang,
			},
		},
		artists: {
			title: artists.title,
			subtitle: artists.subtitle,
			position: artists.position,
			source: 'artist_map|artistMap > artists',
		},
	};
}
