import { z } from 'zod';

export const paginationSchema = z.object({
	page: z.coerce.number().optional(),
	limit: z.coerce.number().optional(),
});

export const topPlaylistSchema = paginationSchema.extend({
	language: z.string().optional(),
});

export const trendingSchema = paginationSchema
	.extend({
		type: z.enum(['song', 'album', 'playlist']).optional(),
		language: z.string().optional(),
	})
	.refine(data => (data.type && data.language) || (!data.type && !data.language), {
		message: "Both 'type' and 'language' must be provided together or omitted",
		path: ['type', 'language'],
	});
