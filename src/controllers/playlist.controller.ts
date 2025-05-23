import { Handler } from 'hono';
import { playlistService } from '@/services/playlist.service';
import {
	playlistByIdOrLinkSchema,
	playlistRecommendSchema,
} from '@/schemas/validation/playlist.schema';

export class PlaylistController {
	public getPlaylistByIdOrLink: Handler = async c => {
		const { id, link, token, raw, mini } = playlistByIdOrLinkSchema.parse(c.req.query());

		const response = await playlistService.getPlaylistByIdOrLink({
			id,
			link,
			token,
			raw,
			mini,
		});

		return c.json({ success: true, data: response });
	};

	public getRecommendations: Handler = async c => {
		const { id, lang, mini, raw } = playlistRecommendSchema.parse(c.req.query());

		const response = await playlistService.getRecommendations(id, lang, raw, mini);

		return c.json({ success: true, data: response });
	};
}
