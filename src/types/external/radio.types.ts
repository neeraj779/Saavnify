import { SourceSong } from './song.types';

export type SourceRadioStation = {
	error?: string | { code: string; msg: string };
	stationid: string;
};

export type SourceRadioSong = {
	error?: string;
	stationid: string;
	song?: SourceSong;
} & Record<string, { song: SourceSong }>;
