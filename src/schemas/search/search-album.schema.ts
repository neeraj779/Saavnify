import { downloadLinkSchema } from '../download.schema';
import { songAPIResponseSchema, songSchema } from '../song/song.schema';
import { z } from 'zod';

export const searchAlbumAPIResponseSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			subtitle: z.string(),
			header_desc: z.string(),
			type: z.string(),
			perma_url: z.string(),
			image: z.string(),
			language: z.string(),
			year: z.string(),
			play_count: z.string(),
			explicit_content: z.string(),
			list_count: z.string(),
			list_type: z.string(),
			list: z.array(songAPIResponseSchema),
			more_info: z.object({
				query: z.string(),
				text: z.string(),
				music: z.string(),
				song_count: z.string(),
				artistMap: songAPIResponseSchema.shape.more_info.shape.artistMap,
			}),
		}),
	),
});

export const searchAlbumSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			description: z.string(),
			year: z.number().nullable(),
			type: z.string(),
			playCount: z.number().nullable(),
			language: z.string(),
			explicitContent: z.boolean(),
			artists: z.object(songSchema.shape.artists.shape),
			url: z.string(),
			image: z.array(downloadLinkSchema),
		}),
	),
});

export type SearchAlbumAPIResponse = z.infer<typeof searchAlbumAPIResponseSchema>;
export type SearchAlbum = z.infer<typeof searchAlbumSchema>;
