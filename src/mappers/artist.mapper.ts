import { createImageLinks } from '@/utils/link.util';
import { mapAlbumResponse } from './album.mapper';
import { mapSongResponse } from './song.mapper';
import type { Artist, ArtistAPIResponse, ArtistMap, ArtistMapAPIResponse } from '@/schemas/artist';
import { CityModArtistAPIResponse } from '@/schemas/discover/home-data.schema';
import { CityModArtist } from '@/schemas/discover/home-data.schema';

export const mapArtistResponse = (artist: ArtistAPIResponse): Artist => ({
	id: artist.artistId || artist.id,
	name: artist.name,
	url: artist.urls?.overview || artist.perma_url,
	type: artist.type,
	followerCount: artist.follower_count ? Number(artist.follower_count) : null,
	fanCount: artist.fan_count || null,
	isVerified: artist.isVerified || null,
	dominantLanguage: artist.dominantLanguage || null,
	dominantType: artist.dominantType || null,
	bio: artist.bio ? JSON.parse(artist.bio) : null,
	dob: artist.dob || null,
	fb: artist.fb || null,
	twitter: artist.twitter || null,
	wiki: artist.wiki || null,
	availableLanguages: artist.availableLanguages || null,
	isRadioPresent: artist.isRadioPresent || null,
	image: createImageLinks(artist.image),
	topSongs: artist.topSongs?.map(mapSongResponse) || null,
	topAlbums: artist.topAlbums?.map(mapAlbumResponse) || null,
	singles: artist.singles?.map(mapSongResponse) || null,
	similarArtists:
		artist.similarArtists?.map(similarArtist => ({
			id: similarArtist.id,
			name: similarArtist.name,
			url: similarArtist.perma_url,
			image: createImageLinks(similarArtist.image_url),
			languages: similarArtist.languages ? JSON.parse(similarArtist.languages) : null,
			wiki: similarArtist.wiki,
			dob: similarArtist.dob,
			fb: similarArtist.fb,
			twitter: similarArtist.twitter,
			isRadioPresent: similarArtist.isRadioPresent,
			type: similarArtist.type,
			dominantType: similarArtist.dominantType,
			aka: similarArtist.aka,
			bio: similarArtist.bio ? JSON.parse(similarArtist.bio) : null,
			similarArtists: similarArtist.similar ? JSON.parse(similarArtist.similar) : null,
		})) || null,
});

export const mapArtistMapResponse = (artist: ArtistMapAPIResponse): ArtistMap => ({
	id: artist.id,
	name: artist.name,
	role: artist.role,
	image: createImageLinks(artist.image),
	type: artist.type,
	url: artist.perma_url,
});

export const mapCityModArtistResponse = (artist: CityModArtistAPIResponse): CityModArtist => ({
	id: artist.id,
	title: artist.title,
	image: createImageLinks(artist.image),
	type: artist.type,
	perma_url: artist.perma_url,
	subtitle: artist.subtitle,
	secondary_subtitle: artist.secondary_subtitle,
	more_info: artist.more_info,
	mini_obj: artist.mini_obj,
});
