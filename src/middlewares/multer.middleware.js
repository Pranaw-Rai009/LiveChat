import multer from 'multer'

// set of rules for knowing where to save  and wht to name it
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/temp")
    },
    filename:  function(req, file, cb) {
        cb(null, file.originalname)
    }
})

// builds the actual above middleware, storage = above(storage)
export const upload = multer({storage})


