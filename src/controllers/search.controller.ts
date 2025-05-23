import { Handler } from 'hono';
import { searchService } from '@/services/search.service';
import {
	searchAllSchema,
	searchTopSchema,
	searchPaginatedSchema,
} from '@/schemas/validation/search.schema';
import { SearchPath } from '@/constants/search.constant';

export class SearchController {
	public searchAll: Handler = async c => {
		const { q: query, raw } = searchAllSchema.parse(c.req.query());
		const response = await searchService.searchAll(query, raw);
		return c.json({ success: true, data: response });
	};

	public getTopSearches: Handler = async c => {
		const { raw } = searchTopSchema.parse(c.req.query());
		const response = await searchService.getTopSearches(raw);
		return c.json({ success: true, data: response });
	};

	public searchByType: Handler = async c => {
		const path = c.req.param('path') as SearchPath;
		const { q, page, n, raw, mini } = searchPaginatedSchema.parse(c.req.query());

		const response = await searchService.searchByType(path, q, page, n, raw, mini);

		return c.json({ success: true, data: response });
	};

	public searchPodcasts: Handler = async c => {
		const { q: query, page, n, raw } = searchPaginatedSchema.parse(c.req.query());
		const response = await searchService.searchPodcasts(query, page, n, raw);
		return c.json({ success: true, data: response });
	};
}
