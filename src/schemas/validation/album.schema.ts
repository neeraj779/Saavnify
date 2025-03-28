import { z } from 'zod';
import { extractAlbumId } from './custom.transform.validation';

export const albumByIdOrLinkSchema = z
	.object({
		id: z.string().optional(),
		link: z.string().url().optional().transform(extractAlbumId),
	})
	.refine(({ id, link }) => id || link, {
		message: 'Either id or link is required.',
	});

export type AlbumByIdOrLinkInput = z.infer<typeof albumByIdOrLinkSchema>;
