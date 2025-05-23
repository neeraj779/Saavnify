import { Hono } from 'hono';
import { AlbumController } from '@/controllers/album.controller';

const route = new Hono();
const albumController = new AlbumController();

route.get('/', albumController.getAlbumByIdOrLink);
route.get('/recommend', albumController.getRecommendations);
route.get('/same-year', albumController.getSameYearAlbums);

export const albumRoute = route;
