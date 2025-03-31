import { z } from 'zod';
import { downloadLinkSchema } from '../download.schema';

export const topArtistsAPIResponseSchema = z.object({
	top_artists: z.array(
		z.object({
			artistid: z.string(),
			name: z.string(),
			image: z.string(),
			follower_count: z.number(),
			is_followed: z.boolean(),
			perma_url: z.string(),
		}),
	),
	status: z.string(),
});

export const topArtistsSchema = z.array(
	z.object({
		artistid: z.string(),
		name: z.string(),
		image: z.array(downloadLinkSchema),
		follower_count: z.number(),
		is_followed: z.boolean(),
		perma_url: z.string(),
	}),
);

export type TopArtistsAPIResponse = z.infer<typeof topArtistsAPIResponseSchema>;
export type TopArtists = z.infer<typeof topArtistsSchema>;
