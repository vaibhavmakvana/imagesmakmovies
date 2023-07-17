import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, res, (error) => {
      if (error) {
        reject(error);
      } else {
        // File uploaded successfully
        resolve();
      }
    });
  })
    .then(() => {
      // Handle successful file upload here
      res.status(200).json({ message: 'File uploaded successfully' });
    })
    .catch((error) => {
      console.error('An error occurred during file upload:', error);
      res.status(500).json({ message: 'File upload failed' });
    });
}
