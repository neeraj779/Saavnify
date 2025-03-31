import { Hono } from 'hono';
import { discoverController } from '@/controllers/discover.controller';

const route = new Hono();

route.get('/home', discoverController.getHomeData);

route.get('/top-searches', discoverController.getTopSearches);

route.get('/top-charts', discoverController.getTopCharts);

route.get('/trending', discoverController.getTrending);

route.get('/new-releases', discoverController.getNewReleases);

route.get('/top-playlists', discoverController.getTopPlaylists);

route.get('/top-artists', discoverController.getTopArtists);

export const discoverRoute = route;
