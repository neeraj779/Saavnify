import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import {
	GetArtistAlbums,
	GetArtistById,
	GetArtistByLink,
	GetArtistSongs,
} from '@/types/artist.types';
import { mapAlbumResponse } from '@/mappers/album.mapper';
import { mapSongResponse } from '@/mappers/song.mapper';
import { mapArtistResponse } from '@/mappers/artist.mapper';
import { Artist, ArtistAPIResponse } from '@/schemas/artist/artist.schema';
import { ArtistSong, ArtistSongAPIResponse } from '@/schemas/artist/artist-song.schema';
import { ArtistAlbum, ArtistAlbumAPIResponse } from '@/schemas/artist/artist-album.schema';

export class ArtistService {
	async getArtistById({
		artistId,
		page = '0',
		songCount = '10',
		albumCount = '10',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistById): Promise<Artist> {
		const { data } = await useFetch<ArtistAPIResponse>({
			endpoint: Endpoints.artists.id,
			params: {
				artistId,
				n_song: songCount,
				n_album: albumCount,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.NOT_FOUND);

		return mapArtistResponse(data);
	}

	async getArtistByLink({
		token,
		page = '0',
		songCount = '10',
		albumCount = '10',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistByLink): Promise<Artist> {
		const { data } = await useFetch<ArtistAPIResponse>({
			endpoint: Endpoints.artists.link,
			params: {
				token,
				n_song: songCount,
				n_album: albumCount,
				page,
				sort_order: sortOrder,
				category: sortBy,
				type: 'artist',
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.NOT_FOUND);

		return mapArtistResponse(data);
	}

	async getArtistSongs({
		artistId,
		page = '0',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistSongs): Promise<ArtistSong> {
		const { data } = await useFetch<ArtistSongAPIResponse>({
			endpoint: Endpoints.artists.songs,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.SONGS_NOT_FOUND);

		return {
			total: data.topSongs.total,
			songs: data.topSongs.songs.map(song => mapSongResponse(song)),
		};
	}

	async getArtistAlbums({
		artistId,
		page = '0',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistAlbums): Promise<ArtistAlbum> {
		const { data } = await useFetch<ArtistAlbumAPIResponse>({
			endpoint: Endpoints.artists.albums,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.ALBUMS_NOT_FOUND);

		return {
			total: data.topAlbums.total,
			albums: data.topAlbums.albums.map(album => mapAlbumResponse(album)),
		};
	}
}

export const artistService = new ArtistService();
