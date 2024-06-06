import { diskStorage } from 'multer';
import { normalSizeFileName } from '../utils/forFiles';
import { HttpException, HttpStatus } from '@nestjs/common';

export const pathUploadCategory = './uploads/categories';
export const fileStorage = diskStorage({
  destination: pathUploadCategory,
  filename: normalSizeFileName,
});

export const localOptions = {
  storage: fileStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter(req: any, file: any, callback: any) {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) callback(null, true);
    else
      callback(
        new HttpException(
          `Unsupported file type ${file.originalname}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
  },
};
