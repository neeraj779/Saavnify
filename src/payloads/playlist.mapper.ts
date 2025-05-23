import { decode } from 'entities';

import { createImageLinks, dedupArtists, parseBool } from '../lib/utils';
import { SourcePlaylist, SourcePlaylistModules } from '../types/external/playlist.types';
import { Playlist, PlaylistModules } from '../types/internal/playlist.types';
import { artistMiniPayload } from './artist.mapper';
import { songPayload } from './song.mapper';

export function playlistPayload(p: SourcePlaylist, mini: boolean = false): Playlist {
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
		more_info: {
			uid: user_id,
			last_updated,
			username,
			firstname: first_name,
			lastname: last_name,
			is_followed,
			share,
			fan_count,
			follower_count,
			playlist_type,
			last_updated_epoch: last_updated_timestamp,
			artists: artists,
		},
		modules,
	} = p;

	function getSongs() {
		return !list || typeof list === 'string' ? [] : list;
	}

	return {
		id,
		name: decode(title),
		subtitle: decode(subtitle),
		type,
		header_desc: decode(header_desc ?? ''),
		url,
		image: createImageLinks(image),
		language,
		year: +year,
		play_count: +play_count,
		explicit: parseBool(explicit_content),
		list_count: +list_count,
		list_type,
		songs: getSongs().map(s => songPayload(s, mini)),
		user_info: {
			user_id,
			last_updated,
			username,
			first_name,
			last_name,
			is_followed: parseBool(is_followed),
			share_url: share,
			fan_count: fan_count ? +fan_count.replace(/,/g, '') : 0,
			follower_count: follower_count ? +follower_count : 0,
			playlist_type,
			last_updated_timestamp,
			artists: artists ? dedupArtists(artists?.map(artistMiniPayload)) : undefined,
		},
		modules: modules ? playlistModulesPayload(modules) : undefined,
	};
}

type PlaylistModulesPayload = (m: SourcePlaylistModules) => PlaylistModules;

export const playlistModulesPayload: PlaylistModulesPayload = m => {
	const { relatedPlaylist: r, currentlyTrendingPlaylists: c, artists: a } = m;

	return {
		related_playlist: {
			title: r.title,
			subtitle: r.subtitle,
			source: '/playlist/recommend',
			position: r.position,
			params: {
				id: r.source_params.listid,
			},
		},
		currently_trending_playlists: {
			title: c.title,
			subtitle: c.subtitle,
			source: '/get/trending',
			position: c.position,
			params: {
				type: c.source_params.entity_type,
				lang: c.source_params.entity_language,
			},
		},
		artists: {
			title: a.title,
			subtitle: a.subtitle,
			source: a.source,
			position: a.position,
		},
	};
};
