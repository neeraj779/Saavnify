import { Handler } from 'hono';
import { discoverService } from '@/services/discover.service';
import {
	paginationSchema,
	topPlaylistSchema,
	trendingSchema,
} from '@/schemas/validation/discover.schema';

export class DiscoverController {
	public getHomeData: Handler = async c => {
		const response = await discoverService.getHomeData();
		return c.json({ success: true, data: response });
	};

	public getTopSearches: Handler = async c => {
		const response = await discoverService.getTopSearches();
		return c.json({ success: true, data: response });
	};

	public getTopCharts: Handler = async c => {
		const { page, limit } = paginationSchema.parse(c.req.query());
		const response = await discoverService.getTopCharts({ page: page || 0, limit: limit || 10 });
		return c.json({ success: true, data: response });
	};

	public getTrending: Handler = async c => {
		const { page, limit, type, language } = trendingSchema.parse(c.req.query());
		const response = await discoverService.getTrending({
			page: page || 0,
			limit: limit || 10,
			type: type || '',
			language: language || '',
		});
		return c.json({ success: true, data: response });
	};

	public getNewReleases: Handler = async c => {
		const { page, limit } = paginationSchema.parse(c.req.query());
		const response = await discoverService.getNewReleases({ page: page || 0, limit: limit || 10 });
		return c.json({ success: true, data: response });
	};

	public getTopPlaylists: Handler = async c => {
		const { page, limit, language } = topPlaylistSchema.parse(c.req.query());
		const response = await discoverService.getTopPlaylists({
			page: page || 1,
			limit: limit || 50,
			language: language || '',
		});
		return c.json({ success: true, data: response });
	};

	public getTopArtists: Handler = async c => {
		const response = await discoverService.getTopArtists();
		return c.json({ success: true, data: response });
	};
}

export const discoverController = new DiscoverController();
