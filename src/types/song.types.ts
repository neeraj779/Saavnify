export interface GetSongById {
	songIds: string;
	link?: string;
	token?: string;
	mini?: boolean;
	raw?: boolean;
}

export interface GetSongSuggestions {
	id: string;
	lang?: string;
	mini?: boolean;
	raw?: boolean;
}
