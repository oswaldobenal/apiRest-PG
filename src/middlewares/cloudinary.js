import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import "dotenv/config";

const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_PATHNAME
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: CLOUDINARY_PATHNAME,
    public_id: () => Date.now()
  },
});

export const deleteFile = async (idFile) => {
  await cloudinary.uploader.destroy(`${CLOUDINARY_PATHNAME}/${idFile}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
    console.log(idFile, ' deleted');
  });
}

export const upload = multer({ storage: storage });

