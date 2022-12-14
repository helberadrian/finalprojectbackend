import multer from 'multer'
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, "../public/img"))
    },
    filename: function (req, file, cb) {
        const name = `${Date.now()}-${file.originalname}`
        const nameReplace = name.replace(/ /g, "")
        cb(null, nameReplace)
    }
})

const upload = multer({ storage })

export default upload