import multer from 'multer'

const storage = multer.diskStorage({
   // destination: (req, file, cb) => {
    //  cb(null, "public/assets/"); // Save in 'uploads' folder
  //  },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Keep original file name
    }
  });

  const upload = multer({ storage });

  export default upload


