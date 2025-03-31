import { Endpoints } from '@/constants/endpoint.constant';

type EndpointValue = (typeof Endpoints)[keyof typeof Endpoints];

type FetchOptions = {
	endpoint: EndpointValue;
	params?: Record<string, string | number | boolean>;
	context?: 'android' | 'web6dot0';
};

const API_BASE_URL = 'https://www.jiosaavn.com/api.php';

export const useFetch = async <T>({
	endpoint,
	params = {},
	context = 'web6dot0',
}: FetchOptions): Promise<{ data: T; ok: boolean }> => {
	const url = new URL(API_BASE_URL);
	const defaultParams = {
		__call: endpoint.toString(),
		_format: 'json',
		_marker: '0',
		api_version: '4',
		ctx: context,
	};

	Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) =>
		url.searchParams.append(key, String(value)),
	);

	const response = await fetch(url.toString());
	const data = await response.json();

	return { data: data as T, ok: response.ok };
};
