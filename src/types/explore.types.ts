export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface PlaylistParams extends PaginationParams {
	lang: string;
}

export interface TrendingParams extends PaginationParams {
	type?: string;
	lang?: string;
	mini?: boolean;
	raw?: boolean;
}

export interface GetFeaturedContentParams extends PaginationParams {
	path: string;
	lang?: string;
	mini?: boolean;
	raw?: boolean;
}
