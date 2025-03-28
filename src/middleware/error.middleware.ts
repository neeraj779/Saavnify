import { AppError, ErrorResponse } from '@/types/error.types';
import { ErrorHandler, NotFoundHandler } from 'hono';
import httpStatus from 'http-status';
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';
import { ErrorMessages } from '@/constants/error.constant';

const extractErrorMessage = (errorObj: Record<string, unknown>, statusCode: StatusCode): string => {
	return String(
		errorObj.description ||
			errorObj.message ||
			httpStatus[statusCode.toString() as keyof typeof httpStatus] ||
			ErrorMessages.System.UNKNOWN_ERROR,
	);
};

export const errorConverter = (err: unknown): AppError => {
	if (err instanceof AppError) return err;

	if (err instanceof SyntaxError && err.message.includes(ErrorMessages.System.GENERIC_JSON_ERROR)) {
		return AppError.BadRequest('Invalid JSON payload');
	}

	const errorObj = (typeof err === 'object' && err !== null ? err : {}) as Record<string, unknown>;
	const statusCode =
		typeof errorObj.statusCode === 'number'
			? (errorObj.statusCode as StatusCode)
			: httpStatus.INTERNAL_SERVER_ERROR;

	return new AppError(extractErrorMessage(errorObj, statusCode), statusCode);
};

export const errorHandler: ErrorHandler = (err, c) => {
	if (err instanceof ZodError)
		return c.json({ error: 'Validation Error', details: err.issues }, httpStatus.BAD_REQUEST);

	const error = errorConverter(err);
	const response: ErrorResponse = {
		message: error.message || 'Internal Server Error',
		status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
		code: error instanceof AppError ? error.code : undefined,
	};

	return c.json(response, error.status as ContentfulStatusCode);
};

export const notFoundHandler: NotFoundHandler = c =>
	c.json(AppError.NotFound('Resource not found', 'RESOURCE_NOT_FOUND'));
