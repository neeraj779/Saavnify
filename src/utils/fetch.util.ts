type FetchOptions = {
	endpoint: string;
	params?: Record<string, string | number | boolean | undefined>;
	context?: 'android' | 'web6dot0';
	isVersion4?: boolean;
};

const API_BASE_URL = 'https://www.jiosaavn.com/api.php';

export const useFetch = async <T>({
	endpoint,
	params = {},
	context = 'web6dot0',
	isVersion4 = true,
}: FetchOptions): Promise<T> => {
	const url = new URL(API_BASE_URL);
	const defaultParams = {
		__call: endpoint.toString(),
		_format: 'json',
		_marker: '0',
		...(isVersion4 && { api_version: '4' }),
		ctx: context,
	};

	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(([_, v]) => v !== undefined),
	);

	Object.entries({ ...defaultParams, ...filteredParams }).forEach(([key, value]) =>
		url.searchParams.append(key, String(value)),
	);

	const langs = filteredParams.language || 'hindi,english';

	console.log(url.toString());

	const response = await fetch(url.toString(), {
		headers: {
			cookie: `L=${langs}; gdpr_acceptance=true; DL=english`,
		},
	});
	const data = await response.json();

	return data as T;
};
