import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { routesConfig } from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app = new Hono();
app.use('*', cors());

app.notFound(notFoundHandler);
app.onError(errorHandler);

routesConfig.forEach(route => {
	app.route(`${route.path}`, route.route);
});

export default app;
