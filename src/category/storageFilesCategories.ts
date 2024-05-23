import {diskStorage} from "multer";
import {normalSizeFileName} from "../utils/forFiles";


export const pathUploadCategory = './uploads/categories'
export const fileStorage = diskStorage(
    {
        destination: pathUploadCategory,
        filename: normalSizeFileName
    }
)