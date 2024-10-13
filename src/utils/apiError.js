class APIError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends APIError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}

class UnauthorizedError extends APIError {
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}

class ForbiddenError extends APIError {
    constructor(message = 'Forbidden') {
        super(403, message);
    }
}

class NotFoundError extends APIError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}

class MethodNotAllowedError extends APIError {
    constructor(message = 'Method Not Allowed') {
        super(405, message);
    }
}

class ConflictError extends APIError {
    constructor(message = 'Conflict') {
        super(409, message);
    }
}

class InternalServerError extends APIError {
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}

// Export custom error classes
module.exports = {
    APIError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    ConflictError,
    InternalServerError,
};
