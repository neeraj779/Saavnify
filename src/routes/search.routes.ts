import { Hono } from 'hono';
import { SearchController } from '@/controllers/search.controller';

const route = new Hono();
const searchController = new SearchController();

route.get('/', searchController.searchAll);

route.get('/songs', searchController.searchSongs);

route.get('/albums', searchController.searchAlbums);

route.get('/artists', searchController.searchArtists);

route.get('/playlists', searchController.searchPlaylists);

export const searchRoute = route;
