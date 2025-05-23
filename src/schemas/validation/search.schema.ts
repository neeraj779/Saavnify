import { z } from 'zod';

export const searchAllSchema = z.object({
	q: z.string().min(1, 'Search query cannot be empty'),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
});

export const searchTopSchema = z.object({
	raw: z.string().pipe(z.coerce.boolean()).optional(),
});

export const searchPaginatedSchema = z.object({
	q: z.string().min(1, 'Search query cannot be empty'),
	page: z.string().pipe(z.coerce.number()).optional(),
	n: z.string().pipe(z.coerce.number()).optional(),
	raw: z.string().pipe(z.coerce.boolean()).optional(),
	mini: z.string().pipe(z.coerce.boolean()).optional(),
});
