const multer = require('multer');
const AppError = require('./appError');

class FileUpload {
  constructor(fileType = 'image') {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith(fileType)) {
        cb(null, true);
      } else {
        cb(
          new AppError(
            `Not an ${fileType}! Please upload only ${fileType}.`,
            404
          )
        );
      }
    };

    this.upload = multer({
      storage: multerStorage,
      fileFilter: multerFilter
    });
  }

  singleFileUpload(inputName) {
    return this.upload.single(inputName);
  }
}

module.exports = FileUpload;
