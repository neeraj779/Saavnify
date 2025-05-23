import { z } from 'zod';
import { extractAlbumId, filterValidLangs } from './custom.transform.validation';

export const albumRecommendSchema = z.object({
	id: z.string(),
	lang: z.string().transform(filterValidLangs).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});

export const albumSameYearSchema = z.object({
	year: z.string(),
	lang: z.string().transform(filterValidLangs).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});

export const albumByIdOrLinkSchema = z.object({
	id: z.string().optional(),
	token: z.string().optional(),
	link: z.string().url().optional().transform(extractAlbumId),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});
