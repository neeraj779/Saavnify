import { Handler } from 'hono';
import { searchService } from '@/services/search.service';
import { searchPaginatedQuerySchema, searchQuerySchema } from '@/schemas/validation/search.schema';

export class SearchController {
	public searchAll: Handler = async c => {
		const { query } = searchQuerySchema.parse(c.req.query());
		const response = await searchService.searchAll(query);
		return c.json({ success: true, data: response });
	};

	public searchSongs: Handler = async c => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(c.req.query());
		const response = await searchService.searchSongs({ query, page, limit });
		return c.json({ success: true, data: response });
	};

	public searchAlbums: Handler = async c => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(c.req.query());
		const response = await searchService.searchAlbums({ query, page, limit });
		return c.json({ success: true, data: response });
	};

	public searchArtists: Handler = async c => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(c.req.query());
		const response = await searchService.searchArtists({ query, page, limit });
		return c.json({ success: true, data: response });
	};

	public searchPlaylists: Handler = async c => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(c.req.query());
		const response = await searchService.searchPlaylists({ query, page, limit });
		return c.json({ success: true, data: response });
	};
}
