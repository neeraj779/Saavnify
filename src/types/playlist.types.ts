interface PaginationParams {
	limit?: number;
	page?: number;
}

export interface GetPlaylistById extends PaginationParams {
	id: string;
}

export interface GetPlaylistByLink extends PaginationParams {
	token: string;
}
