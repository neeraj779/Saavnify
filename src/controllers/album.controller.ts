import { Handler } from 'hono';
import { albumService } from '@/services/album.service';
import {
	albumByIdOrLinkSchema,
	albumRecommendSchema,
	albumSameYearSchema,
} from '@/schemas/validation/album.schema';

export class AlbumController {
	public getAlbumByIdOrLink: Handler = async c => {
		const { id, link, token, mini, raw } = albumByIdOrLinkSchema.parse(c.req.query());

		const response = await albumService.getAlbumByIdOrLink(id, link, token, raw, mini);

		return c.json({ success: true, data: response });
	};

	public getRecommendations: Handler = async c => {
		const { id, lang, mini, raw } = albumRecommendSchema.parse(c.req.query());

		const response = await albumService.getRecommendations(id, lang, raw, mini);

		return c.json({ success: true, data: response });
	};

	public getSameYearAlbums: Handler = async c => {
		const { year, lang, mini, raw } = albumSameYearSchema.parse(c.req.query());

		const response = await albumService.getSameYearAlbums(year, lang, raw, mini);

		return c.json({ success: true, data: response });
	};
}
