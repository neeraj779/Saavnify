import { Hono } from 'hono';
import { exploreController } from '@/controllers/explore.controller';
import { FeaturedPaths } from '@/constants/explore.constant';

const route = new Hono();

route.get('/', exploreController.getHomeData);

route.get('/trending', exploreController.getTrending);

route.get(`/:path{(${FeaturedPaths.join('|')})}`, exploreController.getFeaturedContent);

export const exploreRoute = route;
