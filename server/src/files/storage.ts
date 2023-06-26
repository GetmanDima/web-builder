import { diskStorage } from 'multer';

const generateFilename = () => {
  const randomStr = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  return randomStr + '-' + (new Date()).toISOString().replace(/[:.]/g, '-');
};

const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  callback(null, `${generateFilename()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
