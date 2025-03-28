import { Handler } from 'hono';
import { playlistService } from '@/services/playlist.service';
import { playlistByIdOrLinkSchema } from '@/schemas/validation/playlist.schema';

export class PlaylistController {
	public getPlaylistByIdOrLink: Handler = async c => {
		const { id, link, page, limit } = playlistByIdOrLinkSchema.parse(c.req.query());

		const response = link
			? await playlistService.getPlaylistByLink({
					token: link,
					page: page || 0,
					limit: limit || 10,
				})
			: await playlistService.getPlaylistById({
					id: id!,
					page: page || 0,
					limit: limit || 10,
				});

		return c.json({ success: true, data: response });
	};
}
