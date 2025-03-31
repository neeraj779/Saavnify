import { z } from 'zod';
import { songAPIResponseSchema, songSchema } from '../song/song.schema';
import { albumAPIResponseSchema, albumSchema } from '../album.schema';
import { playlistAPIResponseSchema, playlistSchema } from '../playlist.schema';

export const trendingAPIResponseSchema = z.array(
	z.union([songAPIResponseSchema, albumAPIResponseSchema, playlistAPIResponseSchema]),
);

export const trendingSchema = z.object({
	songs: z.array(songSchema),
	albums: z.array(albumSchema),
	playlists: z.array(playlistSchema),
});

export type TrendingAPIResponse = z.infer<typeof trendingAPIResponseSchema>;
export type TrendingSchema = z.infer<typeof trendingSchema>;
