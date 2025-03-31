import { NewReleaseAPIResponse, NewReleaseSchemaDto } from '@/schemas/discover/new-release.schema';
import { mapSongResponse } from './song.mapper';
import { SongAPIResponse } from '@/schemas/song';
import { AlbumAPIResponse } from '@/schemas/album.schema';
import { mapAlbumResponse } from './album.mapper';
import { TopArtists } from '@/schemas/discover/top-artist.schema';
import { TopArtistsAPIResponse } from '@/schemas/discover/top-artist.schema';
import { createImageLinks } from '@/utils/link.util';
import { TopChart, TopChartAPIResponse } from '@/schemas/discover/top-chart.schema';
import { TopPlaylist, TopPlaylistAPIResponse } from '@/schemas/discover/top-playlist.schema';
import { TrendingAPIResponse } from '@/schemas/discover/trending.schema';
import { TrendingSchema } from '@/schemas/discover/trending.schema';
import { mapPlaylistResponse } from './playlist.mapper';
import { PlaylistAPIResponse } from '@/schemas/playlist.schema';
import {
	CityModArtistAPIResponse,
	HomeData,
	HomeDataAPIResponse,
} from '@/schemas/discover/home-data.schema';
import { mapCityModArtistResponse } from './artist.mapper';
import { TopSearches } from '@/schemas/discover/top-searches';
import { TopSearchesAPIResponse } from '@/schemas/discover/top-searches';

export const mapNewReleaseResponse = (response: NewReleaseAPIResponse): NewReleaseSchemaDto => {
	return {
		songs: response.data
			.filter(item => item.type === 'song')
			.map(item => mapSongResponse(item as SongAPIResponse)),
		albums: response.data
			.filter(item => item.type === 'album')
			.map(item => mapAlbumResponse(item as AlbumAPIResponse)),
	};
};

export const mapTopArtistsResponse = (response: TopArtistsAPIResponse): TopArtists =>
	response.top_artists.map(artist => ({
		artistid: artist.artistid,
		name: artist.name,
		image: createImageLinks(artist.image),
		follower_count: artist.follower_count,
		is_followed: artist.is_followed,
		perma_url: artist.perma_url,
	}));

export const mapTopChartResponse = (chart: TopChartAPIResponse): TopChart => {
	return chart.map(chart => ({
		id: chart.id,
		image: createImageLinks(chart.image),
		title: chart.title,
		subtitle: chart.subtitle || '',
		type: chart.type,
		count: chart.count || 0,
		perma_url: chart.perma_url,
		more_info: chart.more_info,
		language: chart.language || '',
	}));
};

export const mapTopPlaylistResponse = (response: TopPlaylistAPIResponse): TopPlaylist => {
	return response.data.map(playlist => ({
		id: playlist.id,
		title: playlist.title,
		subtitle: playlist.subtitle,
		type: playlist.type,
		image: createImageLinks(playlist.image),
		perma_url: playlist.perma_url,
		explicit_content: playlist.explicit_content,
		more_info: playlist.more_info,
	}));
};

export const mapTrendingResponse = (response: TrendingAPIResponse): TrendingSchema => {
	return {
		songs: response
			.filter(item => item.type === 'song')
			.map(item => mapSongResponse(item as SongAPIResponse)),
		albums: response
			.filter(item => item.type === 'album')
			.map(item => mapAlbumResponse(item as AlbumAPIResponse)),
		playlists: response
			.filter(item => item.type === 'playlist')
			.map(item => mapPlaylistResponse(item as PlaylistAPIResponse)),
	};
};

export const mapHomeDataResponse = (response: HomeDataAPIResponse): HomeData => {
	const typeMapper = {
		song: mapSongResponse,
		album: mapAlbumResponse,
		playlist: mapPlaylistResponse,
	};

	const songs = (response.new_trending || []).filter(
		item => item.type === 'song',
	) as SongAPIResponse[];
	const albums = (response.new_trending || []).filter(
		item => item.type === 'album',
	) as AlbumAPIResponse[];
	const playlists = (response.new_trending || []).filter(
		item => item.type === 'playlist',
	) as PlaylistAPIResponse[];

	const new_trending = [
		...songs.map(typeMapper.song),
		...albums.map(typeMapper.album),
		...playlists.map(typeMapper.playlist),
	];

	const top_playlists = (response.top_playlists || []).map(mapPlaylistResponse);

	const new_albums_songs = (response.new_albums || []).filter(
		item => item.type === 'song',
	) as SongAPIResponse[];
	const new_albums_albums = (response.new_albums || []).filter(
		item => item.type === 'album',
	) as AlbumAPIResponse[];
	const new_albums = [
		...new_albums_songs.map(typeMapper.song),
		...new_albums_albums.map(typeMapper.album),
	];

	const charts = response.charts ? mapTopChartResponse(response.charts) : [];

	const city_mod_songs = (response.city_mod || []).filter(
		item => item.type === 'song',
	) as SongAPIResponse[];
	const city_mod_playlists = (response.city_mod || []).filter(
		item => item.type === 'playlist',
	) as PlaylistAPIResponse[];
	const city_mod_albums = (response.city_mod || []).filter(
		item => item.type === 'album',
	) as AlbumAPIResponse[];
	const city_mod_artists = (response.city_mod || []).filter(
		item => item.type === 'artist',
	) as CityModArtistAPIResponse[];

	const city_mod = [
		...city_mod_songs.map(typeMapper.song),
		...city_mod_playlists.map(typeMapper.playlist),
		...city_mod_albums.map(typeMapper.album),
		...city_mod_artists.map(mapCityModArtistResponse),
	];

	return {
		new_trending,
		top_playlists,
		new_albums,
		charts,
		city_mod,
	};
};

export const mapTopSearchesResponse = (response: TopSearchesAPIResponse): TopSearches => {
	return response.map(item => ({
		id: item.id,
		title: item.title,
		subtitle: item.subtitle,
		type: item.type,
		image: createImageLinks(item.image),
		perma_url: item.perma_url,
		explicit_content: item.explicit_content,
	}));
};
