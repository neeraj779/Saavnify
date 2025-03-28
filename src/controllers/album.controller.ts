import { Handler } from 'hono';
import { albumService } from '@/services/album.service';
import { albumByIdOrLinkSchema } from '@/schemas/validation/album.schema';

export class AlbumController {
	public getAlbumByIdOrLink: Handler = async c => {
		const { id, link } = albumByIdOrLinkSchema.parse(c.req.query());

		const response = link
			? await albumService.getAlbumByLink(link)
			: await albumService.getAlbumById(id!);

		return c.json({ success: true, data: response });
	};
}
