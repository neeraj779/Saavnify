import { Handler } from 'hono';
import { exploreService } from '@/services/explore.service';
import { featuredContentSchema, trendingSchema } from '@/schemas/validation/explore.schema';
import { homeDataSchema } from '@/schemas/validation/explore.schema';
import { FeaturedPath } from '@/constants/explore.constant';

export class ExploreController {
	public getHomeData: Handler = async c => {
		const { lang, mini, raw } = homeDataSchema.parse(c.req.query());
		const response = await exploreService.getHomeData({ lang, mini, raw });
		return c.json({ success: true, data: response });
	};

	public getTrending: Handler = async c => {
		const { type, lang, page, limit, mini, raw } = trendingSchema.parse(c.req.query());
		const response = await exploreService.getTrending({
			page,
			limit,
			type,
			lang,
			mini,
			raw,
		});
		return c.json({ success: true, data: response });
	};

	public getFeaturedContent: Handler = async c => {
		const path = c.req.param('path') as FeaturedPath;
		const { page, limit, lang, raw, mini } = featuredContentSchema.parse({
			path,
			...c.req.query(),
		});
		const response = await exploreService.getFeaturedContent({
			path,
			page,
			limit,
			lang,
			raw,
			mini,
		});
		return c.json({ success: true, data: response });
	};
}

export const exploreController = new ExploreController();
