import { Handler } from 'hono';
import { artistService } from '@/services/artist.service';
import {
	artistByIdOrLinkSchema,
	artistIdParamsSchema,
	artistPaginatedQuerySchema,
} from '@/schemas/validation/artist.schema';

export class ArtistController {
	public getArtistByIdOrLink: Handler = async c => {
		const { link, id, page, sortBy, sortOrder, songCount, albumCount } =
			artistByIdOrLinkSchema.parse(c.req.query());

		const response = link
			? await artistService.getArtistByLink({
					token: link,
					page,
					songCount,
					albumCount,
					sortBy,
					sortOrder,
				})
			: await artistService.getArtistById({
					artistId: id!,
					page,
					songCount,
					albumCount,
					sortBy,
					sortOrder,
				});

		return c.json({ success: true, data: response });
	};

	public getArtistById: Handler = async c => {
		const { id } = artistIdParamsSchema.parse(c.req.param());
		const { page, songCount, albumCount, sortBy, sortOrder } = artistByIdOrLinkSchema.parse(
			c.req.query(),
		);

		const response = await artistService.getArtistById({
			artistId: id,
			page,
			songCount,
			albumCount,
			sortBy,
			sortOrder,
		});

		return c.json({ success: true, data: response });
	};

	public getArtistSongs: Handler = async c => {
		const { id } = artistIdParamsSchema.parse(c.req.param());
		const { page, sortBy, sortOrder } = artistPaginatedQuerySchema.parse(c.req.query());

		const response = await artistService.getArtistSongs({
			artistId: id,
			page,
			sortBy,
			sortOrder,
		});

		return c.json({ success: true, data: response });
	};

	public getArtistAlbums: Handler = async c => {
		const { id } = artistIdParamsSchema.parse(c.req.param());
		const { page, sortBy, sortOrder } = artistPaginatedQuerySchema.parse(c.req.query());

		const response = await artistService.getArtistAlbums({
			artistId: id,
			page,
			sortBy,
			sortOrder,
		});

		return c.json({ success: true, data: response });
	};
}
