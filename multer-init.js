const multer = require('multer');
const path = require('path');

module.exports.initMulter = function () {
  /////////////////////////MULTER/////////////////////////////
  const PATH = path.resolve(`storage`);

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*Filename file {
             fieldname: 'video',
             originalname: 'development.json - api-sell - Visual Studio Code 2020-04-17 19-23-35.mkv',
             encoding: '7bit',
             mimetype: 'video/x-matroska'
            }*/
      return cb(null, path.resolve(`${PATH}`));
    },
    filename: (req, file, cb) => {
      let a = Date.now() + Math.random() * 1000 + '';
      cb(null, a + '_' + file.originalname);
    },
  });

  module.exports.multer = multer({
    storage: storage,
  });
  ////////////////////////////////////////////////////////////
};

