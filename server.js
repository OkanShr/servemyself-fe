// current timestamp in milliseconds
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let today = year + "-" + month + "-" + date
// prints date & time in YYYY-MM-DD format

var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/Images/')
},
filename: function (req, file, cb) {
  cb(null, today + "-" + file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});

app.listen(3001, function() {

  console.log('App running on port 3001');

});

