import { z } from 'zod';
import { downloadLinkSchema } from '../download.schema';

export const topPlaylistAPIResponseSchema = z.object({
	data: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			subtitle: z.string(),
			type: z.string(),
			image: z.string(),
			perma_url: z.string(),
			more_info: z.object({
				song_count: z.string(),
				firstname: z.string(),
				follower_count: z.string(),
				last_updated: z.string(),
				uid: z.string(),
			}),
			explicit_content: z.string(),
			mini_obj: z.boolean(),
		}),
	),
	count: z.number(),
	last_page: z.boolean(),
});

export const topPlaylistSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		subtitle: z.string(),
		type: z.string(),
		image: z.array(downloadLinkSchema),
		perma_url: z.string(),
		more_info: z.object({
			song_count: z.string(),
			firstname: z.string(),
			follower_count: z.string(),
			last_updated: z.string(),
			uid: z.string(),
		}),
		explicit_content: z.string(),
	}),
);

export type TopPlaylistAPIResponse = z.infer<typeof topPlaylistAPIResponseSchema>;
export type TopPlaylist = z.infer<typeof topPlaylistSchema>;
