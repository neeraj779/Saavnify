import { Handler } from 'hono';
import { songService } from '@/services/song.service';
import {
	songIdsOrLinkSchema,
	songLyricsQuerySchema,
	songSuggestionsQuerySchema,
} from '@/schemas/validation/song.schema';

export class SongController {
	public getSongByIdsOrLink: Handler = async c => {
		const { ids, link, token, raw, mini } = songIdsOrLinkSchema.parse(c.req.query());

		const response = await songService.getSongByIdsOrLink({
			songIds: ids!,
			link,
			token,
			raw,
			mini,
		});

		return c.json({ success: true, data: response });
	};

	public getSongLyrics: Handler = async c => {
		const { id } = songLyricsQuerySchema.parse(c.req.param());
		const response = await songService.getSongLyrics(id);
		return c.json({ success: true, data: response });
	};

	public getSongSuggestions: Handler = async c => {
		const { id, lang, mini, raw } = songSuggestionsQuerySchema.parse(c.req.query());
		const response = await songService.getSongSuggestions({
			id,
			lang,
			mini,
			raw,
		});

		return c.json({ success: true, data: response });
	};
}
