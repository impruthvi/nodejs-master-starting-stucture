const multer = require('multer');
const AppError = require('./appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 404));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

class ImageUpload {
  constructor(inputName) {
    this.inputName = inputName;
  }

  singleImageUpload() {
    return upload.single(this.inputName);
  }
}

module.exports = ImageUpload;
