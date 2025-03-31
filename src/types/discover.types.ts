export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PlaylistParams extends PaginationParams {
	language: string;
}

export interface TrendingParams extends PaginationParams {
	type: string;
	language: string;
}
