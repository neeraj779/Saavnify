import { z } from 'zod';

export const searchQuerySchema = z.object({
	query: z.string().min(1, 'Search query cannot be empty'),
});

export const searchPaginatedQuerySchema = z.object({
	query: z.string().min(1, 'Search query cannot be empty'),
	page: z.string().pipe(z.coerce.number()).optional(),
	limit: z.string().pipe(z.coerce.number()).optional(),
});

export type searchQueryInput = z.infer<typeof searchQuerySchema>;
export type searchPaginatedQueryInput = z.infer<typeof searchPaginatedQuerySchema>;
