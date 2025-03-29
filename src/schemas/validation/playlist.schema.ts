import { z } from 'zod';
import { extractPlaylistId } from './custom.transform.validation';

export const playlistByIdOrLinkSchema = z
	.object({
		id: z.string().optional(),
		link: z.string().url().optional().transform(extractPlaylistId),
		page: z.string().pipe(z.coerce.number()).optional(),
		limit: z.string().optional().pipe(z.coerce.number().optional()),
	})
	.refine(({ id, link }) => id || link, {
		message: 'Either id or link is required.',
	});

export type PlaylistByIdOrLinkInput = z.infer<typeof playlistByIdOrLinkSchema>;
