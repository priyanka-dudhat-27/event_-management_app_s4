import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure 'uploads/' directory exists
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename to be unique
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

export default upload;
