import { decode } from 'entities';

import { createDownloadLinks, createImageLinks, parseBool } from '../lib/utils';
import { MiniEntity, MiniPayloadSource } from '../types/common.types';

import { artistMapPayload } from './artist.mapper';

export function miniPayload(item: MiniPayloadSource): MiniEntity {
	const {
		id,
		title,
		subtitle,
		type,
		perma_url: url,
		image,
		explicit_content,
		more_info = {},
	} = item;

	const entity: MiniEntity = {
		id,
		name: decode(title),
		type,
		url,
		image: createImageLinks(image),
		header_desc: 'header_desc' in item ? decode(item.header_desc ?? '') : '',
		explicit: explicit_content ? parseBool(explicit_content) : undefined,
	};

	if (type === 'song' && 'duration' in more_info) {
		entity.subtitle = subtitle.split('-')[0].trim();
		entity.duration = +more_info.duration;
		entity.download_url = createDownloadLinks(more_info.encrypted_media_url);
		entity.album = decode(more_info.album);
		entity.album_id = more_info.album_id;
		entity.album_url = more_info.album_url;
	} else if (type === 'album' && 'artistMap' in more_info) {
		entity.subtitle = more_info.artistMap?.artists
			?.map((a: { name: string }) => a.name.trim())
			.join(',');
	} else if (type === 'radio_station' && 'color' in more_info) {
		entity.color = more_info.color;
	}

	if ('list' in item && Array.isArray(item.list)) {
		entity.list = item.list.map((i: { id: string }) => i.id).join(',');
	}

	if (more_info && 'artistMap' in more_info && more_info.artistMap) {
		entity.artist_map = artistMapPayload(more_info.artistMap);
	}

	entity.subtitle = decode(entity.subtitle ?? subtitle ?? '');
	if (entity.subtitle.toLowerCase().includes('jiosaavn') || entity.subtitle === '') {
		entity.subtitle = type;
	}

	return entity;
}
