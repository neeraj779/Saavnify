import { Hono } from 'hono';
import { SearchController } from '@/controllers/search.controller';

const route = new Hono();
const searchController = new SearchController();

route.get('/', searchController.searchAll);
route.get('/top', searchController.getTopSearches);

route.get('/:path{(songs|albums|playlists|artists)}', searchController.searchByType);

route.get('/podcasts', searchController.searchPodcasts);

export const searchRoute = route;
