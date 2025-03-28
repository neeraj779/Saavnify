import { Hono } from 'hono';
import { PlaylistController } from '@/controllers/playlist.controller';

const route = new Hono();
const playlistController = new PlaylistController();

route.get('/', playlistController.getPlaylistByIdOrLink);

export const playlistRoute = route;
