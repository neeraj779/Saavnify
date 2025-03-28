import { Hono } from 'hono';
import { apiReference } from '@scalar/hono-api-reference';

const route = new Hono();

route.get(
	'/',
	apiReference({
		url: '/swagger.json',
		theme: 'deepSpace',
		layout: 'modern',
		isEditable: false,
		showSidebar: true,
		darkMode: true,
		forceDarkModeState: 'dark',
		hideClientButton: true,
		metaData: {
			applicationName: 'Saavnify',
			author: 'Neeraj',
			creator: 'Neeraj',
			publisher: 'Neeraj',
			robots: 'index, follow',
			description: 'Comprehensive API documentation for Saavnify.',
			keywords: 'API, Saavnify, REST, Swagger, OpenAPI, Documentation',
			ogTitle: 'Saavnify API Documentation',
			ogDescription:
				'Explore the Saavnify API with detailed documentation and interactive testing.',
		},
	}),
);

export const apiDocRouter = route;
