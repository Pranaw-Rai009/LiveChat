export const errroHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    if(statusCode >= 500) console.err(err)
    res.status(statusCode).json({
        success: false,
        Message: statusCode >= 500 ? "Internal Server Error" : err.message
    })
}