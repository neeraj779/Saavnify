import { z } from 'zod';

export const songIdsOrLinkSchema = z
	.object({
		ids: z.string().optional(),
		link: z
			.string()
			.url()
			.optional()
			.transform(value => value?.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1]),
	})
	.refine(({ ids, link }) => ids || link, {
		message: 'Either song ID(s) or link is required.',
	});

export const songParamsSchema = z.object({
	id: z.string(),
});

export const songLyricsQuerySchema = z.object({
	lyrics: z.string().optional(),
});

export const songSuggestionsQuerySchema = z.object({
	limit: z.string().optional(),
});

export type SongByIdsOrLinkInput = z.infer<typeof songIdsOrLinkSchema>;
export type SongIdParamsInput = z.infer<typeof songParamsSchema>;
export type SongLyricsQueryInput = z.infer<typeof songLyricsQuerySchema>;
export type SongSuggestionsQueryInput = z.infer<typeof songSuggestionsQuerySchema>;
