class ApiError extends Error {
    constructor(statusCode, message, fields = []) {
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.errors = fields
    }
}

