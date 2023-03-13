

const multer = require("multer");
    const storageEngine = multer.diskStorage({
          destination: "./images",
          filename: (req, reqFile, cb) => {
            cb(null, `${Date.now()}--${reqFile.originalname}`);
          },
        });


        const upload = multer({
              storage: storageEngine,
              limits: { fileSize: 1000000 },
        });

module.exports = {
    upload
}

