import { z } from 'zod';
import { filterValidLangs } from './custom.transform.validation';
import { FeaturedPaths } from '@/constants/explore.constant';

export const paginationSchema = z.object({
	page: z.coerce.number().optional(),
	limit: z.coerce.number().optional(),
});

export const homeDataSchema = z.object({
	lang: z.string().transform(filterValidLangs).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
});

export const trendingSchema = paginationSchema.extend({
	type: z.enum(['song', 'album', 'playlist']).optional(),
	lang: z.string().transform(filterValidLangs).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
});

export const featuredContentSchema = paginationSchema.extend({
	path: z.enum(FeaturedPaths),
	lang: z.string().transform(filterValidLangs).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});
