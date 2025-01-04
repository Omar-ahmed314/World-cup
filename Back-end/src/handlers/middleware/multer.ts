import multer, { Multer } from "multer"
import dotenv from 'dotenv'

dotenv.config();


const storageConfig: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.STADIUMS_IMG_LOCATION as unknown as string); // Directory where files will be saved
      },

    filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`); // File naming convention
    },
})


const upload = multer({storage: storageConfig})

export default upload;