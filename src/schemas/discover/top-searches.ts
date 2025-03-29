import { z } from 'zod';
import { downloadLinkSchema } from '../download.schema';
export const topSearchesAPIResponseSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		subtitle: z.string(),
		type: z.string(),
		image: z.string(),
		perma_url: z.string(),
		explicit_content: z.string(),
		mini_obj: z.boolean(),
	}),
);

export const topSearchesSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		subtitle: z.string(),
		type: z.string(),
		image: z.array(downloadLinkSchema),
		perma_url: z.string(),
		explicit_content: z.string(),
	}),
);

export type TopSearchesAPIResponse = z.infer<typeof topSearchesAPIResponseSchema>;
export type TopSearches = z.infer<typeof topSearchesSchema>;
