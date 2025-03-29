import { z } from 'zod';
import { downloadLinkSchema } from '../download.schema';

export const topChartAPIResponseSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		subtitle: z.string().optional(),
		type: z.string(),
		image: z.string(),
		count: z.number().optional(),
		perma_url: z.string(),
		more_info: z.object({ firstname: z.string() }),
		language: z.string().optional(),
	}),
);

export const topChartSchema = z.array(
	z.object({
		id: z.string(),
		image: z.array(downloadLinkSchema),
		title: z.string(),
		subtitle: z.string().optional(),
		type: z.string(),
		count: z.number().optional(),
		perma_url: z.string(),
		more_info: z.object({ firstname: z.string() }),
		language: z.string().optional(),
	}),
);
export type TopChartAPIResponse = z.infer<typeof topChartAPIResponseSchema>;
export type TopChart = z.infer<typeof topChartSchema>;
