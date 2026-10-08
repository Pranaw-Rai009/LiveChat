export const asyncHandler = (fn) => {
    const wrapper = (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(err =>  next(err))
    }
    return wrapper
}