import { z } from 'zod';
import { songAPIResponseSchema, songSchema } from '../song/song.schema';
import { albumAPIResponseSchema, albumSchema } from '../album.schema';

export const newReleaseAPIResponseSchema = z.object({
	data: z.array(z.union([songAPIResponseSchema, albumAPIResponseSchema])),
	count: z.number(),
	last_page: z.boolean(),
});

export const newReleaseSchemaDto = z.object({
	songs: z.array(songSchema),
	albums: z.array(albumSchema),
});

export type NewReleaseAPIResponse = z.infer<typeof newReleaseAPIResponseSchema>;
export type NewReleaseSchemaDto = z.infer<typeof newReleaseSchemaDto>;
