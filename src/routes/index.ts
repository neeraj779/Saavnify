import { searchRoute } from './search.routes';
import { artistRoute } from './artist.routes';
import { albumRoute } from './album.routes';
import { songRoute } from './song.routes';
import { playlistRoute } from './playlist.routes';
import { apiDocRouter } from './api-doc.routes';

const base_path = 'api/v1';

export const routesConfig = [
	{
		path: '/',
		route: apiDocRouter,
	},
	{
		path: `/${base_path}/search`,
		route: searchRoute,
	},
	{
		path: `/${base_path}/artists`,
		route: artistRoute,
	},
	{
		path: `/${base_path}/albums`,
		route: albumRoute,
	},
	{
		path: `/${base_path}/songs`,
		route: songRoute,
	},
	{
		path: `/${base_path}/playlists`,
		route: playlistRoute,
	},
];
