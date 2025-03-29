import { Handler } from 'hono';
import { songService } from '@/services/song.service';
import {
	songIdsOrLinkSchema,
	songLyricsQuerySchema,
	songParamsSchema,
	songSuggestionsQuerySchema,
} from '@/schemas/validation/song.schema';

export class SongController {
	public getSongByIdsOrLink: Handler = async c => {
		const { ids, link } = songIdsOrLinkSchema.parse(c.req.query());
		if (!ids && !link) {
			return c.json({ success: false, message: 'Missing ids or link' }, 400);
		}

		const response = link
			? await songService.getSongByLink(link)
			: await songService.getSongByIds({ songIds: ids! });

		return c.json({ success: true, data: response });
	};

	public getSongById: Handler = async c => {
		const { id } = songParamsSchema.parse(c.req.param());
		const { lyrics } = songLyricsQuerySchema.parse(c.req.query());

		const response = await songService.getSongByIds({
			songIds: id,
			includeLyrics: lyrics === 'true',
		});

		return c.json({ success: true, data: response });
	};

	public getSongLyrics: Handler = async c => {
		const { id } = songParamsSchema.parse(c.req.param());
		const response = await songService.getSongLyrics(id);
		return c.json({ success: true, data: response });
	};

	public getSongSuggestions: Handler = async c => {
		const { id } = songParamsSchema.parse(c.req.param());
		const { limit } = songSuggestionsQuerySchema.parse(c.req.query());
		const response = await songService.getSongSuggestions({
			songId: id,
			limit: limit || 10,
		});

		return c.json({ success: true, data: response });
	};
}
