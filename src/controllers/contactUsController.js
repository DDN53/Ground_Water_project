const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'));
    }
  }
});

const contactUsController = {
  upload: upload.single('file'), // Middleware to handle file upload

  async handleFileUpload(req, res) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      // Save file details to the database
      const newFile = await File.create({
        name: file.originalname,
        contactNumber: req.body.contactNumber,
        message: req.body.message,
        path: file.path, 
        file: file.buffer, 
      });

      res.status(201).json({ message: 'File uploaded successfully.', file: newFile });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file.' });
    }
  }
};

module.exports = contactUsController;
