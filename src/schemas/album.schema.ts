import { downloadLinkSchema } from './download.schema';
import { songAPIResponseSchema, songSchema } from './song/song.schema';
import { z } from 'zod';

export const albumAPIResponseSchema = z.object({
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
		artistMap: songAPIResponseSchema.shape.more_info.shape.artistMap,
		song_count: z.string(),
		copyright_text: z.string(),
		is_dolby_content: z.boolean(),
		label_url: z.string(),
	}),
});

export const albumSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	year: z.number().nullable(),
	type: z.string(),
	playCount: z.number().nullable(),
	language: z.string(),
	explicitContent: z.boolean(),
	artists: z.object(songSchema.shape.artists.shape),
	songCount: z.number().nullable(),
	url: z.string(),
	image: z.array(downloadLinkSchema),
	songs: z.array(songSchema).nullable(),
});

export type AlbumAPIResponse = z.infer<typeof albumAPIResponseSchema>;
export type Album = z.infer<typeof albumSchema>;
