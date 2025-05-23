import { MediaRights } from '../common.types';
import { SourceArtistMap } from './artist.types';

export type SourceShow = {
	show_details: SourceShowDetails;
	seasons: SourceSeason[];
	episodes: SourceEpisodeDetail[];
	modules: SourceShowModules;
};

export type SourceShowDetails = {
	id: string;
	title: string;
	subtitle: string;
	header_desc: string;
	type: 'season';
	perma_url: string;
	image: string;
	language: string;
	year: string;
	play_count: string;
	explicit_content: string;
	list_count: string;
	list_type: string;
	list: string;
	more_info: {
		country_of_origin: string;
		description: string;
		disable_ads: string;
		is_disabled: string;
		label_id: string;
		latest_season_id: string;
		latest_season_sequence: string;
		parental_advisory: string;
		partner_id: string;
		partner_name: string;
		release_date: string;
		tags: string;
		followers_count: string;
		copyright_text: string;
		category_tags: string[];
		sub_category_tags: string[];
		m4a: string;
		artistMap: SourceArtistMap;
		header_logo: string;
		header_color: string;
		header_image: string;
		label: string;
		sort_order: string;
		square_image: string;
		editors_note: {
			title: string;
			message: string;
			image: string;
			content: string[];
		};
		season_number: string;
		total_episodes: string;
		is_followed: string;
		fan_count: string;
	};
};

export type SourceSeason = {
	id: string;
	title: string;
	subtitle: string;
	type: string;
	image: string;
	perma_url: string;
	explicit_content: string;
	more_info: {
		entity_title_exact_match: string;
		description: string;
		song_info: string;
		show_id: string;
		show_title: string;
		numEpisodes: string;
		encrypted_media_url: string;
		season_number: string;
		artistMap: SourceArtistMap;
	};
};

export type SourceShowModules = {
	seasons: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
	episodes: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
	show_details: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
	show_starring: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
};

export type SourceEpisode = {
	episodes: SourceEpisodeDetail[];
	modules: SourceEpisodeModules;
};

export type SourceEpisodeDetail = {
	id: string;
	title: string;
	subtitle: string;
	header_desc: string;
	type: 'episode';
	perma_url: string;
	image: string;
	language: string;
	year: string;
	play_count: string;
	explicit_content: string;
	list_count: string;
	list_type: string;
	list: string;
	more_info: {
		release_date: string;
		release_time: string;
		label_id: string;
		duration: string;
		square_image_url: string;
		entity_title_exact_match: string;
		description: string;
		season_no: string;
		sequence_number: string;
		show_id: string;
		season_id: string;
		show_title: string;
		season_title: string;
		square_image: string;
		artistMap: SourceArtistMap;
		episode_number: string;
		label: string;
		origin: string;
		ad_breaks: string;
		multi_br: string;
		rights: MediaRights;
		starred: string;
		cache_state: string;
		show_url: string;
		encrypted_media_url: string;
	};
};

export type SourceEpisodeModules = {
	episode_details: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
	episode_starring: {
		source: string;
		position: number;
		title: string;
		subtitle: string;
	};
};
