import httpStatus from 'http-status';

export interface ErrorResponse {
	message: string;
	status: number;
	stack?: string;
	code?: string;
	requestId?: string;
}

export class AppError extends Error {
	status: number;
	code?: string;

	constructor(message: string, status: number = 500, code?: string) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}

	static BadRequest(message: string, code?: string): AppError {
		return new AppError(message, httpStatus.BAD_REQUEST, code);
	}

	static Unauthorized(message: string, code?: string): AppError {
		return new AppError(message, httpStatus.UNAUTHORIZED, code);
	}
	static Forbidden(message: string, code?: string): AppError {
		return new AppError(message, httpStatus.FORBIDDEN, code);
	}

	static NotFound(message: string, code?: string): AppError {
		return new AppError(message, httpStatus.NOT_FOUND, code);
	}

	static ValidationError(message: string, code?: string): AppError {
		return new AppError(message, httpStatus.UNPROCESSABLE_ENTITY, code);
	}

	static InternalError(message: string = 'Internal Server Error', code?: string): AppError {
		return new AppError(message, httpStatus.INTERNAL_SERVER_ERROR, code);
	}
}
