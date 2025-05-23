export type ApiResponse<T = unknown> = {
	status: 'Success' | 'Failed';
	message: string;
	data?: T;
};
