var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
let multerInit = require('./multer-init');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
///// CONFIGURATION OF MORGAN //////////
app.use(morgan('dev'));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

multerInit.initMulter();

app.post('/api/fileanalyse', multerInit.multer.single('upfile'), (req, res) => {
  // let file = req.file;
  // console.log('🚀 ~ file: server.js ~ line 26 ~ app.post ~ file', file);
  let response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  return res.status(200).json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
