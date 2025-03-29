import { z } from 'zod';
import { playlistAPIResponseSchema, playlistSchema } from '../playlist.schema';
import { albumAPIResponseSchema, albumSchema } from '../album.schema';
import { songAPIResponseSchema, songSchema } from '../song/song.schema';
import { topChartAPIResponseSchema, topChartSchema } from './top-chart.schema';
import { downloadLinkSchema } from '../download.schema';

export const cityModArtistAPIResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	image: z.string(),
	type: z.string(),
	perma_url: z.string(),
	mini_obj: z.boolean(),
	subtitle: z.string(),
	secondary_subtitle: z.string(),
	more_info: z.object({ editorial_language: z.string() }),
});

export const cityModArtistSchema = cityModArtistAPIResponseSchema.extend({
	image: z.array(downloadLinkSchema),
});

export const homeDataAPIResponseSchema = z.object({
	new_trending: z.array(
		z.union([playlistAPIResponseSchema, albumAPIResponseSchema, songAPIResponseSchema]),
	),
	top_playlists: z.array(playlistAPIResponseSchema),
	new_albums: z.array(z.union([songAPIResponseSchema, albumAPIResponseSchema])),
	charts: topChartAPIResponseSchema,
	city_mod: z.array(
		z.union([
			songAPIResponseSchema,
			playlistAPIResponseSchema,
			albumAPIResponseSchema,
			cityModArtistAPIResponseSchema,
		]),
	),
});

export const homeDataSchema = z.object({
	new_trending: z.array(z.union([playlistSchema, albumSchema, songSchema])),
	top_playlists: z.array(playlistSchema),
	new_albums: z.array(z.union([songSchema, albumSchema])),
	charts: topChartSchema,
	city_mod: z.array(z.union([songSchema, playlistSchema, albumSchema, cityModArtistSchema])),
});

export type HomeData = z.infer<typeof homeDataSchema>;
export type HomeDataAPIResponse = z.infer<typeof homeDataAPIResponseSchema>;
export type CityModArtist = z.infer<typeof cityModArtistSchema>;
export type CityModArtistAPIResponse = z.infer<typeof cityModArtistAPIResponseSchema>;
