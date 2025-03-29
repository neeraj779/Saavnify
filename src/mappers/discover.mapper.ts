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
	return {
		new_trending: response.new_trending.map(item => {
			if (item.type === 'song') {
				return mapSongResponse(item as SongAPIResponse);
			}
			if (item.type === 'album') {
				return mapAlbumResponse(item as AlbumAPIResponse);
			}
			return mapPlaylistResponse(item as PlaylistAPIResponse);
		}),
		top_playlists: response.top_playlists.map(item =>
			mapPlaylistResponse(item as PlaylistAPIResponse),
		),
		new_albums: response.new_albums.map(item => {
			if (item.type === 'song') {
				return mapSongResponse(item as SongAPIResponse);
			}
			return mapAlbumResponse(item as AlbumAPIResponse);
		}),
		charts: mapTopChartResponse(response.charts),
		city_mod: response.city_mod.map(item => {
			if (item.type === 'song') {
				return mapSongResponse(item as SongAPIResponse);
			}
			if (item.type === 'playlist') {
				return mapPlaylistResponse(item as PlaylistAPIResponse);
			}
			if (item.type === 'album') {
				return mapAlbumResponse(item as AlbumAPIResponse);
			}
			return mapCityModArtistResponse(item as CityModArtistAPIResponse);
		}),
	};
};
