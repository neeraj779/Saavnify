import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { mapAlbumResponse } from '@/mappers/album.mapper';
import { Album, AlbumAPIResponse } from '@/schemas/album.schema';

export class AlbumService {
	async getAlbumById(id: string): Promise<Album> {
		const { data } = await useFetch<AlbumAPIResponse>({
			endpoint: Endpoints.albums.id,
			params: { albumid: id },
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);

		return mapAlbumResponse(data);
	}

	async getAlbumByLink(token: string): Promise<Album> {
		const { data } = await useFetch<AlbumAPIResponse>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				type: 'album',
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);

		return mapAlbumResponse(data);
	}
}

export const albumService = new AlbumService();
