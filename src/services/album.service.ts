import { useFetch } from '@/utils/fetch.util';
import { Endpoints } from '@/constants/endpoint.constant';
import { ErrorMessages } from '@/constants/error.constant';
import { AppError } from '@/types/error.types';
import { Album } from '@/types/internal/album.types';
import { SourceAlbum } from '@/types/external/album.types';
import { albumPayload } from '@/payloads/album.mapper';

export class AlbumService {
	async getAlbumByIdOrLink(
		id = '',
		link = '',
		token = '',
		raw = false,
		mini = false,
	): Promise<Album | SourceAlbum> {
		const data = await useFetch<SourceAlbum>({
			endpoint: id ? Endpoints.album.id : Endpoints.album.link,
			params: { albumid: id, token: token ? token : link, type: 'album' },
		});

		if (!data.id) throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);

		if (raw) return data;

		return albumPayload(data, mini);
	}

	async getRecommendations(
		id: string,
		lang = '',
		raw = false,
		mini = false,
	): Promise<Album[] | SourceAlbum[]> {
		const data = await useFetch<SourceAlbum[]>({
			endpoint: Endpoints.album.recommend,
			params: { albumid: id, language: lang },
		});

		if (raw) return data;

		return data.map(album => albumPayload(album, mini));
	}

	async getSameYearAlbums(
		year: string,
		lang = '',
		raw = false,
		mini = false,
	): Promise<Album[] | SourceAlbum[]> {
		const data = await useFetch<SourceAlbum[]>({
			endpoint: Endpoints.album.same_year,
			params: { album_year: year, album_lang: lang },
		});

		if (!data.length) {
			throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);
		}

		if (raw) return data;

		return data.map(album => albumPayload(album, mini));
	}
}

export const albumService = new AlbumService();
