import { Hono } from 'hono';
import { ArtistController } from '@/controllers/artist.controller';

const route = new Hono();
const artistController = new ArtistController();

route.get('/', artistController.getArtistByIdOrLink);

route.get('/:id', artistController.getArtistById);

route.get('/:id/songs', artistController.getArtistSongs);

route.get('/:id/albums', artistController.getArtistAlbums);

export const artistRoute = route;
