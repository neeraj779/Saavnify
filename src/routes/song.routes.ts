import { Hono } from 'hono';
import { SongController } from '@/controllers/song.controller';

const route = new Hono();
const songController = new SongController();

route.get('/', songController.getSongByIdsOrLink);

route.get('/:id', songController.getSongById);

route.get('/:id/lyrics', songController.getSongLyrics);

route.get('/:id/suggestions', songController.getSongSuggestions);

export const songRoute = route;
