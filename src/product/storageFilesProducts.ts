import {diskStorage} from "multer";
import {normalSizeFileName} from "../utils/forFiles";

export const fileStorage = diskStorage(
    {
        destination: './uploads/products',
        filename: normalSizeFileName
    }
)