import { z } from 'zod';
import { filterValidLangs } from './custom.transform.validation';

export const songIdsOrLinkSchema = z
	.object({
		ids: z.string().optional(),
		link: z
			.string()
			.url()
			.optional()
			.transform(value => value?.split('/').at(-1)),
		token: z.string().optional(),
		raw: z.string().pipe(z.coerce.boolean()).optional(),
		mini: z.string().pipe(z.coerce.boolean()).optional(),
	})
	.refine(({ ids, link, token }) => ids || link || token, {
		message: 'Either song ID(s) or link is required.',
	});

export const songLyricsQuerySchema = z.object({
	id: z.string(),
});

export const songSuggestionsQuerySchema = z.object({
	id: z.string(),
	lang: z.string().transform(filterValidLangs).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
});

export type SongByIdsOrLinkInput = z.infer<typeof songIdsOrLinkSchema>;
export type SongSuggestionsQueryInput = z.infer<typeof songSuggestionsQuerySchema>;
