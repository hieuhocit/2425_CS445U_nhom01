const multer = require('multer');

// configuring store for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const originalUrl = req.originalUrl;
    if (originalUrl.includes('user')) {
      cb(null, 'public/images/users');
    } else if (originalUrl.includes('questions')) {
      cb(null, 'public/images/questions');
    } else {
      cb(null, 'public/images/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  upload,
};
