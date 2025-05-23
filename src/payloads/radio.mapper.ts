import { MiniEntity } from '../types/common.types';
import { SourceRadioSong } from '../types/external/radio.types';
import { RadioSong } from '../types/internal/radio.types';
import { Song } from '../types/internal/song.types';
import { songPayload } from './song.mapper';

export function radioSongsPayload(s: SourceRadioSong, mini: boolean = false): RadioSong {
	const station_id = s.stationid;
	const songs: (Song | MiniEntity)[] = [];

	if (s.song) {
		return {
			station_id,
			songs: [songPayload(s.song, mini)],
		};
	}

	Object.keys(s).forEach(key => {
		if (key === 'stationid' || key === 'error') return;
		songs.push(songPayload(s[key].song));
	});

	return { station_id, songs };
}
