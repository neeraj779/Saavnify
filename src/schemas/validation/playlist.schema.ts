import { z } from 'zod';
import { extractPlaylistId, filterValidLangs } from './custom.transform.validation';

export const playlistRecommendSchema = z.object({
	id: z.string(),
	lang: z.string().transform(filterValidLangs).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});

export const playlistByIdOrLinkSchema = z.object({
	id: z.string().optional(),
	token: z.string().optional(),
	link: z.string().url().optional().transform(extractPlaylistId),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});
