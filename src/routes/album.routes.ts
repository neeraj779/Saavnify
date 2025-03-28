import { Hono } from 'hono';
import { AlbumController } from '@/controllers/album.controller';

const route = new Hono();
const albumController = new AlbumController();

route.get('/', albumController.getAlbumByIdOrLink);

export const albumRoute = route;
