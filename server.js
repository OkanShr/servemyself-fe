const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');

app.use(cors());

const storage = multer.diskStorage({
  destination: 'public/Images/',
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString().split('T')[0];
    const filename = `${date}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
