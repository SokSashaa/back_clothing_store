import {diskStorage} from "multer";
import {normalSizeFileName} from "../utils/forFiles";

export const pathUploadProduct = './uploads/products'
export const fileStorage = diskStorage(
    {
        destination: pathUploadProduct,
        filename: normalSizeFileName,
    }
)